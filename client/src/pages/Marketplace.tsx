import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDialog from "@/components/CartDialog";

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All Apps");
  const { user } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Get cart item count when component mounts or user changes
  useEffect(() => {
    updateCartItemCount();
    
    // Set up a listener for localStorage changes within the same window
    window.addEventListener('storage', updateCartItemCount);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('storage', updateCartItemCount);
    };
  }, [user]);
  
  // Function to update the cart item count
  const updateCartItemCount = () => {
    if (!user) {
      setCartItemCount(0);
      return;
    }
    
    const userCartKey = `cart_${user.id}`;
    const cartItems = JSON.parse(localStorage.getItem(userCartKey) || '[]');
    
    // Calculate total quantity across all items
    const totalQuantity = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
    setCartItemCount(totalQuantity);
  };
  
  // Product data based on the provided productUrlMap
  const products = [
    {
      id: "1",
      name: "Business Intelligent Agent",
      description: "Intelligent agent that converts natural language queries into optimized SQL code instantly with AI-powered translation.",
      price: "39.00",
      rating: "5.0",
      reviewCount: 28,
      badge: "NEW",
      image: "business-intelligent-agent",
    },
    {
      id: "2",
      name: "AI Recruitment Assistant",
      description: "Streamlines talent acquisition with intelligent resume screening, candidate matching, and automated interview scheduling.",
      price: "19.00",
      rating: "4.8",
      reviewCount: 42,
      badge: "TRENDING",
      image: "ai-recruitment-assistant",
    },
    {
      id: "3",
      name: "CrispWrite",
      description: "Advanced content creation tool that generates high-quality, SEO-optimized articles, blog posts, and marketing copy.",
      price: "29.00",
      rating: "4.9",
      reviewCount: 124,
      badge: "BESTSELLER",
      image: "crispwrite",
    },
    {
      id: "4",
      name: "SOP Assistant",
      description: "Automated documentation assistant that creates, updates, and maintains standard operating procedures with minimal input.",
      price: "19.00",
      rating: "4.7",
      reviewCount: 35,
      image: "sop-assistant",
    },
    {
      id: "5",
      name: "Resume Analyzer",
      description: "Professional resume evaluation tool that provides detailed feedback, improvement suggestions, and ATS compatibility assessment.",
      price: "19.00",
      rating: "4.5",
      reviewCount: 67,
      image: "resume-analyzer",
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === "All Apps" 
    ? products 
    : products.filter(product => {
        if (activeCategory === "Popular") return product.badge === "BESTSELLER" || product.badge === "TRENDING";
        if (activeCategory === "New") return product.badge === "NEW";
        return true;
      });

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-blue-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center">
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                CrispAI Marketplace
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                Discover powerful AI tools to transform your business
              </p>
              <p className="mb-8 text-blue-100">
                Browse our curated collection of advanced AI applications designed to enhance your workflow, automate tasks, and drive innovation.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
              <img 
                src="/img/crispai-logo-white.svg" 
                alt="CrispAI Marketplace" 
                className="h-32 md:h-40"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-8 flex-wrap">
          <div className="flex space-x-4 mb-4 md:mb-0 overflow-x-auto pb-2">
            {["All Apps", "Popular", "New"].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-blue-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search applications..." 
                className="pl-10 py-1 pr-4 border border-gray-300 rounded"
              />
            </div>
            <a href="#" className="text-gray-700">Home</a>
            <div className="relative">
              <a 
                href="/cart" 
                className="text-gray-700" 
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    // If not logged in, redirect to auth page without alert
                    window.location.href = "/auth";
                    return;
                  }
                  // Let the link navigate to the cart page when logged in
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </a>
            </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-primary">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.username}</span>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline" className="ml-2">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Cart Dialog */}
        <CartDialog open={cartOpen} onOpenChange={setCartOpen} />
      </main>
    </Layout>
  );
}