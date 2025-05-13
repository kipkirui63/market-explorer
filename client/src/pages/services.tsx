import { Link } from "wouter";
import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";
import SolutionCard from "@/components/SolutionCard";
import { Settings, Users, Server, Briefcase, Beaker, Heart, ShoppingCart, GraduationCap, Building } from "lucide-react";

export default function Services() {
  const solutions = [
    {
      title: "AI for Operations",
      description: "Optimize your operations with AI-powered automation.",
      icon: <Settings className="h-10 w-10" />,
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
      icon: <Users className="h-10 w-10" />,
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
      icon: <Server className="h-10 w-10" />,
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
      icon: <Briefcase className="h-10 w-10" />,
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
      icon: <Beaker className="h-10 w-10" />,
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
      icon: <Heart className="h-10 w-10" />,
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
      icon: <ShoppingCart className="h-10 w-10" />,
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
      icon: <GraduationCap className="h-10 w-10" />,
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
      icon: <Building className="h-10 w-10" />,
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
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-background-light">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark">Our AI Services</h1>
            <p className="text-lg mb-8 text-gray-700">
              We provide end-to-end AI solutions designed to transform your operations, enhance 
              decision-making, and drive innovation across your organization.
            </p>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">How We Deliver AI Excellence</h2>
            <p className="text-gray-700 text-center">
              Our comprehensive approach ensures that your AI implementation is strategic, effective, 
              and delivers lasting value. We partner with you through every stage of the AI journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-background-light rounded-lg p-6 text-center">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategy & Assessment</h3>
              <p className="text-gray-700">
                We evaluate your readiness for AI, identify high-impact opportunities, and develop a 
                strategic roadmap tailored to your unique business objectives.
              </p>
            </div>
            
            <div className="bg-background-light rounded-lg p-6 text-center">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Solution Development</h3>
              <p className="text-gray-700">
                Our experts design and develop custom AI solutions that integrate seamlessly with your 
                existing systems, whether through algorithm development or platform integration.
              </p>
            </div>
            
            <div className="bg-background-light rounded-lg p-6 text-center">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Implementation & Growth</h3>
              <p className="text-gray-700">
                We deploy your solution, provide comprehensive training, and establish metrics to track 
                success. We then help you scale and optimize as your needs evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI Solutions for Every Industry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Start your AI journey today. Take our readiness assessment to discover where your organization 
              stands and how we can help you leverage AI for maximum impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/assessment" className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:opacity-90 transition shadow-md">
                Take AI Readiness Assessment
              </Link>
              <Link href="/contact" className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
