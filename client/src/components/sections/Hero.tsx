import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 bg-[#f0f5fa]">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A3E65] mb-4">
              Your AI Partners in Innovation
            </h1>
            
            <p className="text-[#0A3E65] mb-6">
              Crisp AI is more than just a consultancy—we're your trusted partner in
              transforming your business with cutting-edge AI solutions. From
              automating tedious processes to creating intelligent chatbots and
              leveraging Microsoft Copilot, our mission is simple: make your business
              smarter, faster, and more innovative.
            </p>
            
            <div className="bg-white rounded-full inline-flex items-center shadow-sm px-6 py-3 mb-4 border border-gray-100">
              <svg className="w-5 h-5 mr-2 text-[#0099ff]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="text-[#0099ff] font-medium">Smarter Solutions, Faster Results</span>
            </div>
          </motion.div>
          
          {/* Right content - Robot Hand Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden bg-white shadow-sm p-1"
          >
            <img 
              src="https://img.freepik.com/premium-photo/ai-robotic-hand-background_31965-4846.jpg" 
              alt="AI Robotic Hand" 
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
