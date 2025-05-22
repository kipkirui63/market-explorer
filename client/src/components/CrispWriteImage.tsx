import React from 'react';
import crispWriteImage from "../assets/images/crispwrite2.png";

export default function CrispWriteImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={crispWriteImage} 
        alt="CrispWrite" 
        className="object-contain h-full max-h-44"
      />
    </div>
  );
}