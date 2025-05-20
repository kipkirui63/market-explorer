import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
  useCases: string[];
}

export default function SolutionCard({ title, description, icon, benefits, useCases }: SolutionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-6 mx-auto">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center">{title}</h3>
      <p className="text-gray-600 mb-6 text-center">{description}</p>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2 text-primary-dark border-b border-gray-200 pb-1">Key Benefits</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2 text-primary-dark border-b border-gray-200 pb-1">Use Cases</h4>
          <ul className="space-y-2">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-gray-700">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
