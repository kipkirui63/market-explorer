import React from 'react';

export default function ResumeAnalyzerImage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex justify-center">
            <div className="w-72 h-72 relative">
              {/* Resume document icon */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <svg width="130" height="130" viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" />
                </svg>
                {/* Person icon overlay */}
                <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                  </svg>
                </div>
                {/* Document lines */}
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/4">
                  <svg width="60" height="25" viewBox="0 0 60 25" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0" width="60" height="5" rx="2.5" />
                    <rect y="10" width="60" height="5" rx="2.5" />
                    <rect y="20" width="60" height="5" rx="2.5" />
                  </svg>
                </div>
              </div>
              
              {/* Magnifying glass with checkmark */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                {/* Checkmark inside */}
                <div className="absolute top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/4">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Resume Analyzer Agent</h3>
        </div>
      </div>
    </div>
  );
}