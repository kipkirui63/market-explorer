import { motion } from "framer-motion";
import WaveBackground from "@/components/ui/WaveBackground";
import SolutionCard from "@/components/ui/SolutionCard";

export default function Services() {
  const solutions = [
    {
      title: "AI for Operations",
      description: "Optimize your operations with AI-powered automation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      benefits: [
        "Reduce operational costs by 25%",
        "Improve efficiency by 40%",
        "Minimize human error",
        "Real-time process optimization"
      ],
      useCases: [
        "Predictive maintenance",
        "Supply chain optimization",
        "Quality control automation",
        "Resource allocation"
      ]
    },
    {
      title: "AI for HR",
      description: "Transform your HR processes with AI-powered solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      benefits: [
        "Reduce hiring time by 50%",
        "Improve candidate selection",
        "Automate routine tasks",
        "Enhance employee experience"
      ],
      useCases: [
        "AI-powered recruitment",
        "Employee sentiment analysis",
        "Performance prediction",
        "Training recommendations"
      ]
    },
    {
      title: "AI for IT",
      description: "Modernize your IT infrastructure with AI capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      benefits: [
        "Reduce downtime by 70%",
        "Automate routine maintenance",
        "Enhance security",
        "Optimize resource usage"
      ],
      useCases: [
        "Predictive system maintenance",
        "Automated security response",
        "Resource optimization",
        "Intelligent monitoring"
      ]
    },
    {
      title: "AI for Nonprofits",
      description: "Maximize social impact with AI-driven solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      benefits: [
        "Increase donor engagement",
        "Optimize resource allocation",
        "Improve program effectiveness",
        "Enhanced reporting capabilities"
      ],
      useCases: [
        "Donor behavior analysis",
        "Program impact assessment",
        "Resource optimization",
        "Automated reporting"
      ]
    },
    {
      title: "AI for Manufacturing",
      description: "Revolutionize manufacturing with AI-powered solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      benefits: [
        "Reduce waste by 30%",
        "Improve quality control",
        "Optimize production schedules",
        "Predict equipment maintenance"
      ],
      useCases: [
        "Predictive maintenance",
        "Quality assurance automation",
        "Production optimization",
        "Supply chain management"
      ]
    },
    {
      title: "AI for Healthcare",
      description: "Transform patient care with AI-powered healthcare solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      benefits: [
        "Improve diagnosis accuracy",
        "Reduce administrative burden",
        "Enhance patient monitoring",
        "Optimize resource allocation"
      ],
      useCases: [
        "Disease prediction",
        "Patient monitoring",
        "Treatment optimization",
        "Administrative automation"
      ]
    },
    {
      title: "AI for Retail",
      description: "Enhance retail operations with AI-powered insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      benefits: [
        "Increase sales by 25%",
        "Optimize inventory management",
        "Enhance customer experience",
        "Reduce operational costs"
      ],
      useCases: [
        "Demand forecasting",
        "Personalized recommendations",
        "Inventory optimization",
        "Customer behavior analysis"
      ]
    },
    {
      title: "AI for Education",
      description: "Transform learning with AI-powered educational solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      benefits: [
        "Personalize learning paths",
        "Improve student engagement",
        "Reduce administrative work",
        "Track progress effectively"
      ],
      useCases: [
        "Adaptive learning systems",
        "Student performance prediction",
        "Automated grading",
        "Content recommendations"
      ]
    },
    {
      title: "AI for Government",
      description: "Modernize public services with AI solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      benefits: [
        "Improve service delivery",
        "Reduce processing time",
        "Enhance decision-making",
        "Optimize resource allocation"
      ],
      useCases: [
        "Smart city management",
        "Public service automation",
        "Policy impact analysis",
        "Resource optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F4FAFF]">
      <section className="relative overflow-hidden py-16">
        <WaveBackground position="bottom" />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">Our Services</h1>
            <p className="text-lg mb-8 text-gray-700">
              We offer a comprehensive range of AI solutions designed to help your business thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI Solutions for Every Industry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SolutionCard
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  benefits={solution.benefits}
                  useCases={solution.useCases}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F4FAFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Customized AI Solutions</h2>
            <p className="text-lg text-gray-700 mb-8">
              Don't see exactly what you need? We also offer custom AI solutions tailored to your unique business challenges.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
            >
              Contact Us for Custom Solutions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
