import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ProductImage } from '@/components/ProductImages';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function BasicCart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    loadCartItems();
  }, []);
  
  const loadCartItems = () => {
    try {
      // Get cart from localStorage (use guest cart if not logged in)
      const cartKey = user ? `cart_${user.id}` : 'cart_guest';
      const items = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setCartItems(items);
      
      // Calculate subtotal
      const subtotalAmount = items.reduce(
        (sum: number, item: CartItem) => sum + parseFloat(item.price) * (item.quantity || 1), 
        0
      );
      setSubtotal(subtotalAmount);
      
      // Calculate tax (7%)
      const taxAmount = subtotalAmount * 0.07;
      setTax(taxAmount);
      
      // Calculate total
      setTotal(subtotalAmount + taxAmount);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
      setSubtotal(0);
      setTax(0);
      setTotal(0);
    }
  };
  
  const removeItem = (itemId: string) => {
    try {
      const cartKey = user ? `cart_${user.id}` : 'cart_guest';
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      
      localStorage.setItem(cartKey, JSON.stringify(updatedItems));
      setCartItems(updatedItems);
      
      // Recalculate totals
      const subtotalAmount = updatedItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 
        0
      );
      setSubtotal(subtotalAmount);
      
      // Calculate tax (7%)
      const taxAmount = subtotalAmount * 0.07;
      setTax(taxAmount);
      
      // Calculate total
      setTotal(subtotalAmount + taxAmount);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  
  const goToCheckout = () => {
    window.location.href = "/checkout";
  };
  
  const goToMarketplace = () => {
    window.location.href = "/marketplace";
  };
  
  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button 
              onClick={goToMarketplace}
              style={{ backgroundColor: '#0078D4' }}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-xl">Items in Cart ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center">
                    <div className="w-20 h-20 mr-4 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <ProductImage id={item.id} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-gray-500">
                        ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end ml-4">
                      <span className="font-medium text-gray-900">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
              
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (7%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  style={{ backgroundColor: '#0078D4' }}
                  onClick={goToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={goToMarketplace}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}