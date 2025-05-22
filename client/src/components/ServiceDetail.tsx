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
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="mb-4">
        <Icon className="h-8 w-8 text-primary mb-3" />
        <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-primary mb-2 text-sm">Key Benefits:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-primary mb-2 text-sm">Use Cases:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {useCases.map((useCase, index) => (
            <li key={index} className="text-gray-700">{useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}