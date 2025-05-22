import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { jsPDF } from 'jspdf';


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

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7BmwwKgVdzl7LKa1_KlW_GLcw0gnzLYYXN-yzo0X0-QLRtbF0fkBGg9q9YX-5sRli/exec';

const useCases = [
  "Automating repetitive or manual tasks",
  "Personalizing customer experiences",
  "Improving decisions with better data",
  "Boosting team productivity",
  "Reducing costs or risks",
  "Freeing time for strategic thinking"
];

const mapResponse = (val: string) => {
  switch (val) {
    case '1': return 'Strongly Disagree';
    case '2': return 'Disagree';
    case '3': return 'Neutral';
    case '4': return 'Agree';
    case '5': return 'Strongly Agree';
    default: return '';
  }
};

const WaveSVG = ({ id }: { id: string }) => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
    <path 
      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
      opacity=".25" 
      className="fill-[#90D5FF]"
    ></path>
    <path 
      d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
      opacity=".5" 
      className="fill-[#90D5FF]"
    ></path>
    <path 
      d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
      className="fill-[#90D5FF]"
    ></path>
  </svg>
);

const RatingButton = ({ value, isActive, onChange }: { 
  value: number; 
  isActive: boolean; 
  onChange: () => void 
}) => (
  <label
    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold cursor-pointer border transition ${
      isActive
        ? 'bg-[#0077cc] text-white border-[#0077cc]'
        : 'border-[#ccc] text-[#0077cc] hover:bg-[#0077cc] hover:text-white'
    }`}
  >
    <input
      type="radio"
      value={value}
      checked={isActive}
      onChange={onChange}
      className="hidden"
    />
    {value}
  </label>
);

const UseCaseOption = ({ usecase, selected, onChange }: {
  usecase: string;
  selected: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <motion.label
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
      selected ? "bg-[#0077cc] text-white" : "border-gray-300 hover:border-[#0077cc]"
    }`}
  >
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked)}
      className="hidden"
    />
    <span>{usecase}</span>
  </motion.label>
);

