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
    <div className="bg-blue-50 rounded-lg p-6">
      <div className="text-primary mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Key Benefits:</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-primary mr-2 flex-shrink-0">•</span>
                <span className="text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Use Cases:</h4>
          <ul className="space-y-1">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-primary mr-2 flex-shrink-0">•</span>
                <span className="text-gray-600">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
