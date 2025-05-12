import React from "react";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import crispAILogo from "@/assets/crispai_logo.png";

export default function Marketplace() {
  return (
    <Layout>
      {/* Header */}
      <header className="border-b border-gray-200 py-3 bg-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
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
      </header>

      {/* Hero Section with blue background */}
      <section className="bg-[#0077cc] text-white">
        <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
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
              className="h-36 object-contain bg-white rounded-full p-4"
            />
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-[#0077cc]"
            >
              All Apps
            </Button>
            <Button 
              variant="outline"
            >
              AI Agents
            </Button>
            <Button 
              variant="outline"
            >
              Development
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product placeholders */}
            <div className="text-center py-8 text-gray-500">
              Products coming soon...
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}