import React from "react";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import crispAILogo from "@/assets/crispai_logo.png";
import MarketplaceCTA from "@/components/MarketplaceCTA";

export default function Marketplace() {
  return (
    <Layout>
      {/* Custom Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="text-[#0099cc] w-6 h-6 mr-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2V8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-[#0099cc]">CrispAI Marketplace</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                Home
              </a>
              <a href="#" className="ml-4 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
              <a href="#" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#0099cc] hover:bg-[#0088bb]">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Using MarketplaceCTA component */}
      <MarketplaceCTA />

      {/* Categories */}
      <div id="marketplace" className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-[#0099cc] text-white rounded-md">
              All Apps
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              AI Agents
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Development
            </button>
          </div>
        </div>
      </div>

      {/* Featured Applications */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Featured Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for featured applications */}
          </div>
        </div>
      </div>
    </Layout>
  );
}