import { motion } from "framer-motion";
import WaveBackground from "@/components/WaveBackground";
import { useState, useEffect } from "react";

// External marketplace URL
const EXTERNAL_MARKETPLACE_URL = "https://96e9df22-27ec-4c16-abd0-10ac17f3d0b8-00-3kmky1mi4qc55.janeway.replit.dev/";

export default function Marketplace() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add event listener to handle iframe load event
    const handleIframeLoad = () => {
      setLoading(false);
    };

    const iframe = document.getElementById('marketplace-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F4FAFF]">
      <section className="relative overflow-hidden py-16">
        <WaveBackground position="bottom" />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">AI Marketplace</h1>
            <p className="text-lg mb-8 text-gray-700">
              Discover our curated collection of AI tools designed to transform how your business operates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          {/* Loading spinner */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077cc]"></div>
            </div>
          )}
          
          {/* Iframe container */}
          <div className={`w-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            <iframe
              id="marketplace-iframe"
              src={EXTERNAL_MARKETPLACE_URL}
              className="w-full min-h-[800px] border-0 rounded-lg shadow-sm"
              title="CrispAI Marketplace"
              allow="autoplay; camera; microphone; fullscreen; payment"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F4FAFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom AI Solution?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Don't see exactly what you need? Our team can build custom AI solutions tailored to your unique business requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="px-8 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
              >
                Contact for Custom Solutions
              </a>
              <a 
                href="/assessment" 
                className="px-8 py-3 border border-[#0077cc] text-[#0077cc] rounded-lg font-medium hover:bg-[#0077cc] hover:text-white transition"
              >
                Take AI Readiness Assessment
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
