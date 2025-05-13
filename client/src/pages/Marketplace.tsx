import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import ProductCard from "@/components/ProductCard";

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All Apps");
  const { user } = useAuth();
  
  // Product data based on the provided productUrlMap
  const products = [
    {
      id: "1",
      name: "Text to SQL",
      description: "Convert natural language queries into optimized SQL code instantly with AI-powered translation.",
      price: "59.99",
      rating: "5.0",
      reviewCount: 7,
      image: ""
    },
    {
      id: "2",
      name: "AI Recruitment Assistant",
      description: "Intelligent assistant that streamlines your recruitment process with automated candidate screening and ranking.",
      price: "39.99",
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
      price: "69.99",
      rating: "5.0",
      reviewCount: 5,
      image: ""
    },
    {
      id: "5",
      name: "Multi-Agent Resume Analyzer",
      description: "Advanced AI system that uses multiple agents to comprehensively analyze and score resumes for optimal hiring.",
      price: "79.99",
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
            <a href="#" className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            {user ? (
              <span className="text-gray-700 flex items-center">
                {user.username}
              </span>
            ) : (
              <Link href="/auth">
                <Button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Sign in
                </Button>
              </Link>
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
              <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-400/30">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-3">
                    <div className="w-16 h-16 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-white"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-white"></div>
                  </div>
                  <div className="text-white text-3xl font-bold">CrispAI</div>
                </div>
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