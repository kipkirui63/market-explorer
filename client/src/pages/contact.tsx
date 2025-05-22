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


    </Layout>
  );
}
