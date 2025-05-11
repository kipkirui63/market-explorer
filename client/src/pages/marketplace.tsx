import { motion } from "framer-motion";
import { Search, Filter, ShoppingBag, Tag, Star, Download, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";

const categories = [
  { name: "AI Chatbots", count: 24 },
  { name: "Data Analytics", count: 18 },
  { name: "Computer Vision", count: 12 },
  { name: "Natural Language Processing", count: 15 },
  { name: "Machine Learning Models", count: 20 },
  { name: "Business Intelligence", count: 14 },
  { name: "Prediction Tools", count: 9 },
];

const tools = [
  {
    id: 1,
    name: "SmartAgent AI",
    description: "An intelligent customer service chatbot that understands natural language.",
    category: "AI Chatbots",
    price: "$49/month",
    rating: 4.8,
    reviews: 124,
    tags: ["Customer Service", "Support", "Sales"],
    featured: true,
  },
  {
    id: 2,
    name: "DataViz Pro",
    description: "Turn complex data into beautiful, interactive visualizations instantly.",
    category: "Data Analytics",
    price: "$79/month",
    rating: 4.7,
    reviews: 98,
    tags: ["Visualization", "Analytics", "Reports"],
    featured: true,
  },
  {
    id: 3,
    name: "ObjectDetect",
    description: "Advanced object detection and recognition for images and video.",
    category: "Computer Vision",
    price: "$99/month",
    rating: 4.6,
    reviews: 76,
    tags: ["Image Recognition", "Object Detection", "Computer Vision"],
    featured: false,
  },
  {
    id: 4,
    name: "TextSummarizer",
    description: "Automatically generate concise, accurate summaries of long documents.",
    category: "Natural Language Processing",
    price: "$39/month",
    rating: 4.5,
    reviews: 102,
    tags: ["Summarization", "Content Creation", "Documentation"],
    featured: false,
  },
  {
    id: 5,
    name: "PredictFlow",
    description: "ML-powered forecasting tool for business metrics and KPIs.",
    category: "Machine Learning Models",
    price: "$129/month",
    rating: 4.9,
    reviews: 88,
    tags: ["Forecasting", "Business Intelligence", "Prediction"],
    featured: true,
  },
  {
    id: 6,
    name: "BI Dashboard",
    description: "Comprehensive business intelligence dashboards that update in real-time.",
    category: "Business Intelligence",
    price: "$89/month",
    rating: 4.6,
    reviews: 112,
    tags: ["Dashboard", "Reporting", "Analytics"],
    featured: false,
  },
];

export default function Marketplace() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-background-light">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark">AI Solutions Marketplace</h1>
            <p className="text-lg mb-8 text-gray-700">
              Discover, evaluate, and implement powerful AI tools to transform your business operations.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for AI tools and solutions..." 
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-12"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Marketplace Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-background-light rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name} className="flex justify-between items-center">
                        <button className="text-gray-700 hover:text-primary transition">
                          {category.name}
                        </button>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="free" className="mr-2" />
                      <label htmlFor="free" className="text-gray-700">Free</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="under-50" className="mr-2" />
                      <label htmlFor="under-50" className="text-gray-700">Under $50/month</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="50-100" className="mr-2" />
                      <label htmlFor="50-100" className="text-gray-700">$50 - $100/month</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="over-100" className="mr-2" />
                      <label htmlFor="over-100" className="text-gray-700">Over $100/month</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Ratings</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                        <label htmlFor={`rating-${rating}`} className="text-gray-700 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-2">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Listings */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured AI Tools</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-600">Sort by:</span>
                  <select className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <motion.div 
                    key={tool.id}
                    className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${tool.featured ? 'border-primary' : 'border-gray-200'}`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tool.featured && (
                      <div className="bg-primary-light text-white text-xs font-semibold px-3 py-1 text-center">
                        FEATURED
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                        <div className="bg-background-light p-2 rounded-full">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-primary-dark text-xs px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                        <div className="mx-2 text-gray-300">|</div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{tool.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({tool.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.map((tag) => (
                          <span key={tag} className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">{tool.price}</span>
                        <button className="bg-primary hover:bg-primary-light text-white px-3 py-1 rounded transition-colors duration-200 flex items-center text-sm">
                          Learn More
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 px-6 py-2 rounded-full font-medium">
                  Load More Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background-light to-white relative overflow-hidden">
        <WaveBackground position="top" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your business with AI?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our AI experts can help you select and implement the right tools for your specific needs.
              Get personalized recommendations and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:opacity-90 transition shadow-md">
                Schedule a Consultation
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition">
                Browse All Solutions
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
