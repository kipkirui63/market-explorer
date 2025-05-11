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
    <div className="bg-background-light rounded-lg shadow p-6 border border-gray-100 hover:shadow-lg transition">
      <div className="text-primary-light mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <h4 className="font-semibold mb-2">Key Benefits:</h4>
      <ul className="space-y-2 mb-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-light mr-2">•</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      
      <h4 className="font-semibold mb-2">Use Cases:</h4>
      <ul className="space-y-2">
        {useCases.map((useCase, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-light mr-2">•</span>
            <span>{useCase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
