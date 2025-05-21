import React from 'react';
import { Database, Users, FileText, FileCheck, FileSearch } from 'lucide-react';
import ResumeAnalyzerImage from './ResumeAnalyzerImage';
import SOPAssistantImage from './SOPAssistantImage';
import BusinessIntelligentAgentImage from './BusinessIntelligentAgentImage';

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

// Enhanced product image display with detailed illustrations for each product
export const ProductImage = ({ id }: { id: string }) => {
  // Use custom detailed illustrations for specific products
  switch (id) {
    case "1": // Business Intelligent Agent
      return <BusinessIntelligentAgentImage />;
    case "4": // SOP Assistant
      return <SOPAssistantImage />;
    case "5": // Resume Analyzer
      return <ResumeAnalyzerImage />;
    default:
      return <ProductIconDisplay id={id} />;
  }
};

// Fallback icon display for products without custom illustrations
const ProductIconDisplay = ({ id }: { id: string }) => {
  // Create a visually appealing background for each product type
  const getBackgroundStyle = (productId: string) => {
    switch (productId) {
      case "2": // AI Recruitment Assistant
        return "bg-gradient-to-br from-blue-50 to-indigo-100 border-b-4 border-indigo-400";
      case "3": // CrispWrite
        return "bg-gradient-to-br from-blue-50 to-purple-100 border-b-4 border-purple-400";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100";
    }
  };

  // Get product name based on ID
  const getProductName = (productId: string) => {
    switch (productId) {
      case "2": return "AI Recruitment Assistant";
      case "3": return "CrispWrite";
      default: return "AI Product";
    }
  };

  // Get product descriptions
  const getProductDescription = (productId: string) => {
    switch (productId) {
      case "2": return "Automatic candidate screening";
      case "3": return "Professional document creation";
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