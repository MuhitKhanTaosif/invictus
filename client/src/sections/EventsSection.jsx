import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const trainingPrograms = [
    {
        icon: '🩹',
        title: 'First Aid & Mental Health Training',
        description: 'Comprehensive first aid training programs including CPR, emergency life support, and mental health support in workplace and community settings.',
        link: '/services/training-program/first-aid-and-mental-health-training-programs'
    },
    {
        icon: '👥',
        title: 'Leadership & Management',
        description: 'Develop essential leadership skills and management capabilities to drive team success and organizational growth.',
        link: '/services/training-program'
    },
    {
        icon: '💼',
        title: 'Professional Development',
        description: 'Enhance communication skills, workplace wellbeing, and compliance training to support professional growth and organizational excellence.',
        link: '/services/training-program'
    }
];

const EventsSection = () => {
    return (
        <section className="bg-gradient-calm py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 font-heading"
                    >
                        Featured Training Programs
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Professional Development and Skill Enhancement
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trainingPrograms.map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-soft border-l-4 border-primary-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium"
                        >
                            <div className="text-4xl mb-4 text-primary-600">
                                {program.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-800 mb-4 font-heading">
                                {program.title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {program.description}
                            </p>
                            <Link
                                to={program.link}
                                className="text-primary-600 font-semibold inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary-700"
                            >
                                Learn More <span>→</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
