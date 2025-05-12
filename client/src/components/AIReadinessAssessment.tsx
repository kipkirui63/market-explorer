import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import crispAILogo from '@/assets/crispai_logo.png';

interface Section {
  title: string;
  description: string;
  instructions: string;
  questions: string[];
}

const sections: Section[] = [
  {
    title: 'Strategy',
    description: 'AI-ready organizations have a proactive, customer-focused AI strategy that is clearly communicated. They are clear on their AI vision, able to influence key stakeholders, and have a defined process for identifying and prioritizing high-value AI projects.',
    instructions: 'Please rate each statement on a scale of 1 to 5 where 1 indicates "Strongly disagree" and 5 indicates "Strongly agree".',
    questions: [
      'Our organization monitors and identifies AI trends and applies them to our industry.',
      'Our organization predicts the impact of AI on customers and takes steps to respond.',
      'Our organization has a clear AI vision that guides decision-making and inspires teams.',
      'Our organization influences key stakeholders to shape our AI strategy and policies.',
      'Our organization finds and prioritizes AI projects that align with our goals and deliver measurable value.',
    ],
  },
  {
    title: 'Execution',
    description: 'AI-ready organizations lead with clarity and agility. They bring together teams from across departments, invest in employee upskilling, and have repeatable models to scale successful AI initiatives.',
    instructions: 'Please rate each statement on a scale of 1 to 5 where 1 indicates "Strongly disagree" and 5 indicates "Strongly agree".',
    questions: [
      'Our organization guides and enables significant changes in how we work with AI.',
      'Our organization brings together teams from across the business to deliver AI projects.',
      "Our organization provides training and development to build employees' AI capabilities.",
      'Our organization has a process for scaling successful AI projects in different areas.',
    ],
  },
  {
    title: 'Innovation',
    description: 'AI-ready organizations foster a culture of experimentation and innovation. They explore disruptive use cases and fund promising projects.',
    instructions: 'Please rate each statement on a scale of 1 to 5 where 1 indicates "Strongly disagree" and 5 indicates "Strongly agree".',
    questions: [
      'Our organization encourages, supports, and measures AI experiments.',
      'Our organization explores how AI can transform or disrupt traditional ways of working.',
      'Our organization has a clear approach for funding and growing promising AI projects.',
      'Our organization partners with AI platforms, startups, or research institutions to boost innovation.',
    ],
  },
  {
    title: 'Enabling Capabilities',
    description: 'AI-ready organizations build strong foundations to support AI adoption. They ensure their data systems are robust and accessible, their teams are developing in-house AI skills, and they follow ethical frameworks that guide responsible use of AI.',
    instructions: 'Please rate each statement on a scale of 1 to 5 where 1 indicates "Strongly disagree" and 5 indicates "Strongly agree".',
    questions: [
      'Our organization has reliable data infrastructure to support AI initiatives.',
      'Our organization actively develops in-house AI expertise and technical talent.',
      'Our organization follows clear ethical principles in how we develop and use AI.',
    ],
  },
  {
    title: 'Impact & Vision',
    description: 'AI-ready organizations not only adopt AI — they define what success looks like.',
    instructions: 'Please rate each statement on a scale of 1 to 5 where 1 indicates "Strongly disagree" and 5 indicates "Strongly agree".',
    questions: [
      'Our organization has a clear picture of what success with AI would look like.',
      'Our organization has specific goals or metrics to track the impact of AI projects.',
      'Our organization understands which current challenges or goals AI could help us solve.',
      'Our organization can describe how AI could transform a key part of our operations or services.',
    ],
  },
];

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2zmVSxxEYrm_9dUoVuZxhMYSon2wEiiRx_xtW5m6nfjqSXSruv4iBUkSH_m1C1mGW0w/exec';

const WaveSVG = ({ id }: { id: string }) => (
  <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`blueWave${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0077cc" />
        <stop offset="100%" stopColor="#0099ff" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#blueWave${id})`}
      d="M0,224L30,202.7C60,181,120,139,180,144C240,149,300,203,360,197.3C420,192,480,128,540,122.7C600,117,660,171,720,197.3C780,224,840,224,900,213.3C960,203,1020,181,1080,186.7C1140,192,1200,224,1260,213.3C1320,203,1380,149,1410,122.7L1440,96L1440,320L0,320Z"
    />
  </svg>
);

