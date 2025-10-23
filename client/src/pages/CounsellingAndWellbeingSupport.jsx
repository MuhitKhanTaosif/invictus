import React from 'react';
import { motion } from 'motion/react';

const counsellingServices = [
  {
    icon: '👤',
    title: 'Individual Counselling',
    description: 'One-on-one counselling sessions tailored to address personal challenges, mental health concerns, and life transitions.'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Therapy',
    description: 'Family-focused therapy to improve communication, resolve conflicts, and strengthen family relationships.'
  },
  {
    icon: '🧠',
    title: 'Mental Health Support',
    description: 'Comprehensive mental health support for anxiety, depression, stress management, and emotional well-being.'
  },
  {
    icon: '🩹',
    title: 'Trauma Counselling',
    description: 'Specialized trauma-informed counselling to help individuals process and heal from traumatic experiences.'
  },
  {
    icon: '🚫',
    title: 'Addiction Recovery',
    description: 'Support and counselling for individuals and families dealing with addiction and substance abuse issues.'
  },
  {
    icon: '💑',
    title: 'Couples Counselling',
    description: 'Relationship counselling to help couples improve communication, resolve conflicts, and strengthen their bond.'
  }
];

const specialties = [
  {
    icon: '😰',
    title: 'Anxiety & Stress',
    description: 'Evidence-based approaches to manage anxiety, stress, and panic disorders.'
  },
  {
    icon: '😔',
    title: 'Depression',
    description: 'Comprehensive support for individuals experiencing depression and mood disorders.'
  },
  {
    icon: '💔',
    title: 'Grief & Loss',
    description: 'Support through the grieving process and help with loss and bereavement.'
  },
  {
    icon: '🎯',
    title: 'Life Transitions',
    description: 'Guidance through major life changes, career transitions, and personal growth.'
  },
  {
    icon: '👶',
    title: 'Parenting Support',
    description: 'Counselling and support for parenting challenges and family dynamics.'
  },
  {
    icon: '🎓',
    title: 'Academic Stress',
    description: 'Support for students dealing with academic pressure, performance anxiety, and educational challenges.'
  }
];

const approaches = [
  {
    icon: '🤝',
    title: 'Client-Centered',
    description: 'We prioritize your needs and create a safe, non-judgmental space for healing and growth.'
  },
  {
    icon: '🔬',
    title: 'Evidence-Based',
    description: 'Our approaches are grounded in research and proven therapeutic methodologies.'
  },
  {
    icon: '🎯',
    title: 'Goal-Oriented',
    description: 'We work together to set clear, achievable goals and track progress throughout your journey.'
  },
  {
    icon: '💪',
    title: 'Strengths-Based',
    description: 'We focus on building upon your existing strengths while addressing areas for growth.'
  }
];

export default function CounsellingAndWellbeingSupport() {
  return (
    <div className="pt-20 bg-gradient-calm min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6 font-heading">
            Counselling
            <span className="block text-primary-600">Services</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Professional counselling services providing confidential support for mental health, personal challenges, and emotional well-being through compassionate, evidence-based care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {counsellingServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 border-primary-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-3xl text-white mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-4 font-heading">
                {service.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-12 shadow-soft mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center font-heading">
            Areas of Specialization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-6">
                  {specialty.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3 font-heading">
                  {specialty.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {specialty.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 text-white mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-center font-heading">
            Our Therapeutic Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{approach.icon}</div>
                <h3 className="text-lg font-semibold mb-3 font-heading">
                  {approach.title}
                </h3>
                <p className="text-primary-100 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-soft mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-800 mb-6 font-heading">
            Confidentiality & Privacy
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Your privacy and confidentiality are our top priorities. All counselling sessions are conducted in a safe, secure environment, and your personal information is protected according to professional ethical standards and legal requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-3xl p-12 shadow-soft text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-800 mb-6 font-heading">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health and emotional well-being. Our experienced counsellors are here to support you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            Schedule Consultation
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}