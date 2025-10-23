import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-24 text-center text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 font-heading"
          >
            About Invictus Consultants
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed opacity-95"
          >
            Empowering Growth. Inspiring Change.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
              <h2 className="text-4xl font-bold text-neutral-800 mb-6 font-heading">Our Mission</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                To provide the tools, guidance, and support people need to succeed — personally and professionally.
              </p>
              <h3 className="text-3xl font-bold text-neutral-800 mb-4 font-heading">Our Vision</h3>
              <p className="text-lg text-neutral-600 leading-relaxed">
                To build a community where learning, wellbeing, and leadership come together — inspiring people and organisations to reach their full potential and drive meaningful impact.
              </p>
      </motion.div>

      <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
              className="bg-gradient-calm rounded-3xl p-8"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">20+ Years Experience</h3>
                <p className="text-neutral-600">
                  Over two decades of expertise in education, training, and business consultancy
                </p>
              </div>
      </motion.div>
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-24 bg-gradient-calm">
        <div className="max-w-7xl mx-auto px-5">
      <motion.div
            initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 font-heading">
              Company Background
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Originated from Phoenix Training Solutions Pty Ltd (est. 2011) and rebranded as Invictus Consultants in 2022
            </p>
      </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1000+",
                label: "Clients Supported",
                description: "Individuals, workplaces, and organisations"
              },
              {
                number: "50+",
                label: "Organisations",
                description: "Companies across Australia"
              },
              {
                number: "20+",
                label: "Years Experience",
                description: "In education, training & consultancy"
              }
            ].map((stat, index) => (
      <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="text-4xl font-bold text-primary-600 mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {stat.label}
                </h3>
                <p className="text-neutral-600">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
      <motion.div
            initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 font-heading">
              Why Choose Invictus Consultants
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We deliver practical, purpose-driven services that support individuals, schools, organisations, and communities.
            </p>
      </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "20+ years of experience",
                description: "In education, training & consultancy"
              },
              {
                icon: "🎯",
                title: "Tailored, people-focused solutions",
                description: "Customized to meet your specific needs"
              },
              {
                icon: "🤝",
                title: "Trusted by individuals & organisations",
                description: "Proven track record of success"
              },
              {
                icon: "💪",
                title: "Commitment to real, lasting change",
                description: "Measurable impact and transformation"
              },
              {
                icon: "⭐",
                title: "Proven expertise and practical approach",
                description: "Industry-leading methodologies"
              },
              {
                icon: "🌐",
                title: "Partnership ecosystem",
                description: "With development and marketing professionals"
              }
            ].map((item, index) => (
      <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 rounded-xl hover:bg-neutral-50 transition-colors duration-300"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 font-heading"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-12 leading-relaxed"
          >
            Let's work together to unlock your potential and achieve your goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a
              href="/services/consultancy-and-compliance/book-consultation"
              className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              Book a Consultation
            </a>
            <a
              href="/contact"
              className="bg-transparent text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-400 hover:bg-primary-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
            </a>
      </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;