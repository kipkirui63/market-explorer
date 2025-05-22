import React from 'react';
import aiRecruitmentAssistantImage from "../assets/images/ai-recruitment-assistant.png";

export default function AIRecruitmentAssistantImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={aiRecruitmentAssistantImage} 
        alt="AI Recruitment Assistant" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}