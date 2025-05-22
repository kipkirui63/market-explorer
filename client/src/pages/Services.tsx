import React from 'react';
import { 
  ShoppingCart, Users, Headphones, Cog, UserCircle, 
  Server, Heart, Factory, Stethoscope, Building2, GraduationCap, Landmark 
} from 'lucide-react';
import ServiceDetail from '@/components/ServiceDetail';
import Layout from '@/components/Layout';

const services = [
  {
    icon: ShoppingCart,
    title: 'AI for Sales',
    description: 'Transform your sales process with AI-powered insights and automation.',
    benefits: [
      'Reduce sales cycle by up to 40%',
      'Increase conversion rates by 35%',
      'Automate lead qualification and scoring',
      'Predict customer lifetime value'
    ],
    useCases: [
      'AI-powered sales forecasting',
      'Intelligent lead prioritization',
      'Automated follow-up sequences',
      'Smart deal insights and recommendations'
    ]
  },
  {
    icon: Users,
    title: 'AI for Marketing',
    description: 'Revolutionize your marketing strategies with AI-driven insights.',
    benefits: [
      'Increase marketing ROI by 30%',
      'Personalize customer experiences',
      'Optimize campaign performance',
      'Predict market trends'
    ],
    useCases: [
      'Dynamic content personalization',
      'Predictive audience targeting',
      'AI-powered A/B testing',
      'Automated social media optimization'
    ]
  },
  {
    icon: Headphones,
    title: 'AI for Customer Support',
    description: 'Deliver exceptional customer service with AI assistance.',
    benefits: [
      'Reduce response time by 60%',
      'Available 24/7/365',
      'Handle multiple queries simultaneously',
      'Improve customer satisfaction'
    ],
    useCases: [
      'Intelligent chatbots',
      'Automated ticket routing',
      'Sentiment analysis',
      'Predictive customer needs'
    ]
  },
  {
    icon: Cog,
    title: 'AI for Operations',
    description: 'Optimize your operations with AI-powered automation.',
    benefits: [
      'Reduce operational costs by 25%',
      'Improve efficiency by 40%',
      'Minimize human error',
      'Real-time process optimization'
    ],
    useCases: [
      'Predictive maintenance',
      'Supply chain optimization',
      'Quality control automation',
      'Resource allocation'
    ]
  },
  {
    icon: UserCircle,
    title: 'AI for HR',
    description: 'Transform your HR processes with AI-powered solutions.',
    benefits: [
      'Reduce hiring time by 50%',
      'Improve candidate quality',
      'Automate routine tasks',
      'Enhance employee experience'
    ],
    useCases: [
      'AI-powered recruitment',
      'Employee sentiment analysis',
      'Performance prediction',
      'Training recommendations'
    ]
  },
  {
    icon: Server,
    title: 'AI for IT',
    description: 'Modernize your IT infrastructure with AI capabilities.',
    benefits: [
      'Reduce downtime by 70%',
      'Automate routine maintenance',
      'Enhance security',
      'Optimize resource usage'
    ],
    useCases: [
      'Predictive system maintenance',
      'Automated security response',
      'Resource optimization',
      'Intelligent monitoring'
    ]
  },
  {
    icon: Heart,
    title: 'AI for Nonprofits',
    description: 'Maximize social impact with AI-driven solutions.',
    benefits: [
      'Increase donor engagement',
      'Optimize resource allocation',
      'Improve program effectiveness',
      'Enhanced reporting capabilities'
    ],
    useCases: [
      'Donor behavior analysis',
      'Program impact assessment',
      'Resource optimization',
      'Automated reporting'
    ]
  },
  {
    icon: Factory,
    title: 'AI for Manufacturing',
    description: 'Revolutionize manufacturing with AI-powered solutions.',
    benefits: [
      'Reduce waste by 30%',
      'Improve quality control',
      'Optimize production schedules',
      'Predict equipment maintenance'
    ],
    useCases: [
      'Predictive maintenance',
      'Quality assurance automation',
      'Production optimization',
      'Supply chain management'
    ]
  },
  {
    icon: Stethoscope,
    title: 'AI for Healthcare',
    description: 'Transform patient care with AI-powered healthcare solutions.',
    benefits: [
      'Improve diagnosis accuracy',
      'Reduce administrative burden',
      'Enhance patient monitoring',
      'Optimize resource allocation'
    ],
    useCases: [
      'Disease prediction',
      'Patient monitoring',
      'Treatment optimization',
      'Administrative automation'
    ]
  },
  {
    icon: Building2,
    title: 'AI for Retail',
    description: 'Enhance retail operations with AI-powered insights.',
    benefits: [
      'Increase sales by 25%',
      'Optimize inventory management',
      'Enhance customer experience',
      'Reduce operational costs'
    ],
    useCases: [
      'Demand forecasting',
      'Personalized recommendations',
      'Inventory optimization',
      'Customer behavior analysis'
    ]
  },
  {
    icon: GraduationCap,
    title: 'AI for Education',
    description: 'Transform learning with AI-powered educational solutions.',
    benefits: [
      'Personalize learning paths',
      'Improve student engagement',
      'Reduce administrative work',
      'Track progress effectively'
    ],
    useCases: [
      'Adaptive learning systems',
      'Student performance prediction',
      'Automated grading',
      'Content recommendations'
    ]
  },
  {
    icon: Landmark,
    title: 'AI for Government',
    description: 'Modernize public services with AI solutions.',
    benefits: [
      'Improve service delivery',
      'Reduce processing time',
      'Enhance decision-making',
      'Optimize resource allocation'
    ],
    useCases: [
      'Smart city management',
      'Public service automation',
      'Policy impact analysis',
      'Resource optimization'
    ]
  }
];

export default function Services() {
  // Show only the first 3 services to match the layout in the image
  const topServices = services.slice(0, 3);
  
  return (
    <Layout>
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">AI Solutions for Every Industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topServices.map((service, index) => (
              <ServiceDetail key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}