import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ProductImage } from '@/components/ProductImages';
import { Link } from 'wouter';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CartView() {
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
              className="cta-button"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <span className="text-gray-500">{cartItems.length} item(s)</span>
      </div>
      
      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 flex items-center">
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
              <div className="font-medium color-primary">
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
      
      <div className="mt-6 space-y-2">
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
      
      <div className="mt-8 flex justify-between gap-4">
        <Button 
          variant="outline"
          className="flex-1"
          asChild
        >
          <Link href="/marketplace">Continue Shopping</Link>
        </Button>
        
        <Button 
          className="flex-1 cta-button" 
          asChild
        >
          <Link href="/custom-checkout">Proceed to Checkout (Test Mode)</Link>
        </Button>
      </div>
    </div>
  );
}