import { motion } from "framer-motion";
import { Cog, UserCircle, Server } from 'lucide-react';
import ServiceDetail from '@/components/ServiceDetail';

export default function IndustrySolutions() {
  const solutions = [
    {
      icon: Cog,
      title: "AI for Operations",
      description: "Optimize your operations with AI-powered automation.",
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
      icon: UserCircle,
      title: "AI for HR",
      description: "Transform your HR processes with AI-powered solutions.",
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
      icon: Server,
      title: "AI for IT",
      description: "Modernize your IT infrastructure with AI capabilities.",
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
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">AI Solutions for Every Industry</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceDetail
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                benefits={solution.benefits}
                useCases={solution.useCases}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
