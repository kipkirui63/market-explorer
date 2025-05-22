import React from 'react';
import Layout from "@/components/Layout";
import { Sparkles, Award, BookOpen, Users, Code, Clock, ArrowUpRight } from 'lucide-react';
import WaveBackground from '@/components/WaveBackground';
import OurValues from '@/components/OurValues';

export default function About() {
  return (
    <Layout>
      <section id="about" className="py-24 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary-900">Your AI Partners in Innovation</h2>
              <p className="text-primary-800 mb-8 text-lg">
                Crisp AI is more than just a consultancy—we're your trusted partner in transforming your business with cutting-edge AI solutions. From automating tedious processes to creating intelligent chatbots and leveraging Microsoft Copilot, our mission is simple: make your business smarter, faster, and more innovative.
              </p>
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-custom">
                <Sparkles className="h-8 w-8 text-primary-500" />
                <span className="text-xl font-semibold text-primary-700">Smarter Solutions, Faster Results</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-custom opacity-10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
                alt="AI Innovation"
                className="rounded-2xl shadow-custom relative transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-blue-600 font-medium text-lg text-center">
                No longer just a futuristic concept—AI is here to revolutionize your business. Whether you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the true potential of Artificial Intelligence.
              </p>
              <p>
                Founded in 2022, CrispAI emerged from a simple observation: while artificial intelligence was 
                rapidly transforming industries, many businesses struggled to implement AI effectively. The 
                technical complexities, resource requirements, and integration challenges created barriers that 
                prevented organizations from realizing AI's full potential.
              </p>
              <p className="text-blue-600 font-medium text-lg text-center">
                AI isn't one-size-fits-all, and neither are we.
              </p>
              <p>
                Our founders, with backgrounds spanning machine learning, software engineering, and business 
                strategy, came together with a shared vision: to bridge the gap between cutting-edge AI research 
                and practical business applications. We set out to create a company that would not only provide 
                powerful AI solutions but also guide businesses through the entire implementation journey.
              </p>
              <p>
                Today, CrispAI serves clients across industries, from startups to Fortune 500 companies. 
                Our approach combines deep technical expertise with business acumen, ensuring that our AI 
                solutions deliver measurable value and integrate seamlessly with existing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <OurValues />



      {/* Why Choose Us Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose CrispAI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Code className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Technical Expertise</h3>
              <p className="text-gray-700">
                Our team includes PhDs in machine learning, experienced data scientists, and 
                software engineers who have developed AI solutions for diverse industries.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Clock className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Rapid Implementation</h3>
              <p className="text-gray-700">
                We've developed frameworks and methodologies that accelerate AI adoption, 
                allowing you to see results and ROI faster.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <ArrowUpRight className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Measurable Results</h3>
              <p className="text-gray-700">
                We focus on solutions that deliver tangible business value. Our implementations 
                have helped clients reduce costs by up to 40% and increase revenue by up to 25%.
              </p>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
}
