import React from 'react';
import { motion } from 'motion/react';

export default function AdminCourses() {
    return (
        <div className="pt-20 min-h-screen bg-gradient-calm">
            <div className="max-w-7xl mx-auto px-5 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6 font-heading">
                        Admin
                        <span className="block text-primary-600">Courses Management</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Manage and organize your training courses from this comprehensive admin panel.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-3xl p-12 shadow-soft"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-neutral-800 mb-4 font-heading">
                            Course Management Dashboard
                        </h2>
                        <p className="text-neutral-600 mb-8">
                            Admin courses content will be implemented here.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary-50 rounded-2xl p-6 border-2 border-primary-100">
                                <div className="text-primary-600 text-3xl mb-3">📚</div>
                                <h3 className="font-semibold text-neutral-800 mb-2">Course Library</h3>
                                <p className="text-sm text-neutral-600">Manage all available courses</p>
                            </div>
                            
                            <div className="bg-accent-50 rounded-2xl p-6 border-2 border-accent-100">
                                <div className="text-accent-600 text-3xl mb-3">👥</div>
                                <h3 className="font-semibold text-neutral-800 mb-2">Student Management</h3>
                                <p className="text-sm text-neutral-600">Track student progress</p>
                            </div>
                            
                            <div className="bg-sage-50 rounded-2xl p-6 border-2 border-sage-100">
                                <div className="text-sage-600 text-3xl mb-3">📊</div>
                                <h3 className="font-semibold text-neutral-800 mb-2">Analytics</h3>
                                <p className="text-sm text-neutral-600">View course statistics</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}




