import React from 'react';
import resumeAnalyzerImage from "../assets/images/crispwrite1.png";

export default function ResumeAnalyzerImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={resumeAnalyzerImage}
        alt="Resume Analyzer" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}