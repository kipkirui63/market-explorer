import AssessmentLayout from "@/components/AssessmentLayout";
import AIReadinessAssessment from "@/components/AIReadinessAssessment";

export default function Assessment() {
  return (
    <AssessmentLayout>
      <div className="py-8 bg-background-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-dark text-center">
              AI Readiness Assessment
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Discover how prepared your organization is to implement and benefit from AI technology.
              Complete this assessment to receive a personalized readiness score and recommendations.
            </p>
          </div>
          
          <AIReadinessAssessment />
        </div>
      </div>
    </AssessmentLayout>
  );
}
