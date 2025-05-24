import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function SimpleCheckout() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    loadCartItems();
  }, [user]);

  const loadCartItems = () => {
    try {
      // First try to get from regular cart
      let items = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // If empty, try user specific cart
      if (items.length === 0 && user) {
        items = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
      }
      
      // If still empty, try guest cart
      if (items.length === 0) {
        items = JSON.parse(localStorage.getItem('cart_guest') || '[]');
      }
      
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a simplified version of the payment intent
      // In a real application, this would connect to Stripe
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        amount: total,
        items: cartItems
      });
      
      if (response.ok) {
        // Clear cart after successful payment
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('cart_guest', JSON.stringify([]));
        if (user) {
          localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));
        }
        
        // Redirect to success page
        window.location.href = '/checkout/success';
      } else {
        alert('There was an error processing your payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button 
              onClick={() => window.location.href = "/marketplace"}
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
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-semibold text-xl mb-4">Billing Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      required 
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        required 
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        required 
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      name="zip" 
                      required 
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-3">Payment Details</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        required 
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          name="expiry" 
                          placeholder="MM/YY" 
                          required 
                          value={formData.expiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          placeholder="123" 
                          required 
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  style={{ backgroundColor: '#0078D4' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}