import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Crisp AI transformed the way we operate. Their custom AI chatbot cut our customer response time by 40%, and the team made the entire process seamless.",
      author: "Sarah L.",
      title: "Retail Business Owner"
    },
    {
      quote: "Thanks to Crisp AI's data analytics solutions, we uncovered new opportunities that increased our revenue by 25% in six months.",
      author: "John M.",
      title: "Manufacturing Manager"
    }
  ];

  return (
    <section className="py-16 bg-[#F4FAFF]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                title={testimonial.title}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
