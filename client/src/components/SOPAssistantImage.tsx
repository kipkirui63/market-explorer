import React from "react";

const SOPAssistantImage = () => {
  return (
    <div className="w-full h-full bg-teal-50 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* SOP Document */}
        <div className="bg-white rounded-lg shadow-md p-3 mx-auto w-64">
          <div className="bg-teal-600 rounded-md py-2 px-3 mb-3 text-center">
            <div className="text-white font-semibold">Standard Operating Procedure</div>
          </div>
          
          <div className="bg-gray-100 rounded p-2 mb-3">
            <div className="text-teal-700 text-sm">Title: Project Management Guidelines</div>
          </div>
          
          <div className="space-y-2 text-left">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded text-white flex items-center justify-center text-xs mr-2">✓</div>
              <div className="text-sm">Determine project scope</div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded text-white flex items-center justify-center text-xs mr-2">✓</div>
              <div className="text-sm">Allocate resources</div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 border border-teal-500 rounded mr-2 h-5 w-5"></div>
              <div className="text-sm">Perform risk assessment</div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 border border-teal-500 rounded mr-2 h-5 w-5"></div>
              <div className="text-sm">Document project plan</div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 border border-teal-500 rounded mr-2 h-5 w-5"></div>
              <div className="text-sm">Obtain stakeholder approval</div>
            </div>
          </div>
        </div>
        
        {/* AI Assistant */}
        <div className="absolute top-24 -right-4">
          <div className="bg-teal-500 rounded-full w-20 h-20 flex items-center justify-center">
            <div className="relative">
              <div className="bg-white rounded-full w-3 h-3 absolute top-1 left-2"></div>
              <div className="bg-white rounded-full w-3 h-3 absolute top-1 right-2"></div>
              <div className="bg-white rounded-full w-10 h-5 absolute bottom-1 left-1/2 transform -translate-x-1/2" style={{ borderRadius: '0 0 10px 10px' }}></div>
            </div>
          </div>
          
          {/* Dotted Lines */}
          <div className="absolute top-6 -left-14 w-14 border-t-2 border-dashed border-teal-300 z-0"></div>
          <div className="absolute top-14 -left-24 w-24 border-t-2 border-dashed border-teal-300 z-0"></div>
        </div>
        
        {/* Title */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <div className="text-teal-700 font-bold text-xl">SOP Assistant</div>
          <div className="text-teal-600 text-sm">AI-Powered Procedure Optimization</div>
        </div>
      </div>
    </div>
  );
};

export default SOPAssistantImage;