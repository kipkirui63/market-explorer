import React from 'react';
import { Link } from 'wouter';

export default function MarketplaceHero() {
  return (
    <div className="bg-blue-600 rounded-2xl overflow-hidden mb-12">
      <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
        <div className="w-full md:w-3/5 text-white mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Perfect<br />
            Digital Tools
          </h1>
          <p className="text-xl mb-8">
            Discover and purchase powerful<br />
            applications and AI agents to enhance<br />
            your workflow
          </p>
          <a className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-md hover:bg-blue-50 transition-colors">
            Browse Marketplace
          </a>
        </div>
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <img 
            src="/img/crispai-logo-white.svg" 
            alt="CrispAI"
            className="h-24 md:h-32" 
          />
        </div>
      </div>
    </div>
  );
}