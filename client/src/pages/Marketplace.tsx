import React from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function Marketplace() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Solutions Marketplace
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our curated collection of AI-powered tools and solutions designed to transform your business operations.
          </motion.p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-center text-xl mb-8">Coming soon - Our marketplace is under development</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder content will go here */}
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need a Custom AI Solution?</h2>
          <p className="mb-6">Contact us to discuss how we can build a tailored AI solution for your specific needs.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Contact Us
            </a>
            <a 
              href="/assessment" 
              className="px-6 py-3 border border-[#0077cc] text-[#0077cc] rounded-lg font-medium hover:bg-[#0077cc] hover:text-white transition"
            >
              Take AI Readiness Assessment
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}