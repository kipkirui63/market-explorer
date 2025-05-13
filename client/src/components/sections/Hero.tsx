import { motion } from "framer-motion";
import { Link } from "wouter";
import WaveBackground from "@/components/ui/WaveBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-[#F4FAFF]">
      <WaveBackground position="bottom" />
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">AI Solutions for Every Industry</h1>
          <p className="text-lg mb-8 text-gray-700">Unlock your business potential with our cutting-edge AI solutions tailored to your specific needs.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services" className="px-6 py-3 bg-gradient-to-r from-[#0077cc] to-[#0099ff] text-white rounded-lg font-medium hover:opacity-90 transition shadow-md">
              Explore Solutions
            </Link>
            <Link href="/assessment" className="px-6 py-3 border border-[#0077cc] text-[#0077cc] rounded-lg font-medium hover:bg-[#0077cc] hover:text-white transition">
              Take AI Readiness Assessment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
