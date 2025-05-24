import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getStripe } from "@/lib/stripe";

// Get the Stripe instance
const stripePromise = getStripe();

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const CheckoutForm: React.FC<{ cartItems: CartItem[], totalAmount: string }> = ({ cartItems, totalAmount }) => {
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
        console.log("Payment succeeded, generating invoice...");
        try {
          // Generate an invoice for the purchase
          const invoiceResponse = await apiRequest("POST", "/api/create-invoice", {
            cartItems: cartItems,
            amount: parseFloat(totalAmount),
            paymentIntentId: paymentIntent.id
          });
          
          console.log("Invoice response received");
          
          const invoiceData = await invoiceResponse.json();
          console.log("Invoice data:", invoiceData);
          
          // Clear the cart after successful payment
          if (user) {
            let cartKey = 'cart_guest';
            if (user.id) {
              cartKey = `cart_${user.id}`;
            }
            localStorage.removeItem(cartKey);
          }
          
          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase! Your invoice has been generated.",
          });
          
          // Redirect to success page with invoice info
          setLocation(`/checkout/success?invoice=${invoiceData.invoiceId}`);
        } catch (invoiceError) {
          console.error("Failed to generate invoice:", invoiceError);
          
          // Still consider the payment successful even if invoice generation fails
          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase! There was an issue generating your invoice, but your payment was processed successfully.",
          });
          
          // Clear the cart after successful payment
          if (user) {
            let cartKey = 'cart_guest';
            if (user.id) {
              cartKey = `cart_${user.id}`;
            }
            localStorage.removeItem(cartKey);
          }
          
          // Redirect to success page
          setLocation("/checkout/success");
        }
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Test Mode Banner */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <div className="flex items-center mb-2">
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
            TEST MODE
          </div>
          <span className="text-blue-800 font-medium">Stripe Payment Processing</span>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          This checkout is in test mode. Use these test cards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="bg-white p-2 rounded border border-blue-100">
            <div className="font-medium">Success payment:</div>
            <code className="text-green-700">4242 4242 4242 4242</code>
          </div>
          <div className="bg-white p-2 rounded border border-blue-100">
            <div className="font-medium">Authentication required:</div>
            <code className="text-orange-600">4000 0025 0000 3155</code>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2">Use any future date, any 3 digits for CVC, and any 5 digits for postal code</p>
      </div>
      
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        // Handle not logged in users
        if (!user) {
          toast({
            title: "Login Required",
            description: "Please log in to continue with checkout",
          });
          setLocation("/auth");
          return;
        }

        // Get cart items from localStorage
        let cartKey = 'cart_guest';
        if (user && user.id) {
          cartKey = `cart_${user.id}`;
        }
        
        const cartData = localStorage.getItem(cartKey);
        const loadedItems = cartData ? JSON.parse(cartData) : [];
        setCartItems(loadedItems);
        
        if (loadedItems.length === 0) {
          toast({
            title: "Empty Cart",
            description: "Your cart is empty. Add items before checkout.",
          });
          setLocation("/marketplace");
          return;
        }

        // Calculate total amount
        const total = loadedItems.reduce(
          (sum: number, item: CartItem) => sum + parseFloat(item.price) * (item.quantity || 1), 
          0
        );
        
        // Add 7% tax
        const tax = total * 0.07;
        const totalWithTax = total + tax;
        const formattedTotal = totalWithTax.toFixed(2);
        
        setTotalAmount(formattedTotal);

        // Create PaymentIntent on the server
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: totalWithTax,
          cartItems: loadedItems 
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error("Checkout initialization error:", error);
        toast({
          title: "Error",
          description: error?.message || "Failed to initialize checkout. Please try again.",
          variant: "destructive",
        });
        setLocation("/marketplace");
      } finally {
        setIsLoading(false);
      }
    };

    initCheckout();
  }, [user, setLocation, toast]);

  if (isLoading || !clientSecret) {
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
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret
                }}>
                <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
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
                    <span>${(parseFloat(totalAmount) - parseFloat(totalAmount) / 1.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/marketplace">
                  <Button variant="link">Return to Marketplace</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}