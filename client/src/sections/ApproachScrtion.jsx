import React from 'react';
import { motion } from 'motion/react';

const approaches = [
  {
    icon: '🎓',
    title: 'Training & Professional Development',
    description: 'Accredited and non-accredited programs to help individuals and teams build real-world skills through learner-centred, interactive approaches.'
  },
  {
    icon: '📋',
    title: 'Consultancy & Compliance',
    description: 'Business policy development, documentation, audits, and strategic planning to keep organisations compliant and ahead of regulatory changes.'
  },
  {
    icon: '🤝',
    title: 'Coaching & Mentoring',
    description: 'Personalized one-on-one mentoring and coaching sessions to build leadership, confidence, and communication skills with focus on emotional intelligence.'
  },
  {
    icon: '💚',
    title: 'Counselling & Wellbeing Support',
    description: 'Confidential, compassionate support for mental health and career clarity, encouraging resilience, balance, and personal growth.'
  }
];

const ApproachSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-neutral-800 text-center mb-6 font-heading"
        >
          Our Approach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-neutral-600 text-center max-w-4xl mx-auto mb-20 leading-relaxed"
        >
          We work across the spectrum of growth, support, and transformation - from early intervention to deep, transformative work with individuals and organisations.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl text-white">
                {approach.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 font-heading">
                {approach.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
