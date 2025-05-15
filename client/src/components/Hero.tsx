import React from 'react';
import { Link } from 'wouter';
import BrainIcon2 from '@/components/BrainIcon2';

export default function Hero() {
  return (
    <div className="relative bg-[#f4faff] pt-16 pb-12">
      <div className="absolute inset-0 bg-[url('/media/brain-image.jpg')] opacity-5 bg-cover bg-center" />
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <div className="flex justify-center mb-4">
          <BrainIcon2 className="w-32 h-32" />
        </div>
        <h1 className="text-5xl font-bold mb-1 text-[#003366]">Crisp AI</h1>
        <h2 className="text-2xl text-[#0099cc] mb-6">Artificial Intelligence</h2>
        <div className="w-full max-w-2xl mx-auto h-2 bg-[#0099cc] mb-8"></div>
        <p className="text-base mb-4 text-[#4a5568] max-w-2xl mx-auto">
          No longer just a futuristic concept—AI is here to revolutionize your business. Whether you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the true potential of Artificial Intelligence.
        </p>
        <p className="text-base mb-10 text-[#4a5568]">
          AI isn't one-size-fits-all, and neither are we.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            Get Started with Crisp AI Today!
          </Link>
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            Resume Analyzer
          </Link>
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            AI Recruitment Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}