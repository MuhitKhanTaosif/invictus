import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-primary-400 text-xl font-heading font-semibold">Invictus Consultants</h3>
            <p className="text-neutral-300 leading-relaxed">
              Empowering Growth. Inspiring Change. We provide tailored training, consultancy, 
              coaching, mentoring, and counselling services to help individuals and 
              organisations reach their full potential.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-neutral-900 hover:bg-primary-600 hover:-translate-y-1 transition-all duration-300">
                💼
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-neutral-900 hover:bg-primary-600 hover:-translate-y-1 transition-all duration-300">
                📘
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-neutral-900 hover:bg-primary-600 hover:-translate-y-1 transition-all duration-300">
                📷
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-primary-400 text-xl font-heading font-semibold">Navigation</h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Home
              </Link>
              <Link to="/about-us" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                About Us
              </Link>
              <Link to="/services" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Services
              </Link>
              <Link to="/services/training-program" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Training Programs
              </Link>
              <Link to="/blogs" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Blogs
              </Link>
              <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-primary-400 text-xl font-heading font-semibold">Services</h3>
            <div className="flex flex-col gap-3">
              <Link to="/services/consultancy-and-compliance" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Consultancy & Compliance
              </Link>
              <Link to="/services/training-program" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Training Programs
              </Link>
              <Link to="/services/coaching-and-mentoring" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Coaching & Mentoring
              </Link>
              <Link to="/services/counselling-and-wellbeing-support" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                Counselling & Wellbeing
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-primary-400 text-xl font-heading font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <p className="text-neutral-300 flex items-center gap-3">
                📍 Sydney, Australia
              </p>
              <p className="text-neutral-300 flex items-center gap-3">
                📧 info@invictusconsultants.com.au
              </p>
              <p className="text-neutral-300 flex items-center gap-3">
                📞 0490 132 692
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sage-400 text-lg font-semibold mb-4">
                Subscribe to Updates
              </h4>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <button 
                  type="button"
                  className="w-full px-4 py-3 bg-primary-500 text-neutral-900 font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-neutral-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-sm">
              © {currentYear} Invictus Consultants. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
