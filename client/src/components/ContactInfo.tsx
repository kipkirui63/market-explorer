import React from 'react';
import { Phone, Mail, Building, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-10">
      <h2 className="text-2xl font-semibold text-primary-800 mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-50 p-5 rounded-lg">
          <div className="flex items-start">
            <Phone className="h-6 w-6 text-primary-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-primary-900 mb-1">Phone</h3>
              <a 
                href="tel:+13435801393" 
                className="text-primary-700 hover:text-primary-900 transition-colors"
              >
                +1 (343) 580-1393
              </a>
              <p className="text-sm text-primary-600 mt-1">Monday - Friday, 9am - 5pm EST</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 p-5 rounded-lg">
          <div className="flex items-start">
            <Mail className="h-6 w-6 text-primary-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-primary-900 mb-1">Email</h3>
              <a 
                href="mailto:ai@crispvision.org" 
                className="text-primary-700 hover:text-primary-900 transition-colors"
              >
                ai@crispvision.org
              </a>
              <p className="text-sm text-primary-600 mt-1">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}