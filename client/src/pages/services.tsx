import React from 'react';
import { 
  Cog, UserCircle, Server, Heart, Factory, Stethoscope
} from 'lucide-react';
import SimpleServiceCard from '@/components/SimpleServiceCard';
import Layout from '@/components/Layout';
import WaveBackground from '@/components/WaveBackground';

export default function Services() {
  const services = [
    {
      icon: Cog,
      title: 'AI for Operations',
      description: 'Optimize your operations with AI-powered automation.'
    },
    {
      icon: UserCircle,
      title: 'AI for HR',
      description: 'Transform your HR processes with AI-powered solutions.'
    },
    {
      icon: Server,
      title: 'AI for IT',
      description: 'Modernize your IT infrastructure with AI capabilities.'
    },
    {
      icon: Heart,
      title: 'AI for Nonprofits',
      description: 'Maximize social impact with AI-driven solutions.'
    },
    {
      icon: Factory,
      title: 'AI for Manufacturing',
      description: 'Revolutionize manufacturing with AI-powered solutions.'
    },
    {
      icon: Stethoscope,
      title: 'AI for Healthcare',
      description: 'Transform patient care with AI-powered healthcare solutions.'
    }
  ];

  return (
    <Layout>
      <div className="relative">
        <WaveBackground position="top" className="bg-white" />
        <section id="services" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">AI Solutions for Every Industry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100 rounded-xl overflow-hidden">
              {services.map((service, index) => (
                <div key={index} className={index % 3 !== 2 ? "border-r border-gray-100" : ""}>
                  <SimpleServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <WaveBackground />
      </div>
    </Layout>
  );
}