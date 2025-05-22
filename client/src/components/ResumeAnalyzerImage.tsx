import React from "react";

const ResumeAnalyzerImage = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background with gradient */}
      <rect width="500" height="300" rx="20" fill="url(#paint0_linear)" />
      
      {/* White card background */}
      <rect x="50" y="50" width="400" height="200" rx="15" fill="white" />
      
      {/* Resume document icon */}
      <g transform="translate(150, 100)">
        {/* Document outline */}
        <path d="M0 15C0 6.71573 6.71573 0 15 0H65C68.3137 0 71 2.68629 71 6V14L63 22H15C6.71573 22 0 15.2843 0 7V15Z" fill="#0076C6"/>
        <path d="M0 15C0 6.71573 6.71573 0 15 0H65C68.3137 0 71 2.68629 71 6V94C71 97.3137 68.3137 100 65 100H15C6.71573 100 0 93.2843 0 85V15Z" stroke="#0076C6" strokeWidth="5"/>
        
        {/* Dog-ear corner */}
        <path d="M71 14L63 22V14H71Z" fill="#0076C6"/>
        
        {/* Person icon */}
        <circle cx="25" cy="25" r="12" fill="#0076C6"/>
        <path d="M12 60C12 51.7157 18.7157 45 27 45H33C41.2843 45 48 51.7157 48 60V65H12V60Z" fill="#0076C6"/>
        
        {/* Lines representing text */}
        <rect x="50" y="25" width="30" height="5" rx="2.5" fill="#0076C6"/>
        <rect x="50" y="35" width="30" height="5" rx="2.5" fill="#0076C6"/>
        <rect x="12" y="75" width="48" height="5" rx="2.5" fill="#0076C6"/>
        <rect x="12" y="85" width="48" height="5" rx="2.5" fill="#0076C6"/>
      </g>
      
      {/* Magnifying glass with checkmark */}
      <g transform="translate(280, 100)">
        {/* Magnifying glass outline */}
        <circle cx="25" cy="25" r="24" stroke="#0076C6" strokeWidth="5" fill="none"/>
        <path d="M42 42L55 55" stroke="#0076C6" strokeWidth="5" strokeLinecap="round"/>
        
        {/* Checkmark inside */}
        <path d="M15 25L22 32L35 19" stroke="#0076C6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* Text at bottom */}
      <g>
        <text x="250" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#00264D">Resume Analyzer Agent</text>
      </g>
      
      {/* Define the gradient */}
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C7E9FF"/>
          <stop offset="1" stopColor="#7ACAFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ResumeAnalyzerImage;