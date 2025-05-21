import React from 'react';
import { Database, Users, FileText, FileCheck, FileSearch } from 'lucide-react';

// Component to display product-specific icon based on product id
export const ProductIcon = ({ id, size = 80, className = "" }: { id: string, size?: number, className?: string }) => {
  const iconProps = {
    size,
    className: `text-blue-500 ${className}`
  };
  
  switch (id) {
    case "1": // Business Intelligent Agent
      return <Database {...iconProps} />;
    case "2": // AI Recruitment Assistant
      return <Users {...iconProps} />;
    case "3": // CrispWrite
      return <FileText {...iconProps} />;
    case "4": // SOP Assistant
      return <FileCheck {...iconProps} />;
    case "5": // Resume Analyzer
      return <FileSearch {...iconProps} />;
    default:
      return <Database {...iconProps} />;
  }
};

// Styled background container for product icons
export const ProductImage = ({ id }: { id: string }) => {
  return (
    <div className="w-full aspect-square bg-blue-50 rounded-lg flex items-center justify-center">
      <ProductIcon id={id} />
    </div>
  );
};

export default ProductImage;