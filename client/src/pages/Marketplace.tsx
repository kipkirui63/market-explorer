import React, { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Settings, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import crispAILogo from "@/assets/crispai_logo.png";

// Product types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  tag?: string;
  category: string;
  image: string;
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Apps");

  // Product data based on screenshots
  const products: Product[] = [
    {
      id: "1",
      name: "Text to SQL",
      description: "Convert natural language queries into optimized SQL code instantly with AI-powered translation.",
      price: 59.99,
      rating: 5.0,
      reviews: 7,
      category: "AI Agents",
      image: "/placeholder-sql.png"
    },
    {
      id: "2",
      name: "AI Recruitment Assistant",
      description: "Intelligent assistant that streamlines your recruitment process with automated candidate screening and ranking.",
      price: 39.99,
      rating: 5.0,
      reviews: 11,
      tag: "NEW",
      category: "AI Agents",
      image: "/placeholder-recruitment.png"
    },
    {
      id: "3",
      name: "CrispWrite",
      description: "AI-powered writing tool that helps you create clear, concise, and professional documents effortlessly.",
      price: 89.99,
      rating: 4.0,
      reviews: 6,
      tag: "BESTSELLER",
      category: "AI Agents",
      image: "/placeholder-write.png"
    },
    {
      id: "4",
      name: "SOP Assistant",
      description: "Specialized tool for creating and optimizing Standard Operating Procedures with AI-powered templates.",
      price: 69.99,
      rating: 5.0,
      reviews: 5,
      category: "Development",
      image: "/placeholder-sop.png"
    },
    {
      id: "5",
      name: "Multi-Agent Resume Analyzer",
      description: "Advanced AI system that uses multiple agents to comprehensively analyze and score resumes for optimal hiring.",
      price: 79.99,
      rating: 5.0,
      reviews: 10,
      category: "AI Agents",
      image: "/placeholder-resume.png"
    }
  ];

  // Categories from screenshots
  const categories = [
    { name: "All Apps", count: products.length },
    { name: "AI Agents", count: products.filter(p => p.category === "AI Agents").length },
    { name: "Development", count: products.filter(p => p.category === "Development").length }
  ];

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All Apps" || product.category === selectedCategory) &&
    (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={crispAILogo} alt="CrispAI Logo" className="h-8" />
              <span className="text-xl font-semibold text-[#0077cc]">CrispAI Marketplace</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  className="px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
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

        {/* Hero Section */}
        <section className="bg-[#0077cc] text-white py-16">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">Find the Perfect Digital Tools</h1>
              <p className="text-lg mb-6">
                Discover and purchase powerful applications and AI agents to enhance your workflow
              </p>
              <Button variant="outline" className="bg-white text-[#0077cc] hover:bg-gray-100">
                Browse Marketplace
              </Button>
            </div>
            <div className="lg:w-1/2 flex justify-end">
              <img src={crispAILogo} alt="CrispAI" className="h-32" />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Button 
                  key={category.name} 
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={selectedCategory === category.name ? "bg-[#0077cc]" : ""}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Featured Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden border border-gray-200 rounded-lg">
                  <div className="p-4">
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 flex items-center justify-center">
                      {/* Product image placeholder */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <span className="text-[#0077cc] text-lg">{product.name}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <span className="text-lg font-bold text-[#0077cc]">${product.price}</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-blue-500">7-day free trial</span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                      <span className="ml-auto">
                        <button className="text-sm text-blue-500 hover:text-blue-700">Rate</button>
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button className="flex-1 bg-[#0077cc] hover:bg-[#0099cc]">Add to Cart</Button>
                      <Button variant="outline" className="flex-none px-3">Demo</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CrispAI Marketplace?</h2>
            <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
              Discover powerful, innovative apps crafted and backed by CrispAI's commitment to quality and automation
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-[#0077cc]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Purchases</h3>
                <p className="text-gray-600">
                  All transactions are encrypted and secure using industry-standard protection.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Settings className="h-8 w-8 text-[#0077cc]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adaptability</h3>
                <p className="text-gray-600">
                  Our applications evolve with your needs, continuously improving through AI-powered updates and customization options.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Headphones className="h-8 w-8 text-[#0077cc]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is always available to help with any issues or questions.
                </p>
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
              <p className="mb-6">Subscribe to our newsletter for the latest apps and exclusive deals</p>
              <div className="flex max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077cc] focus:border-transparent"
                />
                <Button className="rounded-l-none bg-[#0077cc]">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">CrispAI</h3>
                <p className="text-gray-400 mb-4">The premier marketplace for digital applications and AI agents.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Developer Resources</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">API Documentation</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Refund Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">License Information</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© 2025 CrispAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}