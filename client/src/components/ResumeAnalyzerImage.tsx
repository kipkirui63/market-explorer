import React from 'react';

export default function ResumeAnalyzerImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-md overflow-hidden">
        {/* Document with lines */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="w-48 h-56 bg-white rounded-md shadow-sm p-4 flex flex-col gap-2">
            <div className="h-4 w-32 bg-blue-200 rounded"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
            <div className="h-4 w-20 bg-blue-200 rounded mt-2"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
            <div className="h-10 w-10 absolute right-4 top-4 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
              </svg>
            </div>
          </div>
          {/* Magnifying glass */}
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transform rotate-12">
            <div className="w-8 h-8 border-4 border-white rounded-full"></div>
            <div className="absolute w-4 h-1 bg-white -bottom-1 -right-1 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}