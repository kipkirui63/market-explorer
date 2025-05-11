import { motion } from "framer-motion";
import WaveBackground from "@/components/ui/WaveBackground";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  featured: boolean;
  imgUrl: string;
};

export default function Marketplace() {
  const [filter, setFilter] = useState<string | null>(null);
  
  const products: Product[] = [
    {
      id: "1",
      name: "AI Customer Service Chatbot",
      description: "Intelligent chatbot that handles customer inquiries 24/7, reducing response time by 40%.",
      category: "Customer Service",
      price: 299,
      tags: ["Chatbot", "Customer Support", "NLP"],
      featured: true,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/message-circle.svg"
    },
    {
      id: "2",
      name: "Predictive Inventory Manager",
      description: "AI-powered inventory management that predicts stock needs and prevents shortages.",
      category: "Operations",
      price: 399,
      tags: ["Inventory", "Prediction", "Supply Chain"],
      featured: true,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/package.svg"
    },
    {
      id: "3",
      name: "Smart Email Assistant",
      description: "AI tool that drafts, schedules, and optimizes emails based on recipient behavior.",
      category: "Productivity",
      price: 149,
      tags: ["Email", "Marketing", "Automation"],
      featured: false,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/mail.svg"
    },
    {
      id: "4",
      name: "Customer Sentiment Analyzer",
      description: "Real-time analysis of customer feedback across multiple channels.",
      category: "Analytics",
      price: 249,
      tags: ["Sentiment Analysis", "Feedback", "NLP"],
      featured: false,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/bar-chart-2.svg"
    },
    {
      id: "5",
      name: "AI Content Generator",
      description: "Create high-quality blog posts, product descriptions, and social media content.",
      category: "Marketing",
      price: 199,
      tags: ["Content", "Marketing", "Copywriting"],
      featured: true,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-text.svg"
    },
    {
      id: "6",
      name: "Sales Forecasting Tool",
      description: "Predict future sales with 85% accuracy using historical data and market trends.",
      category: "Sales",
      price: 349,
      tags: ["Sales", "Forecasting", "Analytics"],
      featured: false,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/trending-up.svg"
    },
    {
      id: "7",
      name: "AI Meeting Assistant",
      description: "Automatically takes notes, creates action items, and summarizes meetings.",
      category: "Productivity",
      price: 179,
      tags: ["Meetings", "Transcription", "Productivity"],
      featured: false,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/calendar.svg"
    },
    {
      id: "8",
      name: "HR Candidate Matcher",
      description: "Match job candidates to positions based on skills, experience, and company culture.",
      category: "Human Resources",
      price: 279,
      tags: ["HR", "Recruiting", "Matching"],
      featured: false,
      imgUrl: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/users.svg"
    }
  ];

  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = filter
    ? products.filter(product => product.category === filter)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F4FAFF]">
      <section className="relative overflow-hidden py-16">
        <WaveBackground position="bottom" />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">AI Marketplace</h1>
            <p className="text-lg mb-8 text-gray-700">
              Discover our curated collection of AI tools designed to transform how your business operates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <Button 
              variant={filter === null ? "default" : "outline"}
              onClick={() => setFilter(null)}
              className="mb-2"
            >
              All Categories
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-[#F4FAFF] p-2 rounded-full mb-4">
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-full text-primary"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bold text-[#003366]">{product.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">{product.category}</CardDescription>
                      </div>
                      {product.featured && (
                        <Badge variant="default" className="bg-[#0099ff]">Featured</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-gray-700 text-sm">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center border-t">
                    <span className="font-semibold text-[#003366]">${product.price}</span>
                    <Button size="sm" className="bg-[#0077cc] hover:bg-[#0099ff]">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F4FAFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom AI Solution?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Don't see exactly what you need? Our team can build custom AI solutions tailored to your unique business requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="px-8 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
              >
                Contact for Custom Solutions
              </a>
              <a 
                href="/assessment" 
                className="px-8 py-3 border border-[#0077cc] text-[#0077cc] rounded-lg font-medium hover:bg-[#0077cc] hover:text-white transition"
              >
                Take AI Readiness Assessment
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
