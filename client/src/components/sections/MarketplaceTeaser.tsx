import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";

export default function MarketplaceTeaser() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Discover AI Tools in Our Marketplace</h2>
            <p className="text-xl mb-8">
              Browse our curated collection of AI applications, tools, and solutions tailored for your industry needs.
            </p>
            <Link href="/marketplace">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg inline-flex items-center">
                Visit Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-75 blur-lg"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md flex flex-col items-center justify-center">
                      <Brain className="h-10 w-10 text-blue-500 mb-3" />
                      <div className="text-gray-800 font-medium text-center">AI Tool {index}</div>
                      <div className="text-sm text-gray-500 text-center mt-1">Starting at $29</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}