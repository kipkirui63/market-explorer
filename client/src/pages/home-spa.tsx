import React from 'react';
import { Link } from "wouter";
import { ShoppingCart, Users, Server, MessageCircle, Sparkles, Phone, Mail } from "lucide-react";
import SPALayout from '@/components/SPALayout';
import WaveBackground from "@/components/WaveBackground";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceDetail from "@/components/ServiceDetail";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import ServiceCarousel from "@/components/ServiceCarousel";

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
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/95 to-purple-50/95"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/brain.svg" 
                alt="Crisp AI Logo" 
                className="w-20 h-20 mr-6"
                style={{filter: 'invert(30%) sepia(37%) saturate(2053%) hue-rotate(228deg) brightness(86%) contrast(92%)'}}
              />
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary bg-clip-text text-transparent">Crisp AI</h1>
                <p className="text-secondary text-xl">Artificial Intelligence</p>
              </div>
            </div>
          </div>
          
          <div className="w-full h-2 bg-gradient-to-r from-primary to-secondary mb-12"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-primary-900 text-lg mb-8 leading-relaxed">
              No longer just a futuristic concept—AI is here to revolutionize your business. Whether
              you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the
              true potential of Artificial Intelligence.
            </p>
            
            <p className="text-primary-900 text-lg mb-12">
              AI isn't one-size-fits-all, and neither are we.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="#contact" className="bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg">
                Get Started with Crisp AI Today!
              </a>
              <Link href="/assessment" className="bg-secondary hover:opacity-90 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg">
                Multi-Agent Resume Analyzer
              </Link>
              <Link href="/marketplace" className="bg-accent hover:opacity-90 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg">
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
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your AI Partners in Innovation</h2>
              <p className="text-gray-700 mb-8 text-lg">
                Crisp AI is more than just a consultancy—we're your trusted partner in transforming your business with cutting-edge AI solutions. From automating tedious processes to creating intelligent chatbots and leveraging Microsoft Copilot, our mission is simple: make your business smarter, faster, and more innovative.
              </p>
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-custom border border-primary/10">
                <Sparkles className="h-8 w-8 text-secondary" />
                <span className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Smarter Solutions, Faster Results</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-custom opacity-10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
                alt="AI Innovation"
                className="rounded-2xl shadow-custom relative transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <OurValues />

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Solutions for Every Industry</h2>
          
          <ServiceCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-custom border border-primary/10">
              <div className="text-5xl text-secondary mb-4">❝</div>
              <p className="text-gray-700 mb-6">
                Crisp AI transformed the way we operate. Their custom AI chatbot cut our customer response time by 40%, and the team made the entire process seamless.
              </p>
              <div>
                <p className="font-semibold text-primary-700">Sarah L.</p>
                <p className="text-secondary">Retail Business Owner</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-custom border border-primary/10">
              <div className="text-5xl text-secondary mb-4">❝</div>
              <p className="text-gray-700 mb-6">
                Thanks to Crisp AI's data analytics solutions, we uncovered new opportunities that increased our revenue by 25% in six months.
              </p>
              <div>
                <p className="font-semibold text-primary-700">John M.</p>
                <p className="text-secondary">Manufacturing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contact Us</h2>
          
          <div className="flex flex-col items-center mb-16">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Have questions about our AI solutions?</h3>
            <p className="text-gray-600 mb-10 text-center max-w-3xl">
              Ready to start your AI journey? Our team of expert consultants is here to help you navigate the exciting world of AI implementation.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-gray-700">+1 (343) 580-1393</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-gray-700">ai@crispvision.org</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 p-8 rounded-lg shadow-custom border border-primary/10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 text-center">Let's Unlock Your Business Potential with AI!</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      

    </SPALayout>
  );
}