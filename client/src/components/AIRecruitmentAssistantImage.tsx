import React from "react";

const AIRecruitmentAssistantImage = () => {
  return (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* Recruitment form */}
        <div className="bg-white rounded-lg shadow-md p-5 mx-auto w-64">
          <div className="text-gray-700 font-semibold text-lg text-center mb-6">
            Recruitment Process Workflow
          </div>
          
          {/* Upload field */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-medium mb-1 flex items-center">
              Upload Resume <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex mt-1">
              <div className="bg-gray-700 text-white text-xs rounded-l-md py-2 px-3">
                Choose File
              </div>
              <div className="flex-1 border border-gray-300 rounded-r-md py-2 px-3 text-sm text-gray-500">
                No file chosen
              </div>
            </div>
          </div>
          
          {/* Email field */}
          <div className="mb-6">
            <label className="text-gray-700 text-sm font-medium mb-1 flex items-center">
              Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center mt-1 border border-gray-200 bg-gray-100 rounded-md py-2 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-gray-400 text-sm">Type here...</span>
            </div>
          </div>
          
          {/* Toggle */}
          <div className="flex items-center justify-start mb-6">
            <div className="w-10 h-5 rounded-full bg-gray-200 flex items-center p-0.5">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <span className="text-gray-600 text-sm ml-2">
              Ask for human approval before each step
            </span>
          </div>
          
          {/* Submit button */}
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center">
            Submit
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Title */}
        <div className="absolute -bottom-10 left-0 right-0 text-center">
          <div className="text-indigo-700 font-bold text-lg">AI Recruitment Assistant</div>
          <div className="text-indigo-600 text-sm">Automated Candidate Screening</div>
        </div>
      </div>
    </div>
  );
};

export default AIRecruitmentAssistantImage;