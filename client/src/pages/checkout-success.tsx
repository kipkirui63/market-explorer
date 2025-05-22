import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function CheckoutSuccess() {
  const { user } = useAuth();
  
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
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your payment has been successfully processed.
          </p>
          
          <p className="mb-4 text-sm bg-blue-50 p-4 rounded-lg text-blue-700">
            Order #CRA-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')} has been created.
          </p>
          
          <div className="space-y-4 mt-8">
            <Link href="/marketplace">
              <Button className="w-full">
                Continue Shopping
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              If you have any questions about your order, please contact our support team at ai@crispvision.org or call +1 (343) 580-1393.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}