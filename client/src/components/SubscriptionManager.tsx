import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, CreditCard } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionAccess {
  hasAccess: boolean;
  subscriptionStatus: string;
  trialEndsAt?: string;
}

function SubscriptionForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/marketplace',
        },
      });

      if (error) {
        toast({
          title: "Payment Setup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Your subscription is now active with a 7-day free trial!",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/subscription-access'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
        size="lg"
      >
        {isProcessing ? "Processing..." : "Start 7-Day Free Trial"}
      </Button>
    </form>
  );
}

export default function SubscriptionManager() {
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Check current subscription status
  const { data: subscriptionAccess, isLoading } = useQuery<SubscriptionAccess>({
    queryKey: ['/api/subscription-access'],
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/create-subscription');
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      toast({
        title: "Subscription Created",
        description: "Complete your payment setup to start your free trial!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysRemaining = (dateString?: string) => {
    if (!dateString) return 0;
    const trialEnd = new Date(dateString);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  // If user has access, show subscription status
  if (subscriptionAccess?.hasAccess) {
    const daysRemaining = getDaysRemaining(subscriptionAccess.trialEndsAt);
    const isTrialing = subscriptionAccess.subscriptionStatus === 'trialing';

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-xl">Premium Access Active</CardTitle>
          <CardDescription>
            You have access to all AI agents and tools
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isTrialing && daysRemaining > 0 ? (
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Clock className="h-3 w-3 mr-1" />
                Free Trial
              </Badge>
              <p className="text-sm text-muted-foreground">
                {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining in your free trial
              </p>
              <p className="text-xs text-muted-foreground">
                You'll be billed $29/month starting {formatDate(subscriptionAccess.trialEndsAt)}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Badge variant="default" className="bg-green-600">
                <CreditCard className="h-3 w-3 mr-1" />
                Active Subscription
              </Badge>
              <p className="text-sm text-muted-foreground">
                Billing $29/month
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // If no subscription, show signup form
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Access AI Agents</CardTitle>
        <CardDescription>
          Start your 7-day free trial to access all AI tools
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">7-Day Free Trial</span>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Access to all AI agents</li>
            <li>• Resume Analyzer</li>
            <li>• Business Intelligence Agent</li>
            <li>• AI Recruitment Assistant</li>
            <li>• SOP Assistant</li>
          </ul>
          <p className="text-xs text-blue-600 mt-3">
            Then $29/month. Cancel anytime.
          </p>
        </div>

        {!clientSecret ? (
          <Button 
            onClick={() => createSubscriptionMutation.mutate()}
            disabled={createSubscriptionMutation.isPending}
            className="w-full"
            size="lg"
          >
            {createSubscriptionMutation.isPending ? "Creating..." : "Start Free Trial"}
          </Button>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <SubscriptionForm />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}