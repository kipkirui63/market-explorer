import React from 'react';
import { Database, Users, FileText, FileCheck, FileSearch } from 'lucide-react';
import ResumeAnalyzerImage from './ResumeAnalyzerImage';
import SOPAssistantImage from './SOPAssistantImage';
import BusinessIntelligentAgentImage from './BusinessIntelligentAgentImage';
import CrispWriteImage from './CrispWriteImage';
import AIRecruitmentAssistantImage from './AIRecruitmentAssistantImage';

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
  // Use custom detailed illustrations for all products
  switch (id) {
    case "1": // Business Intelligent Agent
      return <BusinessIntelligentAgentImage />;
    case "2": // AI Recruitment Assistant
      return <AIRecruitmentAssistantImage />;
    case "3": // CrispWrite
      return <CrispWriteImage />;
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
  // Create a visually appealing background for generic products
  const getBackgroundStyle = () => {
    return "bg-gradient-to-r from-blue-50 to-blue-100 border-b-4 border-blue-400";
  };

  return (
    <div className={`w-full h-full ${getBackgroundStyle()} p-4 flex flex-col items-center justify-center`}>
      <ProductIcon id={id} />
      <div className="mt-2 text-center">
        <div className="text-blue-900 font-semibold text-sm">AI Product</div>
        <div className="text-blue-700 text-xs">Intelligent automation solution</div>
      </div>
    </div>
  );
};

export default ProductImage;