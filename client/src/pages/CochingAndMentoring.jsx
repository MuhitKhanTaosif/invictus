import React from 'react';
import { motion } from 'motion/react';

const mentoringServices = [
  {
    icon: '👤',
    title: 'One-on-One Mentoring',
    description: 'Personalized mentoring relationships designed to support individual growth, career development, and personal transformation.'
  },
  {
    icon: '🎯',
    title: 'Career Coaching',
    description: 'Professional career coaching to help individuals navigate career transitions, set goals, and achieve professional success.'
  },
  {
    icon: '👑',
    title: 'Leadership Development',
    description: 'Comprehensive leadership development programs to build essential leadership skills and capabilities.'
  },
  {
    icon: '🌱',
    title: 'Personal Growth Programs',
    description: 'Structured programs focused on personal development, self-awareness, and building resilience.'
  },
  {
    icon: '💼',
    title: 'Executive Coaching',
    description: 'High-level executive coaching for senior leaders to enhance performance and drive organizational success.'
  },
  {
    icon: '🤝',
    title: 'Group Mentoring',
    description: 'Peer-to-peer mentoring programs that foster collaboration, learning, and mutual support.'
  }
];

const approaches = [
  {
    icon: '🎯',
    title: 'Goal-Oriented',
    description: 'We focus on setting clear, achievable goals and developing actionable plans to reach them.'
  },
  {
    icon: '💡',
    title: 'Strengths-Based',
    description: 'Our approach leverages your existing strengths while identifying areas for growth and development.'
  },
  {
    icon: '🔄',
    title: 'Continuous Learning',
    description: 'We promote a culture of continuous learning and adaptation to changing circumstances.'
  },
  {
    icon: '🤝',
    title: 'Collaborative',
    description: 'We work together as partners in your development journey, providing support and accountability.'
  }
];

const benefits = [
  {
    icon: '📈',
    title: 'Career Advancement',
    description: 'Accelerate your career growth with strategic guidance and professional development.'
  },
  {
    icon: '🎯',
    title: 'Clear Direction',
    description: 'Gain clarity on your goals and develop a clear path forward.'
  },
  {
    icon: '💪',
    title: 'Increased Confidence',
    description: 'Build confidence and self-assurance through skill development and achievement.'
  },
  {
    icon: '🌐',
    title: 'Expanded Network',
    description: 'Access to professional networks and opportunities for growth and collaboration.'
  }
];

export default function CochingAndMentoring() {
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
            Mentoring &
            <span className="block text-primary-600">Coaching</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Personalized mentoring and coaching services designed to support individual growth, career development, and personal transformation through expert guidance and proven methodologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {mentoringServices.map((service, index) => (
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
            Our Approach
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-6">
                  {approach.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3 font-heading">
                  {approach.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {approach.description}
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
            Benefits of Mentoring & Coaching
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-3 font-heading">
                  {benefit.title}
                </h3>
                <p className="text-primary-100 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-soft text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-800 mb-6 font-heading">
            Ready to Start Your Development Journey?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how our mentoring and coaching services can help you achieve your personal and professional goals.
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