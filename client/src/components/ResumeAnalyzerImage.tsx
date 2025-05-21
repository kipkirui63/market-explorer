import React from "react";

const ResumeAnalyzerImage = () => {
  return (
    <div className="w-full h-full bg-blue-50 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* Resume Document */}
        <div className="bg-white rounded-md shadow-md p-3 mb-2 mx-auto w-44">
          <div className="bg-indigo-100 rounded py-1 px-2 mb-2">
            <div className="text-indigo-700 text-xs font-semibold">Professional Resume</div>
          </div>
          <div className="text-xs text-left">
            <div className="font-semibold">Sarah Johnson</div>
            <div className="text-gray-600 text-xs">Software Engineer | Data Scientist</div>
            <div className="mt-2 font-semibold">Experience</div>
            <div className="mt-1">
              <div className="font-medium">Senior Developer - ABC Tech</div>
              <div className="text-gray-500 text-xs">2020 - Present</div>
            </div>
            <div className="mt-1">
              <div className="font-medium">Software Engineer - XYZ Inc.</div>
              <div className="text-gray-500 text-xs">2017 - 2020</div>
            </div>
            <div className="mt-2 font-semibold">Skills</div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="bg-blue-100 px-2 rounded text-xs">Python</span>
              <span className="bg-blue-100 px-2 rounded text-xs">ML/AI</span>
              <span className="bg-blue-100 px-2 rounded text-xs">React</span>
              <span className="bg-blue-100 px-2 rounded text-xs">AWS</span>
            </div>
          </div>
        </div>

        {/* Analysis Circles */}
        <div className="absolute top-5 right-0 transform translate-x-20">
          <div className="flex flex-col gap-1">
            <div className="bg-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs">Technical</div>
                <div className="text-xs">Skills</div>
              </div>
            </div>
            <div className="bg-indigo-400 text-white rounded-full w-16 h-16 flex items-center justify-center relative left-4">
              <div className="text-center">
                <div className="text-xs">Experience</div>
                <div className="text-xs">Analysis</div>
              </div>
            </div>
            <div className="bg-indigo-400 text-white rounded-full w-16 h-16 flex items-center justify-center relative left-0">
              <div className="text-center">
                <div className="text-xs">Culture</div>
                <div className="text-xs">Fit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dotted Lines */}
        <div className="absolute top-10 right-7 w-14 border-t border-dashed border-indigo-300"></div>
        <div className="absolute top-24 right-3 w-14 border-t border-dashed border-indigo-300 transform rotate-45"></div>
        <div className="absolute top-40 right-7 w-14 border-t border-dashed border-indigo-300 transform -rotate-45"></div>

        {/* Candidate Score Card */}
        <div className="absolute bottom-0 right-2 bg-white rounded-md shadow-sm p-2 w-40">
          <div className="text-indigo-700 font-semibold text-sm mb-1">Candidate Score</div>
          <div className="text-xs">
            <div className="flex items-center">
              <span className="w-24 text-gray-600">Technical Skills:</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="ml-1 text-gray-600">85%</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="w-24 text-gray-600">Experience:</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="ml-1 text-gray-600">90%</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="absolute -bottom-10 left-0 right-0 text-center">
          <div className="text-indigo-700 font-bold text-lg">Multi-Agent Resume Analyzer</div>
          <div className="text-indigo-600 text-xs">AI-Powered Candidate Assessment</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerImage;