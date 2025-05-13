import { motion } from "framer-motion";
import { Link } from "wouter";
import BrainIcon from "@/components/BrainIcon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 bg-[#f0f5fa]">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <BrainIcon className="h-20 w-20 text-[#0099ff] mb-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#003366]">Crisp AI</h1>
            <p className="text-lg text-[#0099ff]">Artificial Intelligence</p>
          </div>
          
          {/* Horizontal Blue Bar */}
          <div className="h-3 bg-[#0099ff] w-full mb-6"></div>
          
          {/* Description Text */}
          <div className="mb-8">
            <p className="text-lg mb-4 text-gray-700">
              No longer just a futuristic concept—AI is here to revolutionize your business. Whether
              you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the
              true potential of Artificial Intelligence.
            </p>
            <p className="text-lg text-gray-700">
              AI isn't one-size-fits-all, and neither are we.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/services">
              <button className="w-64 px-6 py-3 bg-[#0099ff] text-white rounded-full font-medium hover:bg-[#0077cc] transition">
                Get Started with Crisp AI Today!
              </button>
            </Link>
            <Link href="/services">
              <button className="w-64 px-6 py-3 bg-[#0099ff] text-white rounded-full font-medium hover:bg-[#0077cc] transition">
                Multi-Agent Resume Analyzer
              </button>
            </Link>
            <Link href="/services">
              <button className="w-64 px-6 py-3 bg-[#0099ff] text-white rounded-full font-medium hover:bg-[#0077cc] transition">
                AI Recruitment Assistant
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
