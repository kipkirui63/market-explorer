import React from 'react';
import { Award, BookOpen, Users } from 'lucide-react';

interface ValueProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Value = ({ icon: Icon, title, description }: ValueProps) => {
  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-custom hover:shadow-lg transition-all duration-300 border border-blue-100">
      <div className="mb-4" style={{ color: '#0078D4' }}>
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-blue-900">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  );
};

export default function OurValues() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering the highest quality solutions. We stay at the forefront of AI research and development, continuously refining our approaches to provide cutting-edge technology that works."
    },
    {
      icon: BookOpen,
      title: "Transparency",
      description: "We believe in clear communication and demystifying AI. We explain our solutions in understandable terms, set realistic expectations, and maintain open dialogue throughout the entire project lifecycle."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We view ourselves as long-term partners rather than vendors. We take the time to understand your business challenges, goals, and culture to develop solutions that align with your vision and grow with your organization."
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0078D4' }}>Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Value key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}