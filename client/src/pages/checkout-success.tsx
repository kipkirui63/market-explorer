import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function CheckoutSuccess() {
  const [, location] = useLocation();
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Extract invoice ID from URL if present and save order to local storage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invoice = params.get("invoice");
    if (invoice) {
      setInvoiceId(invoice);
      
      // If user is logged in, save this order to local storage
      if (user) {
        // Get cart items before we clear them
        const cartKey = `cart_${user.id}`;
        const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
        
        if (cartItems.length > 0) {
          // Save the order details
          const userOrdersKey = `orders_${user.id}`;
          const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
          
          // Create a new order with items from cart
          const newOrder = {
            id: Date.now(),
            userId: user.id,
            stripeInvoiceId: invoice,
            stripePaymentIntentId: params.get("payment_intent") || null,
            amount: cartItems.reduce((sum: number, item: any) => sum + parseFloat(item.price) * (item.quantity || 1), 0) * 100,
            status: 'completed',
            items: JSON.stringify(cartItems),
            createdAt: new Date().toISOString()
          };
          
          // Add new order to existing orders
          existingOrders.push(newOrder);
          
          // Save updated orders
          localStorage.setItem(userOrdersKey, JSON.stringify(existingOrders));
        }
      }
    }
  }, [user]);
  
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-50 p-6 flex items-center justify-center flex-col border-b border-green-100">
            <div className="mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
            <p className="text-green-700 text-center">
              Thank you for your purchase. Your order has been processed successfully.
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
              <p className="text-gray-600 mb-4">
                Our team will be in touch with you shortly to help you get started with your new AI solutions.
              </p>
              
              {invoiceId && (
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium text-blue-700">Invoice Details</h3>
                  </div>
                  <p className="text-blue-600 text-sm mb-3">
                    Your invoice has been generated and is available in your Stripe account.
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href={`https://dashboard.stripe.com/invoices/${invoiceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Invoice
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/orders">
                  <Button 
                    variant="outline" 
                    className="flex items-center w-full sm:w-auto"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Orders
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                If you have any questions about your purchase, please contact us at{" "}
                <a href="mailto:ai@crispvision.org" className="text-blue-600 hover:underline">
                  ai@crispvision.org
                </a>
                {" "}or call us at +1 (343) 580-1393.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}