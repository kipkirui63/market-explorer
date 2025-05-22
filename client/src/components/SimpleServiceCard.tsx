import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SimpleServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function SimpleServiceCard({ icon: Icon, title, description }: SimpleServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg text-center flex flex-col items-center">
      <div className="text-blue-500 mb-3">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-primary-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}