import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Marketplace() {
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
            <button className="bg-blue-500 text-white px-4 py-1 rounded">
              Sign in
            </button>
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
              >
                Browse Marketplace
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="bg-white rounded-full p-6">
                <div className="text-blue-500 w-32 h-32">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2V8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-500 hover:bg-blue-600">All Apps</Button>
            <Button variant="outline" className="bg-gray-200 text-gray-700 border-none hover:bg-gray-300">AI Agents</Button>
            <Button variant="outline" className="bg-gray-200 text-gray-700 border-none hover:bg-gray-300">Development</Button>
          </div>
        </div>
      </div>

      {/* Featured Applications */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Applications</h2>
          <div className="text-center text-gray-500">
            {/* We'll add actual applications here later */}
            Featured applications will be displayed here.
          </div>
        </div>
      </div>
    </Layout>
  );
}