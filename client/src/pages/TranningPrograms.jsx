import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const programs = [
    {
        icon: '🩹',
        title: 'First Aid Training',
        description: 'Comprehensive first aid training programs designed to equip individuals with life-saving skills and emergency response knowledge.',
        features: [
            'CPR and AED certification',
            'Basic life support techniques',
            'Emergency response protocols',
            'Injury assessment and treatment',
            'Workplace safety compliance'
        ],
        link: '/first-aid-training'
    },
    {
        icon: '👥',
        title: 'Leadership & Management',
        description: 'Develop essential leadership skills and management capabilities to drive team success and organizational growth.',
        features: [
            'Strategic thinking and planning',
            'Team building and motivation',
            'Conflict resolution skills',
            'Performance management',
            'Communication excellence'
        ]
    },
    {
        icon: '🛡️',
        title: 'Workplace Safety',
        description: 'Ensure workplace safety compliance and create a secure environment for all employees through comprehensive safety training.',
        features: [
            'OSHA compliance training',
            'Hazard identification and prevention',
            'Safety protocol development',
            'Emergency evacuation procedures',
            'Risk assessment and management'
        ]
    },
    {
        icon: '💼',
        title: 'Soft Skills Development',
        description: 'Enhance interpersonal skills, emotional intelligence, and professional competencies for career advancement.',
        features: [
            'Communication and presentation skills',
            'Emotional intelligence training',
            'Time management and productivity',
            'Customer service excellence',
            'Professional networking'
        ]
    }
];

export default function TrainingPrograms() {
    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-warm-200 via-warm-300 to-warm-400 py-16 lg:py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-warm-100/20 via-transparent to-warm-200/30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 font-heading"
                    >
                        Training Programs
                    </motion.h1>
                    <div className="text-neutral-700 font-medium">
                        <a 
                            href="/" 
                            className="text-neutral-700 hover:text-neutral-900 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all duration-300 backdrop-blur-sm"
                        >
                            HOME
                        </a>
                        <span className="mx-2">&gt;</span>
                        <span className="text-neutral-900 underline font-semibold">TRAINING PROGRAMS</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-5 py-20">
                {/* Introduction */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Empowering individuals and organizations through comprehensive training solutions designed to enhance skills, safety, and professional development.
                    </motion.p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-10 shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 border-primary-500 relative overflow-hidden group hover:-translate-y-2"
                        >
                            {/* Decorative Element */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-2xl rounded-tr-2xl"></div>
                            
                            {/* Program Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6 text-2xl text-white">
                                {program.icon}
                            </div>
                            
                            {/* Program Title */}
                            <h3 className="text-2xl font-bold text-neutral-800 mb-5 leading-tight">
                                {program.title}
                            </h3>
                            
                            {/* Program Description */}
                            <p className="text-neutral-600 leading-relaxed mb-6 text-lg">
                                {program.description}
                            </p>
                            
                            {/* Program Features */}
                            <ul className="space-y-2 mb-8">
                                {program.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="text-neutral-600 pl-5 relative">
                                        <span className="absolute left-0 text-primary-500 font-bold">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            
                            {/* CTA Button */}
                            <Link 
                                to={program.link || '#'}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/25"
                            >
                                Learn More <span>→</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white rounded-2xl p-12 shadow-soft text-center"
                >
                    <h2 className="text-3xl font-bold text-neutral-800 mb-10">
                        Training Excellence by Numbers
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
                            <div className="text-lg text-neutral-600 font-medium">Participants Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
                            <div className="text-lg text-neutral-600 font-medium">Organizations Served</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-500 mb-2">95%</div>
                            <div className="text-lg text-neutral-600 font-medium">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
                            <div className="text-lg text-neutral-600 font-medium">Support Available</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
