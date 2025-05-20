import { Link } from "wouter";
import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";
import SolutionCard from "@/components/SolutionCard";
import { ShoppingCart, Users, Server, Heart, BarChart3, Headphones, ShoppingBag, Building, GraduationCap, Beaker } from "lucide-react";

export default function Services() {
  const solutions = [
    {
      title: "AI for Sales",
      description: "Transform your sales process with AI-powered insights and automation.",
      icon: <ShoppingBag className="h-8 w-8" />,
      benefits: [
        "Reduce sales cycle by up to 40%",
        "Increase conversion rate by 35%",
        "Automate lead qualification and scoring",
        "Predict customer lifetime value"
      ],
      useCases: [
        "AI-powered sales forecasting",
        "Intelligent lead prioritization",
        "Automated follow-up sequences",
        "Smart deal insights and recommendations"
      ]
    },
    {
      title: "AI for Marketing",
      description: "Revolutionize your marketing strategies with AI-driven insights.",
      icon: <BarChart3 className="h-8 w-8" />,
      benefits: [
        "Increase marketing ROI by 30%",
        "Personalize customer experiences",
        "Optimize campaign performance",
        "Predict market trends"
      ],
      useCases: [
        "Dynamic content personalization",
        "Predictive audience targeting",
        "AI-powered A/B testing",
        "Automated social media optimization"
      ]
    },
    {
      title: "AI for Customer Support",
      description: "Deliver exceptional customer service with AI assistance.",
      icon: <Headphones className="h-8 w-8" />,
      benefits: [
        "Reduce response time by 60%",
        "Available 24/7/365",
        "Handle multiple queries simultaneously",
        "Improve customer satisfaction"
      ],
      useCases: [
        "Intelligent chatbots",
        "Automated ticket routing",
        "Sentiment analysis",
        "Predictive customer needs"
      ]
    },
    {
      title: "AI for Operations",
      description: "Optimize your operations with AI-powered automation.",
      icon: <Server className="h-8 w-8" />,
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
      icon: <Users className="h-8 w-8" />,
      benefits: [
        "Reduce hiring time by 50%",
        "Improve candidate quality",
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
      icon: <Server className="h-8 w-8" />,
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
      icon: <Heart className="h-8 w-8" />,
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
      icon: <Beaker className="h-8 w-8" />,
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
      icon: <Heart className="h-8 w-8" />,
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
      icon: <ShoppingCart className="h-8 w-8" />,
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
      icon: <GraduationCap className="h-8 w-8" />,
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
      icon: <Building className="h-8 w-8" />,
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">AI Solutions for Every Industry</h2>
            <p className="text-lg text-gray-700">
              Our AI solutions are designed to meet the unique needs of various industries, 
              providing tailored approaches to maximize impact and value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}