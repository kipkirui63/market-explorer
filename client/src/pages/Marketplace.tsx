import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import crispAILogo from "@/assets/crispai_logo.png";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Apps");

  const categories = [
    { id: "all", name: "All Apps" },
    { id: "agents", name: "AI Agents" },
    { id: "dev", name: "Development" }
  ];

  return (
    <Layout>
      {/* Marketplace Content */}
      <div>
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-[#0077cc] w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2V8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16V22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-xl font-semibold text-[#0077cc]">CrispAI Marketplace</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0077cc]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <a href="#" className="font-medium">Home</a>
              <a href="#" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
              <Button className="bg-[#0077cc] hover:bg-[#0099cc]">Sign in</Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-[#0077cc] text-white pb-0">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl font-bold mb-4">Find the Perfect Digital Tools</h1>
                <p className="text-xl mb-8">
                  Discover and purchase powerful applications and AI agents to enhance your workflow
                </p>
                <button className="bg-white text-[#0077cc] px-6 py-2 rounded-md font-medium hover:bg-gray-100">
                  Browse Marketplace
                </button>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <img 
                  src={crispAILogo} 
                  alt="CrispAI Logo" 
                  className="h-36 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-6 py-2 rounded-md font-medium ${
                    selectedCategory === category.name 
                    ? "bg-[#0077cc] text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Applications */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Featured Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Products will be displayed here */}
              <div className="text-center py-8 text-gray-500">
                Loading products...
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}