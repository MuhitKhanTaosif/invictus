import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "HR Director",
    company: "TechCorp Australia",
    content: "Invictus Consultants transformed our workplace culture through their comprehensive wellbeing program. The training was engaging, practical, and our employees are more motivated than ever.",
    rating: 5,
    image: "/images/testimonials/sarah-mitchell.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Operations Manager", 
    company: "Manufacturing Solutions Ltd",
    content: "The first aid training provided by Invictus was exceptional. Our team now feels confident and prepared to handle any emergency situation. Highly recommended!",
    rating: 5,
    image: "/images/testimonials/david-chen.jpg"
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "CEO",
    company: "Startup Innovations",
    content: "The leadership development program helped our management team develop essential skills for growth. The personalized approach made all the difference.",
    rating: 5,
    image: "/images/testimonials/emma-thompson.jpg"
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-200 transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
    >
      <div className="flex items-center mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-primary-500 text-xl">★</span>
        ))}
      </div>
      
      <blockquote className="text-neutral-700 leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-primary-600 font-semibold text-lg">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold text-neutral-800">{testimonial.name}</div>
          <div className="text-sm text-neutral-600">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-gradient-calm py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 font-heading"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our clients have to say about their experience with Invictus Consultants.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
