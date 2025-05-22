import React, { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All Apps");
  const { user } = useAuth();
  
  // Product data based on the provided productUrlMap
  const products = [
    {
      id: "1",
      name: "Business Intelligent Agent",
      description: "Intelligent agent that converts natural language queries into optimized SQL code instantly with AI-powered translation.",
      price: "39.00",
      rating: "5.0",
      reviewCount: 7,
      image: ""
    },
    {
      id: "2",
      name: "AI Recruitment Assistant",
      description: "Intelligent assistant that streamlines your recruitment process with automated candidate screening and ranking.",
      price: "19.00",
      rating: "5.0",
      reviewCount: 11,
      badge: "NEW",
      image: ""
    },
    {
      id: "3",
      name: "CrispWrite",
      description: "AI-powered writing tool that helps you create clear, concise, and professional documents effortlessly.",
      price: "89.99",
      rating: "4.0",
      reviewCount: 6,
      badge: "BESTSELLER",
      image: ""
    },
    {
      id: "4",
      name: "SOP Assistant",
      description: "Specialized tool for creating and optimizing Standard Operating Procedures with AI-powered templates.",
      price: "19.00",
      rating: "5.0",
      reviewCount: 5,
      image: ""
    },
    {
      id: "5",
      name: "Resume Analyzer",
      description: "Advanced AI system that comprehensively analyzes and scores resumes for optimal hiring decisions.",
      price: "19.00",
      rating: "5.0",
      reviewCount: 10,
      image: ""
    }
  ];

  return (
    <Layout>
      {/* Header Nav */}
      <div className="border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2V8" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16V22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-blue-500 font-semibold">CrispAI Marketplace</span>
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
              <a href="#" className="text-gray-700" onClick={(e) => {
                e.preventDefault();
                
                if (!user) {
                  // If not logged in, redirect to auth page without alert
                  window.location.href = "/auth";
                  return;
                }
                
                // Only show cart contents if user is logged in
                const userCartKey = `cart_${user.id}`;
                const cart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
                const itemCount = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
                const totalAmount = cart.reduce((total: number, item: any) => 
                  total + parseFloat(item.price) * (item.quantity || 1), 0).toFixed(2);
                
                alert(`Your Cart (${itemCount} items):\n\n${
                  cart.map((item: any) => 
                    `${item.name} - $${item.price} x ${item.quantity || 1} = $${
                      (parseFloat(item.price) * (item.quantity || 1)).toFixed(2)
                    }`
                  ).join('\n')
                }\n\nTotal: $${totalAmount}`);
              }}>
                <ShoppingCart className="h-5 w-5" />
                {(() => {
                  try {
                    // Show cart count only if logged in, with user-specific cart
                    if (!user) return null;
                    
                    const userCartKey = `cart_${user.id}`;
                    const cart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
                    const itemCount = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
                    return itemCount > 0 ? (
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {itemCount}
                      </span>
                    ) : null;
                  } catch {
                    return null;
                  }
                })()}
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
              <Button 
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={() => window.location.href = "/auth"}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Blue Hero Section */}
      <div className="bg-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">
                Find the Perfect Digital Tools
              </h1>
              <p className="text-xl mb-8">
                Discover and purchase powerful applications and AI agents to enhance your workflow
              </p>
              <Button 
                className="bg-white text-blue-500 hover:bg-gray-100 px-6 py-2"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Marketplace
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="flex items-center">
                <img
                  src="https://crispai.crispvision.org/media/crisp-logo.png"
                  alt="CrispAI Logo"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-8 bg-gray-50" id="categories">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              className={activeCategory === "All Apps" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              onClick={() => setActiveCategory("All Apps")}
            >
              All Apps
            </Button>
            <Button 
              variant={activeCategory === "AI Agents" ? "default" : "outline"} 
              className={activeCategory === "AI Agents" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-200 text-gray-700 border-none hover:bg-gray-300"}
              onClick={() => setActiveCategory("AI Agents")}
            >
              AI Agents
            </Button>
            <Button 
              variant={activeCategory === "Development" ? "default" : "outline"} 
              className={activeCategory === "Development" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-200 text-gray-700 border-none hover:bg-gray-300"}
              onClick={() => setActiveCategory("Development")}
            >
              Development
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Applications */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}