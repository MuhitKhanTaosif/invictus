import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  {
    number: 20,
    label: 'Years of Experience',
    description: 'Over two decades of expertise in education, training, and business consultancy'
  },
  {
    number: 1000,
    label: 'Clients Supported',
    description: 'Individuals, workplaces, and organisations who have benefited from our services'
  },
  {
    number: 50,
    label: 'Organisations',
    description: 'Companies across Australia that trust us with their training and development needs'
  },
  {
    number: 98,
    label: 'Success Rate',
    description: 'Client satisfaction and successful program completion rate'
  }
];

const StatItemComponent = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        className="text-5xl md:text-6xl font-bold text-primary-600 mb-4 flex items-center justify-center gap-2"
      >
        {stat.number}
        {stat.label !== 'Success Rate' && <span className="text-3xl text-primary-700">+</span>}
        {stat.label === 'Success Rate' && <span className="text-3xl text-primary-700">%</span>}
      </motion.div>
      <div className="text-lg font-semibold text-neutral-700 uppercase tracking-wide mb-2">
        {stat.label}
      </div>
      <div className="text-sm text-neutral-500 leading-relaxed">
        {stat.description}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-neutral-800 text-center mb-16 font-heading"
        >
          Our Impact
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItemComponent key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
