import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
      <a
        href="tel:+13435801393"
        className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors"
      >
        <Phone className="h-5 w-5" />
        <span>+1 (343) 580-1393</span>
      </a>
      <a
        href="mailto:ai@crispvision.org"
        className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors"
      >
        <Mail className="h-5 w-5" />
        <span>ai@crispvision.org</span>
      </a>
    </div>
  );
}