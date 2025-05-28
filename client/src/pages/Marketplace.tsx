import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDialog from "@/components/CartDialog";
import MarketplaceHero from "@/components/MarketplaceHero";

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
    // Get cart items from the main cart storage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Calculate total quantity across all items
    const totalQuantity = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
    setCartItemCount(totalQuantity);
  };
  
  // Product data - mix of AI agents and regular products
  const products = [
    {
      id: "1",
      name: "AI Strategy Template Pack",
      description: "Complete collection of AI implementation templates, roadmaps, and best practices for businesses starting their AI journey.",
      price: "19.99",
      rating: "4.8",
      reviewCount: 42,
      badge: "POPULAR",
      image: "ai-strategy-templates",
    },
    {
      id: "2",
      name: "Business Automation Guide",
      description: "Step-by-step guide to automate your business processes using AI tools and workflows. Includes real-world case studies.",
      price: "29.99",
      rating: "4.9",
      reviewCount: 38,
      badge: "NEW",
      image: "automation-guide",
    },
    {
      id: "3",
      name: "Custom AI Consultation",
      description: "One-on-one consultation session with our AI experts to discuss your specific business needs and implementation strategy.",
      price: "199.99",
      rating: "5.0",
      reviewCount: 15,
      badge: "PREMIUM",
      image: "ai-consultation",
    },
    {
      id: "4",
      name: "Business Intelligent Agent",
      description: "Intelligent agent that converts natural language queries into optimized SQL code instantly with AI-powered translation.",
      price: "39.00",
      rating: "5.0",
      reviewCount: 28,
      badge: "AI AGENT",
      image: "business-intelligent-agent",
    },
    {
      id: "5",
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
      price: "89.99",
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
        <MarketplaceHero />
        
        <div className="flex justify-between items-center mb-8 flex-wrap">
          <div className="flex space-x-4 mb-4 md:mb-0 overflow-x-auto pb-2">
            {["All Apps", "Popular", "New"].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "cta-button" : ""}
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
              <button 
                className="text-gray-700" 
                onClick={() => {
                  // Direct navigation to cart page
                  window.location.href = "/cart";
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" style={{ backgroundColor: '#0078D4' }}>
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-primary">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name || user.email}</span>
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