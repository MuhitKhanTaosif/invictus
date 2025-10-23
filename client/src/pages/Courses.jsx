import React from 'react';
import { motion } from 'motion/react';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';

export default function Courses() {
    return (
        <div className="pt-20 min-h-screen bg-gradient-calm">
            <div className="max-w-7xl mx-auto px-5 py-20">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-800 mb-6 font-heading leading-tight">
                        Professional
                        <span className="block text-primary-600">Training Courses</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive training programs designed to enhance your skills and advance your career. 
                        From first aid to professional development, we offer courses that make a difference.
                    </p>
                </motion.div>

                {/* Course Categories Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {['All', 'First Aid', 'Mental Health', 'Professional Development', 'Wellbeing'].map((category) => (
                        <button
                            key={category}
                            className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 shadow-soft hover:shadow-medium"
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Courses Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {coursesData.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-20 bg-white rounded-3xl p-12 shadow-soft"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6 font-heading">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your training needs and find the perfect course for your team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1">
                            Book a Consultation
                        </button>
                        <button className="bg-transparent text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                            View All Services
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}



