import React from "react";

const CrispWriteImage = () => {
  return (
    <div className="w-full h-full bg-indigo-50 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* Document with writing elements */}
        <div className="bg-white rounded-lg shadow-md p-6 mx-auto w-64">
          <div className="flex flex-col space-y-4">
            {/* Wavy line */}
            <div className="flex items-center">
              <div className="h-0.5 w-5 bg-indigo-400 rounded-full"></div>
              <svg viewBox="0 0 100 20" className="h-5 w-32">
                <path
                  d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
              </svg>
              <div className="h-3 w-5 bg-indigo-400 rounded"></div>
              <svg viewBox="0 0 40 20" className="h-5 w-16">
                <path
                  d="M0,10 Q10,15 20,10 T40,10"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
              </svg>
              <div className="h-0.5 w-3 bg-indigo-400 rounded-full"></div>
            </div>

            {/* Text lines */}
            <div className="w-full flex">
              <div className="h-0.5 w-24 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-12 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="flex items-center">
              <div className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-10 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="relative w-full flex">
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-10 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-24 bg-indigo-400 rounded-full"></div>
              
              {/* Purple pen */}
              <div className="absolute top-0 right-8 transform -rotate-45">
                <div className="w-20 h-2 bg-indigo-500 rounded-full flex items-center">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full absolute left-0 transform -translate-x-1"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-6">
              <div className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-12 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-6 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-20 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="w-full flex">
              <div className="h-0.5 w-8 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-12 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="flex items-center">
              <div className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-20 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-12 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="w-full flex">
              <div className="h-0.5 w-24 bg-indigo-400 rounded-full"></div>
            </div>

            <div className="flex items-center">
              <div className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></div>
              <div className="h-0.5 w-16 bg-indigo-400 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <div className="text-indigo-700 font-bold text-xl">CrispWrite</div>
          <div className="text-indigo-600 text-sm">AI-Powered Writing Assistant</div>
        </div>
      </div>
    </div>
  );
};

export default CrispWriteImage;