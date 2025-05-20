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


    </Layout>
  );
}
