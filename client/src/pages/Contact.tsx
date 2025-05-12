import React from 'react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

export default function Contact() {
  return (
    <Layout>
      <section className="py-24 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              Have questions about how AI can transform your business? We're here to help.
            </p>
          </div>
          
          <ContactInfo />
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}