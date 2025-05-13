import Hero from "@/components/sections/Hero";
import IndustrySolutions from "@/components/sections/IndustrySolutions";
import Testimonials from "@/components/sections/Testimonials";
// Temporarily remove marketplace teaser for now
// import MarketplaceTeaser from "@/components/sections/MarketplaceTeaser";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <IndustrySolutions />
      <Testimonials />
      
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Ready to Make Your Business Smarter?</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Let's talk about how AI can work for you. Fill out the form below, and one of our AI consultants will get back to you within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>
      
      {/* <MarketplaceTeaser /> */}
    </div>
  );
}
