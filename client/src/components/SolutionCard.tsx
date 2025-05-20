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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="text-primary mb-5 flex justify-center">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-primary mb-3 text-center">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm text-center">{description}</p>
      
      {/* These sections are only visible on the expanded view */}
      <div className="hidden">
        <div>
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Key Benefits:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600">{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Use Cases:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {useCases.map((useCase, index) => (
              <li key={index} className="text-sm text-gray-600">{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
