import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Layout from '@/components/Layout';
import { Link } from 'wouter';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CartPage() {
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
    // Redirect to checkout page
    window.location.href = "/checkout";
  };
  
  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/marketplace" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
          <h1 className="text-2xl font-bold ml-4">Your Shopping Cart</h1>
        </div>

        {!user ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">
              You need to be signed in to view your cart contents.
            </p>
            <Button
              onClick={() => window.location.href = "/auth"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/marketplace">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          ${parseFloat(item.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border rounded w-24">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 hover:bg-gray-100 border-r"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 flex-1 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100 border-l"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4 pb-4 border-b">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalAmount}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}