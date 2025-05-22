import React from 'react';
import LayoutNoFooter from "@/components/LayoutNoFooter";
import AIReadinessAssessment from "@/components/AIReadinessAssessment";

export default function Assessment() {
  return (
    <LayoutNoFooter>
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900 text-center">
              AI Readiness Assessment
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Discover how prepared your organization is to implement and benefit from AI technology.
              Complete this assessment to receive a personalized readiness score and recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            <AIReadinessAssessment />
          </div>
        </div>
      </div>
    </LayoutNoFooter>
  );
}