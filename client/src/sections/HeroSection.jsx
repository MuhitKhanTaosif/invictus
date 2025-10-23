import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIwLDE4NCwxNjYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 leading-tight bg-gradient-to-r from-white via-primary-400 to-white bg-clip-text text-transparent"
                >
                    Invictus Consultants
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95"
                >
                    Empowering Growth. Inspiring Change. We provide tailored training, consultancy, 
                    coaching, mentoring, and counselling services to help individuals and 
                    organisations reach their full potential.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
                >
                    <Link
                        to="/services/consultancy-and-compliance/book-consultation"
                        className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 whitespace-nowrap"
                    >
                        Book Consultation
                        <span>→</span>
                    </Link>
                    <Link
                        to="/services"
                        className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 whitespace-nowrap"
                    >
                        Our Services
                        <span>→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
