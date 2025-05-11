import { motion } from "framer-motion";
import WaveBackground from "@/components/ui/WaveBackground";

export default function About() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">About CrispAI</h1>
            <p className="text-lg mb-8 text-gray-700">
              We're on a mission to make AI accessible, practical, and transformative for businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2023, CrispAI emerged from a simple observation: while AI technology was advancing rapidly, many businesses struggled to implement it effectively. Our founders, a team of AI experts and business consultants, set out to bridge this gap.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that AI should be a powerful tool that any business can use, regardless of their technical expertise. That's why we focus on creating solutions that are not only cutting-edge but also practical and easy to integrate.
            </p>
            <p className="text-gray-700">
              Today, we work with companies across various industries, helping them harness the power of AI to solve real business problems, drive growth, and create exceptional experiences for their customers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F4FAFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Our Approach</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-[#0077cc]">1. Understand</h3>
              <p className="text-gray-700">
                We start by deeply understanding your business, goals, and challenges. This helps us identify where AI can make the biggest impact.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-[#0077cc]">2. Design</h3>
              <p className="text-gray-700">
                We design customized AI solutions that address your specific needs and integrate seamlessly with your existing systems and workflows.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-[#0077cc]">3. Implement</h3>
              <p className="text-gray-700">
                Our team of experts handles the implementation process, ensuring a smooth transition and minimal disruption to your operations.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0077cc]">4. Optimize</h3>
              <p className="text-gray-700">
                We continuously monitor and refine our solutions to ensure they deliver the best possible results and adapt to your evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our team brings together experts from diverse backgrounds including artificial intelligence, machine learning, data science, software engineering, and business strategy.
            </p>
            <p className="text-gray-700 mb-6">
              What unites us is a passion for using technology to solve complex problems and a commitment to delivering exceptional results for our clients.
            </p>
            <p className="text-gray-700">
              We're constantly learning, experimenting, and pushing the boundaries of what's possible with AI, so we can bring the most innovative and effective solutions to your business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
