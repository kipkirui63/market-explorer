import React, { useState, useCallback } from 'react';
import { ShoppingCart, Users, Server, MessageCircle } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

interface ServiceCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  benefits: string[];
  useCases: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, benefits, useCases }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow h-full">
      <div className="mb-4">
        <Icon className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600 mb-4">
        {description}
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-blue-800 mb-2">Key Benefits:</h4>
        <ul className="space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span> 
              <span className="text-blue-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-blue-800 mb-2">Use Cases:</h4>
        <ul className="space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span> 
              <span className="text-blue-600">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ServiceCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
      icon: MessageCircle,
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
      icon: Server,
      title: 'AI for IT Operations',
      description: 'Optimize your IT infrastructure with intelligent automation.',
      benefits: [
        'Reduce downtime by 70%',
        'Automate routine maintenance',
        'Enhance security posture',
        'Optimize resource allocation'
      ],
      useCases: [
        'Predictive maintenance',
        'Automated incident response',
        'Security threat detection',
        'Resource optimization'
      ]
    },
    {
      icon: Users,
      title: 'AI for Human Resources',
      description: 'Transform your HR processes with AI-powered solutions.',
      benefits: [
        'Reduce hiring time by 50%',
        'Improve candidate quality',
        'Enhance employee engagement',
        'Optimize workforce planning'
      ],
      useCases: [
        'Resume screening and ranking',
        'Automated interview scheduling',
        'Employee sentiment analysis',
        'Workforce analytics'
      ]
    }
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    
    onInit();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative">
      {/* Carousel navigation buttons */}
      <button 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'w-8 bg-blue-500' 
                  : 'w-2 bg-gray-300'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;