import { Link } from "wouter";
import { Settings, Users, Server, Briefcase, Beaker, Heart, ShoppingCart, GraduationCap, Building } from "lucide-react";
import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";
import TestimonialCard from "@/components/TestimonialCard";
import SolutionCard from "@/components/SolutionCard";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

export default function Home() {
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
    }
  ];

  

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

    
          
         
          
         

      {/* Testimonials Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Readiness Assessment Section */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Ready to Make Your Business Smarter?</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Let's talk about how AI can work for you. Fill out the form below, and one of our AI consultants will get back to you within 24 hours.
          </p>
          
          <ContactForm />
        </div>
      </section>


    </Layout>
  );
}
