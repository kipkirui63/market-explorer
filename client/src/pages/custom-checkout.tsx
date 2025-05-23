import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'wouter';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CustomCheckout() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  
  // Billing information state
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (!user) {
      setLocation('/auth');
      return;
    }
    
    loadCartItems();
  }, [user, setLocation]);
  
  const loadCartItems = () => {
    if (!user) return;
    
    const userCartKey = `cart_${user.id}`;
    const items = JSON.parse(localStorage.getItem(userCartKey) || '[]');
    setCartItems(items);
    
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      setLocation('/marketplace');
      return;
    }
    
    // Calculate totals
    const subtotalAmount = items.reduce(
      (sum: number, item: CartItem) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    
    // Calculate tax (7%)
    const taxAmount = subtotalAmount * 0.07;
    
    setSubtotal(subtotalAmount);
    setTax(taxAmount);
    setTotal(subtotalAmount + taxAmount);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value
    });
    
    // Clear error when user types
    setErrors({
      ...errors,
      [name]: ''
    });
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate first name
    if (!billingInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    
    // Validate last name
    if (!billingInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!billingInfo.email.trim() || !emailRegex.test(billingInfo.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }
    
    // Validate card number
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!billingInfo.cardNumber.trim() || !cardNumberRegex.test(billingInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Valid card number is required';
      valid = false;
    }
    
    // Validate expiry date
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!billingInfo.expiryDate.trim() || !expiryRegex.test(billingInfo.expiryDate)) {
      newErrors.expiryDate = 'Valid expiration date is required (MM/YY)';
      valid = false;
    }
    
    // Validate CVV
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!billingInfo.cvv.trim() || !cvvRegex.test(billingInfo.cvv)) {
      newErrors.cvv = 'Valid CVV is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart
      if (user) {
        const userCartKey = `cart_${user.id}`;
        localStorage.removeItem(userCartKey);
      }
      
      setProcessing(false);
      
      // Show success toast
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
      });
      
      // Redirect to success page
      setLocation('/checkout/success');
    }, 2000);
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length <= 2) return cleanValue;
    
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mt-2">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Billing Information */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={billingInfo.cardNumber}
                      onChange={(e) => {
                        const formattedValue = formatCardNumber(e.target.value);
                        setBillingInfo({
                          ...billingInfo,
                          cardNumber: formattedValue
                        });
                        setErrors({
                          ...errors,
                          cardNumber: ''
                        });
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={billingInfo.expiryDate}
                      onChange={(e) => {
                        const formattedValue = formatExpiryDate(e.target.value);
                        setBillingInfo({
                          ...billingInfo,
                          expiryDate: formattedValue
                        });
                        setErrors({
                          ...errors,
                          expiryDate: ''
                        });
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={billingInfo.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-semibold text-sm mb-2">Test Mode Cards</h3>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm mb-2">For testing, use any of these cards:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium">Success payment:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded">4242 4242 4242 4242</code>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Requires authentication:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded">4000 0025 0000 3155</code>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Declined payment:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded">4000 0000 0000 0002</code>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">For any test card:</span>
                        <span>Use any future date & any 3 digits for CVV</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <Lock className="h-4 w-4 mr-2 text-green-500" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full cta-button text-white"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Complete Order'
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/cart">
                  <Button variant="outline" className="w-full">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}