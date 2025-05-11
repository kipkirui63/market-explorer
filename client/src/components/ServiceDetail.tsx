import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceDetailProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  useCases: string[];
}

export default function ServiceDetail({ icon: Icon, title, description, benefits, useCases }: ServiceDetailProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="mb-6">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-primary-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-primary-800 mb-2">Key Benefits:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-primary-800 mb-2">Use Cases:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index} className="text-gray-700">{useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}