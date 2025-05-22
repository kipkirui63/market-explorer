import React from 'react';
import { Link } from "wouter";
import { ShoppingCart, Users, Server } from "lucide-react";
import SPALayout from '@/components/SPALayout';
import WaveBackground from "@/components/WaveBackground";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceDetail from "@/components/ServiceDetail";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

import OurValues from "@/components/OurValues";

export default function HomeSPA() {
  const testimonials = [
    {
      quote: "Crisp AI transformed the way we operate. Their custom AI chatbot cut our customer response time by 40%, and the team made the entire process seamless.",
      author: "Sarah L.",
      title: "Retail Business Owner"
    },
    {
      quote: "Thanks to Crisp AI's data analytics solutions, we uncovered new opportunities that increased our revenue by 25% in six months.",
      author: "John M.",
      title: "Manufacturing Manager"
    },
    {
      quote: "The AI-powered recruitment assistant from Crisp AI has revolutionized our hiring process. We're finding better candidates in half the time.",
      author: "Jennifer K.",
      title: "HR Director"
    }
  ];

  // Featured services
  const featuredServices = [
    {
      icon: ShoppingCart,
      title: 'AI for Sales',
      description: 'Transform your sales process with AI-powered insights and automation.',
      benefits: [
        'Reduce sales cycle by up to 40%',
        'Increase conversion rates by 35%'
      ],
      useCases: [
        'AI-powered sales forecasting',
        'Intelligent lead prioritization'
      ]
    },
    {
      icon: Users,
      title: 'AI for Marketing',
      description: 'Revolutionize your marketing strategies with AI-driven insights.',
      benefits: [
        'Increase marketing ROI by 30%',
        'Personalize customer experiences'
      ],
      useCases: [
        'Dynamic content personalization',
        'Predictive audience targeting'
      ]
    },
    {
      icon: Server,
      title: 'AI for IT',
      description: 'Modernize your IT infrastructure with AI capabilities.',
      benefits: [
        'Reduce downtime by 70%',
        'Enhance security'
      ],
      useCases: [
        'Predictive system maintenance',
        'Automated security response'
      ]
    }
  ];

  return (
    <SPALayout>
      {/* Hero Section */}
      <section id="home" className="relative pt-16 pb-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.9)'
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <img 
              src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/brain.svg" 
              alt="Crisp AI Logo" 
              className="w-20 h-20 text-blue-500 filter"
              style={{filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'}}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Crisp AI</h1>
          <p className="text-blue-200 text-xl mb-8">Artificial Intelligence</p>
          
          <div className="w-full h-2 bg-blue-500 mb-12"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-white text-lg mb-8 leading-relaxed">
              No longer just a futuristic concept—AI is here to revolutionize your business. Whether
              you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the
              true potential of Artificial Intelligence.
            </p>
            
            <p className="text-white text-lg mb-12">
              AI isn't one-size-fits-all, and neither are we.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                Get Started with Crisp AI Today!
              </a>
              <Link href="/assessment" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                Multi-Agent Resume Analyzer
              </Link>
              <Link href="/marketplace" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                AI Recruitment Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary-900">Your AI Partners in Innovation</h2>
              <p className="text-primary-800 mb-8 text-lg">
                Crisp AI is more than just a consultancy—we're your trusted partner in transforming your business with cutting-edge AI solutions. From automating tedious processes to creating intelligent chatbots and leveraging advanced AI models, our mission is simple: make your business smarter, faster, and more innovative.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
                alt="AI Innovation"
                className="rounded-2xl shadow-lg relative transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <OurValues />

      {/* Services Section */}
      <section id="services" className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">AI Solutions for Every Industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceDetail key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
              View all solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-primary-900">Ready to Make Your Business Smarter?</h2>
          <p className="text-center text-primary-700 mb-12 max-w-2xl mx-auto">
            Let's talk about how AI can work for you. Fill out the form below, and one of our AI consultants will get back to you within 24 hours.
          </p>
          
          <ContactForm />
        </div>
      </section>
    </SPALayout>
  );
}