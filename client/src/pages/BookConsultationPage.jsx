import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function BookConsultationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-calm min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6 font-heading">
            Book a
            <span className="block text-primary-600">Consultation</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Simple, quick and designed around your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-soft"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-6 font-heading">
              Let's Get Started
            </h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Use the form below to book a session with our team. Whether you're scheduling a workshop, consultation or one-on-one support, choose a time that works for you and we'll take care of the rest.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              If you have questions or need help with your booking, feel free to contact us.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-neutral-600">
                <span className="text-primary-500 mr-3">📍</span>
                Sydney, Australia
              </div>
              <div className="flex items-center text-neutral-600">
                <span className="text-primary-500 mr-3">📧</span>
                hello@invictussolutions.com.au
              </div>
              <div className="flex items-center text-neutral-600">
                <span className="text-primary-500 mr-3">📞</span>
                1300 INVICTUS
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Already a Client?
              </h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                If you've booked with us before and need to reschedule, cancel, or update your details, click here to access the Customer Panel.
              </p>
              <a href="#" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300">
                Access Customer Panel
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-soft"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 font-heading">
              Book Your Session
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  />
                </div>
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Service Type *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300 bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="business-consulting">Business Consulting</option>
                  <option value="training-programs">Training Programs</option>
                  <option value="mentoring-coaching">Mentoring & Coaching</option>
                  <option value="counselling">Counselling</option>
                  <option value="first-aid-training">First Aid Training</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300 bg-white"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about what you're looking for..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-300 resize-vertical"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-300 hover:bg-primary-600 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              >
                {isSubmitting ? 'Submitting...' : 'Book Consultation'}
              </motion.button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl">
                  Thank you! Your consultation request has been submitted successfully. We'll contact you within 24 hours to confirm your appointment.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl">
                  Sorry, there was an error submitting your request. Please try again or contact us directly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}