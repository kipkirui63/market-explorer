import React from 'react';
import businessIntelligenceAgentImage from "../assets/images/business-intelligence-agent.png";

export default function BusinessIntelligentAgentImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={businessIntelligenceAgentImage} 
        alt="Business Intelligence Agent" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}