import React from "react";
import Layout from "@/components/Layout";
import { Search, Filter } from "lucide-react";

export default function Marketplace() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Solutions Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover, evaluate, and implement powerful AI tools to transform your
            business operations.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for AI tools and solutions..."
              className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Wave background */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            className="w-full h-24 fill-[#e6f7ff]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-[#e6f7ff] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          </div>

          <div className="space-y-3">
            <CategoryItem name="AI Chatbots" count={24} />
            <CategoryItem name="Data Analytics" count={18} />
            <CategoryItem name="Computer Vision" count={12} />
            <CategoryItem name="Natural Language Processing" count={16} />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Solutions</h2>
        
        {/* Placeholder for actual products */}
        <div className="text-center py-8 text-gray-500">
          <p>Featured AI solutions will be displayed here.</p>
        </div>
      </div>
    </Layout>
  );
}

// Category Item Component
function CategoryItem({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm hover:shadow transition cursor-pointer">
      <span className="font-medium text-gray-800">{name}</span>
      <span className="bg-gray-200 text-gray-600 rounded-full py-1 px-3 text-sm">
        {count}
      </span>
    </div>
  );
}