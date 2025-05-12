import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  // State for categories
  const [activeCategory, setActiveCategory] = useState("All Apps");
  
  return (
    <Layout>
      {/* Header with search bar */}
      <header className="bg-white border-b border-gray-200">
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077cc] focus:border-transparent"
              />
            </div>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            <Button className="bg-[#0077cc] hover:bg-[#0099cc]">Sign in</Button>
          </div>
        </div>
      </header>

      {/* Blue Hero Section */}
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
            <div className="bg-white rounded-full p-6 flex items-center justify-center">
              <svg viewBox="0 0 250 250" width="180" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="125" cy="125" r="120" stroke="#0077cc" strokeWidth="10" fill="white"/>
                <circle cx="125" cy="125" r="60" stroke="#0077cc" strokeWidth="10" fill="white"/>
                <path d="M125 5V65" stroke="#0077cc" strokeWidth="10"/>
                <path d="M125 185V245" stroke="#0077cc" strokeWidth="10"/>
                <text x="165" y="130" fontFamily="Arial" fontSize="60" fontWeight="bold" fill="#0077cc">AI</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              className={activeCategory === "All Apps" ? "bg-[#0077cc]" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
              onClick={() => setActiveCategory("All Apps")}
            >
              All Apps
            </Button>
            <Button 
              className={activeCategory === "AI Agents" ? "bg-[#0077cc]" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
              onClick={() => setActiveCategory("AI Agents")}
            >
              AI Agents
            </Button>
            <Button 
              className={activeCategory === "Development" ? "bg-[#0077cc]" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
              onClick={() => setActiveCategory("Development")}
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
          <p className="text-gray-500">Applications will be displayed here</p>
        </div>
      </section>
    </Layout>
  );
}