export default function AIReadinessAssessment() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const currentSection = sections[step] || {};
  const questionIndexOffset = sections.slice(0, step).reduce((acc, sec) => acc + sec.questions.length, 0);
  const progressPercentage = ((step + 1) / (sections.length + 1)) * 100;

  const isStepValid = (): boolean => {
    return currentSection.questions.every((_, i) => responses[`q${questionIndexOffset + i + 1}`]);
  };

  const handleResponse = (key: string, value: string | number) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const navigateSteps = (direction: 'next' | 'prev') => {
    if (direction === 'next' && step < sections.length && isStepValid()) {
      setStep(prev => prev + 1);
    } else if (direction === 'prev') {
      setStep(prev => Math.max(prev - 1, 0));
    } else {
      alert('Please answer all questions before proceeding.');
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['fullname', 'organization', 'role', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !responses[field]);
    
    if (missingFields.length) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(responses).forEach(([key, value]) => 
        form.append(key, value.toString())
      );

      const res = await fetch(SCRIPT_URL, { method: 'POST', body: form });
      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
      }
    } catch {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResponses({});
    setStep(0);
    setShowForm(true);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#f4faff] px-4 py-10 text-[#003366] font-sans relative overflow-hidden">
      {/* Wave Backgrounds */}
      {['Top', 'Bottom', 'Left', 'Right'].map(position => (
        <div 
          key={position}
          className={`absolute ${
            position === 'Top' ? 'top-0 left-0 w-full rotate-180' :
            position === 'Bottom' ? 'bottom-0 left-0 w-full' :
            position === 'Left' ? 'left-0 top-0 h-full w-40 rotate-90 -translate-x-1/2' :
            'right-0 top-0 h-full w-40 -rotate-90 translate-x-1/2'
          } z-0`}
        >
          <WaveSVG id={position} />
        </div>
      ))}

      <motion.div
        className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl px-6 py-8 border border-blue-100 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start mb-6 gap-2">
          <div className="h-16 w-full mb-2 flex items-center">
            <img src={crispAILogo} alt="CrispAI Logo" className="h-12 mr-3" />
            <div>
              <h1 className="text-2xl font-extrabold text-[#003366] leading-tight">AI Readiness</h1>
              <h2 className="text-lg font-semibold text-[#003366]">Assessment</h2>
            </div>
          </div>
        </div>

        {showForm ? (
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
                          {[1, 2, 3, 4, 5].map(value => {
                            const isActive = responses[`q${questionIndexOffset + index + 1}`] === value;
                            return (
                              <label
                                key={value}
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold cursor-pointer border transition ${
                                  isActive 
                                    ? 'bg-[#0077cc] text-white border-[#0077cc]' 
                                    : 'border-[#ccc] text-[#0077cc] hover:bg-[#0077cc] hover:text-white'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`q${questionIndexOffset + index + 1}`}
                                  value={value}
                                  checked={isActive}
                                  onChange={() => handleResponse(`q${questionIndexOffset + index + 1}`, value)}
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
                    
                    {['fullname', 'email', 'phone', 'organization', 'role'].map(field => (
                      <input
                        key={field}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={e => handleResponse(field, e.target.value)}
                      />
                    ))}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-3 text-base font-semibold bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-full shadow hover:opacity-90 mt-4 disabled:opacity-70"
                    >
                      {loading ? 'Submitting...' : 'Submit Assessment'}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step <= sections.length && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => navigateSteps('prev')}
                  disabled={step === 0}
                  className={`px-4 py-2 rounded-lg border ${
                    step === 0
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-[#0077cc] text-[#0077cc] hover:bg-[#0077cc] hover:text-white transition'
                  }`}
                >
                  Previous
                </button>
                {step < sections.length && (
                  <button
                    onClick={() => navigateSteps('next')}
                    className="px-4 py-2 bg-[#0077cc] text-white rounded-lg hover:bg-[#0099ff] transition shadow"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">
              Your assessment has been submitted successfully. One of our AI consultants will review your responses and get back to you within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-[#0077cc] text-white rounded-lg hover:bg-[#0099ff] transition shadow"
            >
              Start a New Assessment
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
