import React from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function MarketplaceCTA() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-900 text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Check Out Our AI Marketplace</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Discover a curated collection of AI tools and solutions for every business need.
        </p>
        <Link href="/marketplace">
          <span className="inline-flex items-center px-6 py-3 border-2 border-white text-lg font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-900 transition-colors duration-200 cursor-pointer">
            Visit the Marketplace
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}