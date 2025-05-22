import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Clear the cart after successful payment
        if (user) {
          localStorage.removeItem(`cart_${user.id}`);
        }
        
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        
        // Redirect to success page
        setLocation("/checkout/success");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
        <ShieldCheck className="h-4 w-4 text-green-500" />
        <span>Your payment information is secure and encrypted</span>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || processing}
      >
        {processing ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </span>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/auth");
      return;
    }

    // Get cart items from localStorage
    const userCartKey = `cart_${user.id}`;
    const items = JSON.parse(localStorage.getItem(userCartKey) || '[]');
    setCartItems(items);
    
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      setLocation("/marketplace");
      return;
    }

    // Calculate total amount
    const total = items.reduce(
      (sum: number, item: CartItem) => sum + parseFloat(item.price) * (item.quantity || 1), 
      0
    );
    
    // Add 7% tax
    const tax = total * 0.07;
    const totalWithTax = total + tax;
    
    setTotalAmount(totalWithTax.toFixed(2));

    // Create PaymentIntent on the server
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: totalWithTax,
          cartItems: items 
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error("Payment intent error:", error);
        toast({
          title: "Error",
          description: error?.message || "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        setLocation("/cart");
      }
    };

    createPaymentIntent();
  }, [user, setLocation, toast]);

  if (!clientSecret) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Preparing Checkout...</h1>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${(parseFloat(totalAmount) / 1.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax (7%)</span>
                    <span>${(parseFloat(totalAmount) * 0.07 / 1.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/cart">
                  <Button variant="link">Return to Cart</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}