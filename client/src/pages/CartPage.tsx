import React, { useState, useEffect } from 'react';
import { Trash2, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { ProductImage } from '@/components/ProductImages';
import SubscriptionManager from '@/components/SubscriptionManager';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    if (user) {
      loadCartItems();
    }
  }, [user]);
  
  const loadCartItems = () => {
    if (!user) return;
    
    const userCartKey = `cart_${user.id}`;
    const items = JSON.parse(localStorage.getItem(userCartKey) || '[]');
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
  };
  
  // We don't need the updateQuantity function for the new design
  
  const removeItem = (itemId: string) => {
    if (!user) return;
    
    const userCartKey = `cart_${user.id}`;
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    
    localStorage.setItem(userCartKey, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    
    // Trigger update of cart counter in marketplace
    window.dispatchEvent(new Event('storage'));
    
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
  };
  
  const checkout = () => {
    // Redirect to checkout page
    window.location.href = "/checkout";
  };
  
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* AI Agent Subscription - Always show when user is logged in */}
        {user && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center justify-center">
                <Star className="h-6 w-6 mr-2 text-yellow-500" />
                Access All AI Agents
              </h2>
              <p className="text-blue-700 mt-2">Start your 7-day free trial to unlock all AI tools</p>
            </div>
            <SubscriptionManager />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {!user && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Please sign in to view your cart</p>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = "/auth"}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
        
        {user && cartItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button variant="outline" asChild>
                <Link href="/marketplace">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
        
        {user && cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h1 className="text-xl font-bold">Your Cart</h1>
              <span className="text-gray-500">{cartItems.length} item(s)</span>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center">
                  <div className="w-20 h-20 mr-4 bg-gray-100 rounded overflow-hidden">
                    <ProductImage id={item.id} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">
                      ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-medium text-blue-500">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-800 font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between gap-4">
                <Button 
                  variant="outline"
                  className="flex-1"
                  asChild
                >
                  <Link href="/marketplace">Continue Shopping</Link>
                </Button>
                
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700" 
                  onClick={() => {
                    // Direct browser navigation works better than React router for checkout
                    window.location.href = "/checkout";
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}