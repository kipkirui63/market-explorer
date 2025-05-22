import { useState } from "react";
import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-background-light">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark">Contact Us</h1>
            <p className="text-lg mb-8 text-gray-700">
              Have questions about our AI solutions? Ready to start your AI journey? 
              Our team of experts is here to help.
            </p>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-background-light rounded-lg p-6 text-center flex flex-col items-center">
              <div className="bg-primary-light text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-gray-700 mb-2">
                Speak directly with an AI consultant
              </p>
              <a href="tel:+13435801393" className="text-primary font-medium hover:underline">
                +1 (343) 580-1393
              </a>
            </div>
            
            <div className="bg-background-light rounded-lg p-6 text-center flex flex-col items-center">
              <div className="bg-primary-light text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-700 mb-2">
                Send us your inquiries anytime
              </p>
              <a href="mailto:ai@crispvision.org" className="text-primary font-medium hover:underline">
                ai@crispvision.org
              </a>
            </div>
            
            <div className="bg-background-light rounded-lg p-6 text-center flex flex-col items-center">
              <div className="bg-primary-light text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-gray-700 mb-2">
                Chat with our AI support assistant
              </p>
              <button className="text-primary font-medium hover:underline">
                Start Chat
              </button>
            </div>
          </div>
          

        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
            <p className="text-center text-gray-700 mb-12">
              Fill out the form below, and one of our AI consultants will get back to you within 24 hours.
            </p>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-background-light rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">What industries do you work with?</h3>
              <p className="text-gray-700">
                We work with clients across numerous industries including healthcare, retail, manufacturing, 
                education, government, and financial services. Our AI solutions are customizable to address 
                the unique challenges of each sector.
              </p>
            </div>
            
            <div className="bg-background-light rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">How long does it take to implement an AI solution?</h3>
              <p className="text-gray-700">
                Implementation timelines vary based on the complexity of the solution and your organization's 
                readiness. Simple integrations can take as little as 4-6 weeks, while more complex custom 
                solutions might require 3-6 months. We'll provide a detailed timeline during our consultation.
              </p>
            </div>
            
            <div className="bg-background-light rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Do I need technical expertise to work with you?</h3>
              <p className="text-gray-700">
                No technical expertise is required. We handle the technical aspects while keeping you involved 
                in the process with clear communication. Our solutions are designed to be user-friendly, and 
                we provide comprehensive training to your team.
              </p>
            </div>
            
            <div className="bg-background-light rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">What's your approach to data privacy and security?</h3>
              <p className="text-gray-700">
                We take data privacy and security extremely seriously. All our solutions adhere to industry 
                standards and regulations like GDPR and HIPAA where applicable. We implement robust security 
                measures and can work within your existing security frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
