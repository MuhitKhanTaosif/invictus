import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const CTASection = () => {
    return (
        <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-primary-50 py-24 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='1' fill='white' opacity='0.1'/%3E%3Ccircle cx='75' cy='75' r='1' fill='white' opacity='0.1'/%3E%3Ccircle cx='50' cy='10' r='0.5' fill='white' opacity='0.1'/%3E%3Ccircle cx='10' cy='60' r='0.5' fill='white' opacity='0.1'/%3E%3Ccircle cx='90' cy='40' r='0.5' fill='white' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grain)'/%3E%3C/svg%3E")`
                }}></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading"
                >
                    Let's Make it Happen
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl mb-12 leading-relaxed opacity-95"
                >
                    Whether you're ready to book a session or just want to have a conversation we're here to help.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link
                        to="/services/consultancy-and-compliance/book-consultation"
                        className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
                    >
                        Book a Consult
                        <span>📅</span>
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-transparent text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-400 hover:bg-primary-400 hover:text-white transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
                    >
                        Contact Us
                        <span>📞</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;