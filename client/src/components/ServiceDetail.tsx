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
    <div className="p-6 bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-custom hover:shadow-lg transition-all duration-300 border border-primary-100">
      <Icon className="h-10 w-10 text-primary-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-primary-900">{title}</h3>
      <p className="text-primary-700 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-primary-800 mb-2">Key Benefits:</h4>
        <ul className="list-disc list-inside text-primary-700 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-primary-800 mb-2">Use Cases:</h4>
        <ul className="list-disc list-inside text-primary-700 space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index}>{useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}