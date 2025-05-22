import React from 'react';
import { Link } from 'wouter';

export default function MarketplaceHero() {
  return (
    <div style={{
      backgroundColor: "#0076c6",
      borderRadius: "0.75rem"
    }} className="mb-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
        <div className="w-full md:w-2/3 text-white mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Perfect<br />
            Digital Tools
          </h1>
          <p className="text-xl mb-8">
            Discover and purchase powerful<br />
            applications and AI agents to enhance<br />
            your workflow
          </p>
          <a href="#products" className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-md hover:bg-blue-50 transition-colors">
            Browse Marketplace
          </a>
        </div>
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center">
          <img
            src="https://crispai.crispvision.org/media/crisp-logo.png"
            alt="CrispAI Logo"
            className="rounded-xl shadow-2xl w-3/4 h-auto 
                     filter brightness-0 invert 
                     sepia-[100%] saturate-[500%] hue-rotate-[172deg]"
          />
        </div>
      </div>
    </div>
  );
}