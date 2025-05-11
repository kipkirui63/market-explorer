import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-white pt-16">
      <div className="absolute inset-0 bg-[url('/media/brain-image.jpg')] opacity-5 bg-cover bg-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative">
        <div className="inline-flex items-center justify-center space-x-4 mb-8">
          <Brain className="h-20 w-20 text-primary-600" />
          <div className="text-left">
            <h1 className="text-5xl font-bold text-primary-900 mb-2">Crisp AI</h1>
            <p className="text-xl text-primary-700">Artificial Intelligence</p>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-primary-900 mb-6 bg-clip-text text-transparent bg-gradient-custom">
          Turning Complex Problems into Intelligent Solutions
        </h2>
        <p className="text-xl text-primary-800 max-w-3xl mx-auto mb-8">
          No longer just a futuristic concept—AI is here to revolutionize your business. Whether you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the true potential of Artificial Intelligence.
        </p>
        <p className="text-lg text-primary-700 mb-8">
          AI isn't one-size-fits-all, and neither are we.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/services"
            style={{margin: '20px'}}
            className="inline-flex items-center px-8 py-4 mb-2 text-base font-medium rounded-full text-white bg-gradient-custom hover:opacity-90 transition-all shadow-custom hover:shadow-lg"
          >
            Get Started with Crisp AI Today!
          </Link>
          <Link
            style={{margin: '20px'}}
            href="/services"
            className="inline-flex items-center px-8 py-4 mb-2 text-base font-medium rounded-full text-white bg-gradient-custom hover:opacity-90 transition-all shadow-custom hover:shadow-lg"
          >
            Multi-Agent Resume Analyzer
          </Link>
          <Link
            style={{margin: '20px'}}
            href="/services"
            className="inline-flex items-center px-8 py-4 mb-2 text-base font-medium rounded-full text-white bg-gradient-custom hover:opacity-90 transition-all shadow-custom hover:shadow-lg"
          >
            AI Recruitment Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}