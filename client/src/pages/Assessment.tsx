import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WaveBackground from "@/components/ui/WaveBackground";
import { useAssessment } from "@/hooks/use-assessment";
import { type Section } from "@/types/assessment";

export default function Assessment() {
  const { 
    sections, 
    step, 
    setStep, 
    responses, 
    handleResponse, 
    isStepValid, 
    handleSubmit, 
    loading, 
    submitted, 
    resetForm 
  } = useAssessment();

  const currentSection = sections[step] || {};
  const questionIndexOffset = sections.slice(0, step).reduce((acc, sec) => acc + sec.questions.length, 0);
  const progressPercentage = ((step + 1) / (sections.length + 1)) * 100;

  const navigateSteps = (direction: 'next' | 'prev') => {
    if (direction === 'next' && step < sections.length && isStepValid()) {
      setStep(step + 1);
    } else if (direction === 'prev') {
      setStep(Math.max(step - 1, 0));
    } else {
      alert('Please answer all questions before proceeding.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff] px-4 py-10 text-[#003366] font-sans relative overflow-hidden">
      {/* Wave Backgrounds */}
      {["Top", "Bottom", "Left", "Right"].map((position) => (
        <WaveBackground key={position} position={position.toLowerCase()} className="absolute" />
      ))}

      <motion.div
        className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl px-6 py-8 border border-blue-100 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start mb-6 gap-2">
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 bg-gradient-to-r from-[#0077cc] to-[#0099ff] rounded-full flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-[#003366]">CrispAI</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#003366] leading-tight">AI Readiness</h1>
          <h2 className="text-lg font-semibold text-[#003366]">Assessment</h2>
        </div>

        {!submitted ? (
          <>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
              <div
                className="h-2 rounded-full bg-[#90D5FF] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                {step < sections.length ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold mb-1">{currentSection.title}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {currentSection.description}
                      </p>
                      <p className="text-gray-700 text-sm font-semibold">
                        {currentSection.instructions}
                      </p>
                    </div>

                    {currentSection.questions.map((question, index) => (
                      <div key={index} className="space-y-2">
                        <p className="text-sm font-medium">
                          Q{questionIndexOffset + index + 1}. {question}
                        </p>
                        <div className="flex justify-end gap-2">
                          {[1, 2, 3, 4, 5].map((value) => {
                            const isActive = responses[`q${questionIndexOffset + index + 1}`] === value;
                            return (
                              <label
                                key={value}
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold cursor-pointer border transition ${
                                  isActive
                                    ? "bg-[#0077cc] text-white border-[#0077cc]"
                                    : "border-[#ccc] text-[#0077cc] hover:bg-[#0077cc] hover:text-white"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`q${questionIndexOffset + index + 1}`}
                                  value={value}
                                  checked={isActive}
                                  onChange={() =>
                                    handleResponse(`q${questionIndexOffset + index + 1}`, value)
                                  }
                                  className="hidden"
                                />
                                {value}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">You're almost done!</h2>
                    <p className="text-gray-700 text-sm">
                      Please confirm your contact details.
                    </p>

                    {["fullname", "email", "phone", "organization", "role"].map((field) => (
                      <input
                        key={field}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={responses[field] as string || ""}
                        onChange={(e) => handleResponse(field, e.target.value)}
                      />
                    ))}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-3 text-base font-semibold bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-full shadow hover:opacity-90 mt-4 disabled:opacity-70"
                    >
                      {loading ? "Submitting..." : "Submit Assessment"}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button
                  onClick={() => navigateSteps("prev")}
                  className="px-4 py-2 border border-[#0077cc] text-[#0077cc] rounded-lg hover:bg-[#f0f7ff] transition"
                >
                  Previous
                </button>
              )}
              {step < sections.length && (
                <button
                  onClick={() => navigateSteps("next")}
                  className={`px-4 py-2 bg-[#0077cc] text-white rounded-lg hover:bg-[#0066bb] transition ${
                    step === 0 ? "ml-auto" : ""
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#003366]">Thank You!</h2>
            <p className="text-gray-700 mb-8">
              Your assessment has been submitted successfully. We'll analyze your responses and get back to you shortly with personalized insights.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-[#0077cc] text-white rounded-lg hover:bg-[#0066bb] transition"
            >
              Take Another Assessment
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
