import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  
  useEffect(() => {
    if (open) {
      loadCartItems();
    }
  }, [user, open]);
  
  const loadCartItems = () => {
    let cartKey = 'cart_guest';
    
    // If user is logged in, use their ID for cart key
    if (user && user.id) {
      cartKey = `cart_${user.id}`;
    }
    
    try {
      const items = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setCartItems(items);
      
      // Calculate total amount
      const total = items.reduce(
        (sum: number, item: CartItem) => sum + parseFloat(item.price) * (item.quantity || 1), 
        0
      ).toFixed(2);
      setTotalAmount(total);
    } catch (error) {
      console.error('Error loading cart items:', error);
      // If there's an error parsing the cart, reset it
      setCartItems([]);
      setTotalAmount("0.00");
    }
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
    // Close the dialog and redirect to checkout page
    onOpenChange(false);
    window.location.href = "/checkout";
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Your Cart</DialogTitle>
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
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
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">${totalAmount}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}