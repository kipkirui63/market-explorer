import React from "react";

const BusinessIntelligentAgentImage = () => {
  return (
    <div className="w-full h-full bg-blue-50 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* Database UI */}
        <div className="bg-white rounded-lg shadow-md p-3 mx-auto w-64">
          <div className="bg-blue-600 rounded-md py-2 px-3 mb-3 text-center">
            <div className="text-white font-semibold">SQL Query Generator</div>
          </div>
          
          {/* Natural Language Query */}
          <div className="bg-gray-100 rounded p-2 mb-3">
            <div className="text-blue-800 text-xs font-medium">User Query:</div>
            <div className="text-gray-800 text-sm">"Show me sales by region for the last quarter where revenue exceeded $10k"</div>
          </div>
          
          {/* Generated SQL */}
          <div className="bg-gray-900 rounded p-2 text-left font-mono text-xs text-green-400">
            <div>SELECT r.region_name, SUM(s.amount) as revenue</div>
            <div>FROM sales s</div>
            <div>JOIN regions r ON s.region_id = r.id</div>
            <div>WHERE s.date BETWEEN &apos;2024-01-01&apos; AND &apos;2024-03-31&apos;</div>
            <div>GROUP BY r.region_name</div>
            <div>HAVING SUM(s.amount) &gt; 10000</div>
            <div>ORDER BY revenue DESC;</div>
          </div>
          
          {/* Results Preview */}
          <div className="mt-3 border border-gray-200 rounded">
            <div className="grid grid-cols-2 bg-blue-100 text-xs font-medium text-blue-800 p-1">
              <div>Region</div>
              <div>Revenue</div>
            </div>
            <div className="grid grid-cols-2 text-xs p-1 border-t border-gray-200">
              <div>North America</div>
              <div>$324,590</div>
            </div>
            <div className="grid grid-cols-2 text-xs p-1 border-t border-gray-200">
              <div>Europe</div>
              <div>$245,120</div>
            </div>
            <div className="grid grid-cols-2 text-xs p-1 border-t border-gray-200">
              <div>Asia Pacific</div>
              <div>$187,430</div>
            </div>
          </div>
        </div>
        
        {/* Data Visualization */}
        <div className="absolute -right-4 top-20">
          <div className="bg-blue-600 rounded-md shadow-md p-2 w-24">
            <div className="flex items-end justify-around h-16 mb-1">
              <div className="w-4 bg-blue-300 rounded-t" style={{ height: '100%' }}></div>
              <div className="w-4 bg-blue-300 rounded-t" style={{ height: '75%' }}></div>
              <div className="w-4 bg-blue-300 rounded-t" style={{ height: '60%' }}></div>
            </div>
            <div className="text-white text-xs text-center font-medium">
              Data Analysis
            </div>
          </div>
          
          {/* Connector Lines */}
          <div className="absolute top-8 -left-8 w-8 border-t-2 border-dashed border-blue-300"></div>
          <div className="absolute top-16 -left-16 w-16 border-t-2 border-dashed border-blue-300"></div>
        </div>
        
        {/* Title */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <div className="text-blue-700 font-bold text-xl">Business Intelligent Agent</div>
          <div className="text-blue-600 text-sm">Natural Language to SQL Conversion</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligentAgentImage;