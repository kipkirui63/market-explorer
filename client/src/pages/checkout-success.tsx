import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { CheckCircle, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

export default function CheckoutSuccess() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  
  // Extract invoice ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('invoice');
    if (id) {
      setInvoiceId(id);
    }
  }, [location]);
  
  // Query order details if we have an invoice ID
  const { isLoading: isLoadingInvoice } = useQuery({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      // This will fetch all orders, and then we'll find the one with our invoice ID
      if (!user || !invoiceId) return null;
      
      try {
        const res = await apiRequest('GET', '/api/orders');
        const orders = await res.json();
        
        // Find the order with matching invoice ID
        const matchingOrder = orders.find((order: any) => order.stripeInvoiceId === invoiceId);
        
        if (matchingOrder) {
          // In a real implementation, we'd fetch the invoice URL from Stripe
          // For now, we'll use a placeholder URL to Stripe dashboard
          setInvoiceUrl(`https://dashboard.stripe.com/invoices/${invoiceId}`);
        }
        
        return orders;
      } catch (error) {
        console.error('Error fetching order details:', error);
        return null;
      }
    },
    enabled: !!user && !!invoiceId
  });
  
  // Clear the cart on successful checkout
  useEffect(() => {
    if (user) {
      const userCartKey = `cart_${user.id}`;
      localStorage.removeItem(userCartKey);
    }
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          
          {/* Invoice Information */}
          {invoiceId && (
            <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50 text-left">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="font-medium text-blue-800">Invoice Generated</h3>
              </div>
              
              <p className="text-sm mb-2 text-blue-700">
                Your invoice has been successfully created in our system.
              </p>
              
              <div className="text-sm font-mono bg-white p-2 rounded border border-blue-200 mb-3">
                Invoice ID: {invoiceId}
              </div>
              
              {isLoadingInvoice ? (
                <div className="flex items-center justify-center p-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600">Loading invoice details...</span>
                </div>
              ) : invoiceUrl ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-sm mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => window.open(invoiceUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Invoice on Stripe
                </Button>
              ) : null}
            </div>
          )}
          
          <p className="mb-4 text-sm bg-green-50 p-4 rounded-lg text-green-700">
            A confirmation email with your order details has been sent to your email address.
          </p>
          
          <div className="space-y-4 mt-8">
            <Link href="/marketplace">
              <Button className="w-full cta-button">
                Continue Shopping
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              If you have any questions about your order, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}