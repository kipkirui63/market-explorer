import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { FileText, ExternalLink, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/stripe';

interface Order {
  id: number;
  userId: number;
  stripeInvoiceId: string | null;
  stripePaymentIntentId: string | null;
  amount: number;
  status: string;
  items: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);
  
  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      if (!user) return [];
      
      const res = await apiRequest('GET', '/api/orders');
      return await res.json();
    },
    enabled: !!user
  });
  
  if (!user) {
    return null; // Redirect will happen in useEffect
  }
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading your order history...</h2>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-medium text-red-700">Error Loading Orders</h2>
            </div>
            <p className="text-red-600 mb-4">
              We encountered a problem loading your order history. Please try again later.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
              <Link href="/marketplace">
                <Button>Return to Marketplace</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const parseOrderItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch (e) {
      return [];
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Marketplace
              </Link>
              <h1 className="text-2xl font-bold">Your Orders</h1>
            </div>
            <Link href="/marketplace">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
          
          {orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderItems = parseOrderItems(order.items);
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown date';
                
                return (
                  <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-y-2">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {orderDate}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          
                          {order.stripeInvoiceId && (
                            <a 
                              href={`https://dashboard.stripe.com/invoices/${order.stripeInvoiceId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View Invoice
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="divide-y divide-gray-200">
                        {orderItems.length > 0 ? (
                          orderItems.map((item: any, index: number) => (
                            <div key={index} className="py-3 flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity || 1}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium color-primary">
                                  ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="py-3 text-gray-500 italic">No item details available</p>
                        )}
                      </div>
                      
                      <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total:</span>
                          <span className="color-primary">{formatCurrency(order.amount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-4">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
                <p className="text-gray-500 mb-6">
                  You haven't placed any orders yet. Explore our marketplace to find AI solutions for your business.
                </p>
                <Link href="/marketplace">
                  <Button>Explore Marketplace</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}