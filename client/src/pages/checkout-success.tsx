import React, { useEffect } from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

export default function CheckoutSuccess() {
  // Clear all carts on successful checkout
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cart_guest', JSON.stringify([]));
    
    // Try to clear user-specific cart if it exists
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]));
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and is being processed.
            You will receive an email confirmation shortly.
          </p>
          
          <div className="border-t border-b py-4 my-6">
            <p className="font-medium">Order Details</p>
            <p className="text-sm text-gray-500 mt-1">Order #CRS-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <p className="mb-8 text-gray-600">
            Your purchased AI tools are now available in your account. You can access them at any time from the Marketplace.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => window.location.href = "/marketplace"}
              style={{ backgroundColor: '#0078D4' }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}