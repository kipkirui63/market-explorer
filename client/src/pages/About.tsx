import React from 'react';
import { Sparkles } from 'lucide-react';
import Layout from "@/components/Layout";

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
    </Layout>
  );
}