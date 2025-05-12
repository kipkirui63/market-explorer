import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WaveBackground } from "@/components/WaveBackground";

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  // Category data based on the screenshot
  const categories: Category[] = [
    { id: "chatbots", name: "AI Chatbots", count: 24 },
    { id: "analytics", name: "Data Analytics", count: 18 },
    { id: "vision", name: "Computer Vision", count: 12 },
    { id: "nlp", name: "Natural Language Processing", count: 16 }
  ];

  return (
    <Layout>
      <div className="relative">
        {/* Hero section with wave background */}
        <div className="px-4 py-12 md:py-20 max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">
            AI Solutions Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover, evaluate, and implement powerful AI tools to transform your
            business operations.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Search for AI tools and solutions..."
              className="pl-10 py-6 border-gray-300 rounded-full shadow-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Wave background at the bottom of the hero section */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            className="w-full h-24 md:h-32 fill-[#e6f7ff] transform translate-y-1" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-[#e6f7ff] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm hover:shadow transition cursor-pointer"
              >
                <span className="font-medium text-gray-800">{category.name}</span>
                <span className="bg-gray-200 text-gray-600 rounded-full py-1 px-3 text-sm">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured products section (placeholder for now) */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Solutions</h2>
        
        <div className="text-center py-8 text-gray-500">
          <p>Featured solutions will be displayed here.</p>
        </div>
      </div>
    </Layout>
  );
}