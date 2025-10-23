import React, { useState } from 'react';
import { motion } from 'motion/react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
    <div className="pt-20 min-h-screen bg-gradient-calm">
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed opacity-95"
          >
            Get in touch with our team of experts
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
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
              Get in Touch
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your journey with us? We're here to help you achieve your goals.
            </p>
                    </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
                    <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-200"
            >
              <h3 className="text-2xl font-bold text-neutral-800 mb-6 font-heading">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                                        type="text"
                      id="name"
                                        name="name"
                                        value={formData.name}
                      onChange={handleChange}
                                        required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                                        type="email"
                      id="email"
                                        name="email"
                                        value={formData.email}
                      onChange={handleChange}
                                        required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                                        type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="+61 4XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                                        name="service"
                                        value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      <option value="training">Training & Professional Development</option>
                      <option value="consultancy">Consultancy & Compliance</option>
                      <option value="coaching">Coaching & Mentoring</option>
                      <option value="counselling">Counselling & Wellbeing Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-6 font-heading">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Location</h4>
                      <p className="text-neutral-600">Sydney, Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 text-xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Email</h4>
                      <p className="text-neutral-600">info@invictusconsultants.com.au</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Phone</h4>
                      <p className="text-neutral-600">0490 132 692</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-calm rounded-2xl p-8">
                <h4 className="text-xl font-bold text-neutral-800 mb-4 font-heading">
                  Why Choose Us?
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span className="text-neutral-700">20+ years of experience</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span className="text-neutral-700">Tailored, people-focused solutions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span className="text-neutral-700">Proven expertise and practical approach</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span className="text-neutral-700">Commitment to real, lasting change</span>
                  </li>
                </ul>
              </div>
                </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;