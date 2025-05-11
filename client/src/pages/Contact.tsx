import { motion } from "framer-motion";
import WaveBackground from "@/components/ui/WaveBackground";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F4FAFF]">
      <section className="relative overflow-hidden py-16">
        <WaveBackground position="bottom" />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">Contact Us</h1>
            <p className="text-lg mb-8 text-gray-700">
              We'd love to hear from you. Get in touch with our team to discuss how AI can transform your business.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#003366]">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Ready to explore how AI can transform your business? Our team of experts is here to help. Fill out the form, and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-[#0099ff] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">+1 (343) 580-1393</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#0099ff] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">ai@crispvision.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#0099ff] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-700">
                      123 Innovation Drive<br />
                      Suite 301<br />
                      Ottawa, ON K1A 0B1
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F4FAFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Not Ready to Reach Out Yet?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Take our AI Readiness Assessment to see how prepared your organization is to implement AI solutions.
            </p>
            <a 
              href="/assessment" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
            >
              Take AI Readiness Assessment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
