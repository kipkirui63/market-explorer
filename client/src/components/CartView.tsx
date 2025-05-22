import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CartView() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  
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
    
    // Calculate total amount
    const total = items.reduce(
      (sum: number, item: CartItem) => sum + parseFloat(item.price) * (item.quantity || 1), 
      0
    ).toFixed(2);
    setTotalAmount(total);
  };
  
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (!user || newQuantity < 1) return;
    
    const userCartKey = `cart_${user.id}`;
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    localStorage.setItem(userCartKey, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    
    // Recalculate total
    const total = updatedItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 
      0
    ).toFixed(2);
    setTotalAmount(total);
  };
  
  const removeItem = (itemId: string) => {
    if (!user) return;
    
    const userCartKey = `cart_${user.id}`;
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    
    localStorage.setItem(userCartKey, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    
    // Recalculate total
    const total = updatedItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 
      0
    ).toFixed(2);
    setTotalAmount(total);
  };
  
  const checkout = () => {
    window.location.href = "/checkout";
  };
  
  // If not logged in or cart is empty
  if (!user || cartItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">
            {!user 
              ? "Please sign in to view your cart" 
              : "Your cart is empty"}
          </p>
          {!user && (
            <Button 
              onClick={() => window.location.href = "/auth"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      
      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">
                ${parseFloat(item.price).toFixed(2)} x {item.quantity}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-2">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">${totalAmount}</span>
        </div>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={checkout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}