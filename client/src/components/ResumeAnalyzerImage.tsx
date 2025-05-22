import React from 'react';
import resumeAnalyzerImage from "../assets/images/resume_analyzer_agent.png";

export default function ResumeAnalyzerImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={resumeAnalyzerImage}
        alt="Resume Analyzer Agent" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}