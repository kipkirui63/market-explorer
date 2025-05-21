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

// Enhanced product image display with illustrative background
export const ProductImage = ({ id }: { id: string }) => {
  // Create a more visually appealing background for each product type
  const getBackgroundStyle = (productId: string) => {
    switch (productId) {
      case "1": // Business Intelligent Agent
        return "bg-gradient-to-br from-blue-50 to-cyan-100 border-b-4 border-blue-400";
      case "2": // AI Recruitment Assistant
        return "bg-gradient-to-br from-blue-50 to-indigo-100 border-b-4 border-indigo-400";
      case "3": // CrispWrite
        return "bg-gradient-to-br from-blue-50 to-purple-100 border-b-4 border-purple-400";
      case "4": // SOP Assistant
        return "bg-gradient-to-br from-blue-50 to-teal-100 border-b-4 border-teal-400";
      case "5": // Resume Analyzer
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-b-4 border-blue-500";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100";
    }
  };

  // Get product name based on ID
  const getProductName = (productId: string) => {
    switch (productId) {
      case "1": return "Business Intelligent Agent";
      case "2": return "AI Recruitment Assistant";
      case "3": return "CrispWrite";
      case "4": return "SOP Assistant";
      case "5": return "Resume Analyzer";
      default: return "AI Product";
    }
  };

  // Get product descriptions
  const getProductDescription = (productId: string) => {
    switch (productId) {
      case "1": return "Natural language to SQL";
      case "2": return "Automatic candidate screening";
      case "3": return "Professional document creation";
      case "4": return "Streamlined process documentation";
      case "5": return "Detailed resume analysis";
      default: return "AI-powered solution";
    }
  };

  return (
    <div className={`w-full h-full ${getBackgroundStyle(id)} p-4 flex flex-col items-center justify-center`}>
      <ProductIcon id={id} />
      <div className="mt-2 text-center">
        <div className="text-blue-900 font-semibold text-sm">{getProductName(id)}</div>
        <div className="text-blue-700 text-xs">{getProductDescription(id)}</div>
      </div>
    </div>
  );
};

export default ProductImage;