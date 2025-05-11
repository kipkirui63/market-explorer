import Layout from "@/components/Layout";
import WaveBackground from "@/components/WaveBackground";
import { Award, BookOpen, Users, Code, Clock, ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-background-light">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark">About CrispAI</h1>
            <p className="text-lg mb-8 text-gray-700">
              We're on a mission to make AI technology accessible, understandable, and practical 
              for businesses of all sizes. Our team of experts helps organizations leverage the 
              power of artificial intelligence to solve real-world problems.
            </p>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-700">
              <p>
                Founded in 2022, CrispAI emerged from a simple observation: while artificial intelligence was 
                rapidly transforming industries, many businesses struggled to implement AI effectively. The 
                technical complexities, resource requirements, and integration challenges created barriers that 
                prevented organizations from realizing AI's full potential.
              </p>
              <p>
                Our founders, with backgrounds spanning machine learning, software engineering, and business 
                strategy, came together with a shared vision: to bridge the gap between cutting-edge AI research 
                and practical business applications. We set out to create a company that would not only provide 
                powerful AI solutions but also guide businesses through the entire implementation journey.
              </p>
              <p>
                Today, CrispAI serves clients across industries, from startups to Fortune 500 companies. 
                Our approach combines deep technical expertise with business acumen, ensuring that our AI 
                solutions deliver measurable value and integrate seamlessly with existing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="text-primary-light mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-700">
                We are committed to delivering the highest quality solutions. We stay at the forefront 
                of AI research and development, continuously refining our approaches to provide 
                cutting-edge technology that works.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="text-primary-light mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-700">
                We believe in clear communication and demystifying AI. We explain our solutions in 
                understandable terms, set realistic expectations, and maintain open dialogue throughout 
                the entire project lifecycle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="text-primary-light mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partnership</h3>
              <p className="text-gray-700">
                We view ourselves as long-term partners rather than vendors. We take the time to understand 
                your business challenges, goals, and culture to develop solutions that align with your vision 
                and grow with your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 h-48 w-48 mx-auto rounded-full mb-4"></div>
                <h3 className="text-xl font-bold">Leadership Name</h3>
                <p className="text-primary-light font-medium">Position Title</p>
                <p className="text-gray-600 mt-2">
                  Brief bio highlighting expertise and background in AI and business.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose CrispAI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Code className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Technical Expertise</h3>
              <p className="text-gray-700">
                Our team includes PhDs in machine learning, experienced data scientists, and 
                software engineers who have developed AI solutions for diverse industries.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Clock className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Rapid Implementation</h3>
              <p className="text-gray-700">
                We've developed frameworks and methodologies that accelerate AI adoption, 
                allowing you to see results and ROI faster.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <ArrowUpRight className="h-12 w-12 text-primary-light mb-4" />
              <h3 className="text-xl font-bold mb-2">Measurable Results</h3>
              <p className="text-gray-700">
                We focus on solutions that deliver tangible business value. Our implementations 
                have helped clients reduce costs by up to 40% and increase revenue by up to 25%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-background-light relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Let's discuss how AI can transform your business. Schedule a free consultation 
              with our experts to explore possibilities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:opacity-90 transition shadow-md">
                Schedule a Consultation
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition">
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
        <WaveBackground />
      </section>
    </Layout>
  );
}
