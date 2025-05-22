import React from 'react';
import sopAgentImage from "../assets/images/sop-agent.png";

export default function SOPAssistantImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={sopAgentImage} 
        alt="SOP Agent" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}