const SubmitButton = ({ loading, onClick }: {
  loading: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-3 text-base font-semibold bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-full shadow hover:opacity-90 mt-4 disabled:opacity-70 transition-all"
  >
    {loading ? (
      <span className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      </span>
    ) : (
      'Submit Assessment'
    )}
  </button>
);

const NavigationButtons = ({ step, maxStep, onPrev, onNext, loading }: {
  step: number;
  maxStep: number;
  onPrev: () => void;
  onNext: () => void;
  loading: boolean;
}) => (
  <div className="flex justify-between mt-8">
    <button
      onClick={onPrev}
      disabled={step === 0 || loading}
      className="px-4 py-2 bg-gray-100 text-[#003366] font-medium rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
    >
      Previous
    </button>

    {step < maxStep && (
      <button
        onClick={onNext}
        disabled={loading}
        className="px-6 py-2 bg-[#0077cc] text-white font-medium rounded-full hover:bg-[#005fa3] disabled:opacity-50 transition"
      >
        Next
      </button>
    )}
  </div>
);

const SuccessMessage = ({ onDownload }: { onDownload: () => void }) => (
  <div className="text-center p-6">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h2 className="text-xl font-bold text-green-600 mb-2">Thank you!</h2>
      <p className="text-gray-700 mb-4">Your responses have been submitted successfully.</p>
      <button
        onClick={onDownload}
        className="px-6 py-3 mt-6 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white font-semibold rounded-full hover:opacity-90 transition"
      >
        Download My Reponse
      </button>
      <p className="text-xs text-gray-400 mt-2">You will be redirected automatically in 5 seconds after download.</p>
    </motion.div>
  </div>
);

export default function AIreadinessAssessment() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const currentSection = sections[step] || {};
  const questionIndexOffset = sections.slice(0, step).reduce((acc, sec) => acc + sec.questions.length, 0);
  const progressPercentage = ((step + 1) / (sections.length + 2)) * 100;

  const isStepValid = (): boolean => {
    return currentSection.questions.every((_, i) => responses[`q${questionIndexOffset + i + 1}`]);
  };

  const handleResponse = (key: string, value: any) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const navigateSteps = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (step < sections.length) {
        if (!isStepValid()) {
          alert('Please answer all questions before proceeding.');
          return;
        }
        setStep(prev => prev + 1);
      } else if (step === sections.length) {
        const selectedUsecases = responses.usecases || [];
        if (selectedUsecases.length === 0) {
          alert('Please select at least one AI Use Case to proceed.');
          return;
        }
        setStep(prev => prev + 1);
      }
    } else {
      setStep(prev => Math.max(prev - 1, 0));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['full name', 'organization', 'role', 'email', 'phone number'];
    const missingFields = requiredFields.filter(field => !responses[field]);

    if (missingFields.length) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(responses).forEach(([key, value]) => {
        const formattedValue = Array.isArray(value) ? value.join(', ') : value.toString();
        form.append(key, formattedValue);
      });

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: form
      });

      if (res.ok) {
        setShowForm(false);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const downloadPDF = async () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    const logo = await fetch('https://crispai.crispvision.org/media/crisp-logo.png')
      .then(res => res.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));

    doc.addImage(logo, 'PNG', 80, 10, 50, 20);

    let y = 35;

    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text("AI Readiness Assessment Summary", 105, y, { align: 'center' });

    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${date}`, 20, y);
    y += 6;
    doc.text(`Full Name: ${responses['full name'] || '-'}`, 20, y);
    y += 6;
    doc.text(`Organization: ${responses['organization'] || '-'}`, 20, y);
    y += 6;
    doc.text(`Role: ${responses['role'] || '-'}`, 20, y);
    y += 6;
    doc.text(`Email: ${responses['email'] || '-'}`, 20, y);
    y += 6;
    doc.text(`Phone: ${responses['phone number'] || '-'}`, 20, y);

    y += 10;

    if (responses.usecases && responses.usecases.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 119, 204);
      doc.text("Selected Use Cases:", 20, y);
      y += 8;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      responses.usecases.forEach((usecase: string) => {
        doc.text(`• ${usecase}`, 25, y);
        y += 6;
      });
      y += 10;
    }

    sections.forEach((section: any, secIndex: number) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 119, 204);

      if (y > 270) {  // ✅ If too low, add new page
        doc.addPage();
        y = 20;
      }
      doc.text(`${secIndex + 1}. ${section.title}`, 20, y);
      y += 8;

      section.questions?.forEach((question: string, qIndex: number) => {
        const absoluteQIndex = sections.slice(0, secIndex).reduce((acc: number, sec: any) => acc + (sec.questions?.length || 0), 0) + qIndex + 1;
        const scaleValue = responses[`q${absoluteQIndex}`] || '-';
        const mappedText = mapResponse(scaleValue.toString());

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        if (y > 270) {  // ✅ Check after every question/answer
          doc.addPage();
          y = 20;
        }
        doc.text(`Q${absoluteQIndex}: ${question}`, 20, y);
        y += 6;
        doc.text(`Scale: ${scaleValue} — ${mappedText}`, 30, y);
        y += 10;
      });

      y += 5;
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generated by CrispAI — Empowering AI Readiness", 105, 290, { align: 'center' });

    doc.save('AI_Readiness_Assessment_Report.pdf');

    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
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
          <img 
            src="/media/crispai_logo.png" 
            alt="CrispAI Logo" 
            className="h-16 w-45 mb-2" 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-extrabold text-[#003366] leading-tight">AI Readiness</h1>
          <h2 className="text-lg font-semibold text-[#003366]">Assessment</h2>
        </div>

        {showForm ? (
          <>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
              <motion.div
                className="h-2 rounded-full bg-[#90D5FF]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
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
                          {[1, 2, 3, 4, 5].map(value => (
                            <RatingButton
                              key={value}
                              value={value}
                              isActive={responses[`q${questionIndexOffset + index + 1}`] === value}
                              onChange={() => handleResponse(`q${questionIndexOffset + index + 1}`, value)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : step === sections.length ? (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold mb-4">Select Your Primary AI Use Cases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {useCases.map(usecase => (
                        <UseCaseOption
                          key={usecase}
                          usecase={usecase}
                          selected={(responses.usecases || []).includes(usecase)}
                          onChange={(checked) => {
                            setResponses(prev => {
                              const prevUsecases = prev.usecases || [];
                              return {
                                ...prev,
                                usecases: checked
                                  ? [...prevUsecases, usecase]
                                  : prevUsecases.filter(u => u !== usecase)
                              };
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">You're almost done!</h2>
                    <p className="text-gray-700 text-sm">
                      Please confirm your contact details.
                    </p>

                    {['full name', 'email', 'phone number', 'organization', 'role'].map(field => (
                      <input
                        key={field}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0077cc] focus:border-transparent"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={e => handleResponse(field, e.target.value)}
                      />
                    ))}

                    <SubmitButton 
                      loading={loading} 
                      onClick={handleSubmit}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <NavigationButtons 
              step={step}
              maxStep={sections.length + 1}
              onPrev={() => navigateSteps('prev')}
              onNext={() => navigateSteps('next')}
              loading={loading}
            />
          </>
        ) : (
          <SuccessMessage onDownload={downloadPDF} />
        )}
      </motion.div>
    </div>
  );
}