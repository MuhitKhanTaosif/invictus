import React from 'react';
import { motion } from 'motion/react';

export default function AdminDashboardPage() {
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
                        <span className="block text-primary-600">Dashboard</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Monitor and manage your application from this comprehensive admin dashboard.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 shadow-soft"
                    >
                        <h2 className="text-2xl font-bold text-neutral-800 mb-6 font-heading">
                            Application Status
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-100">
                                <span className="text-green-600 font-semibold">System Status</span>
                                <span className="text-green-600 text-sm">✅ Online</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                                <span className="text-blue-600 font-semibold">Database</span>
                                <span className="text-blue-600 text-sm">✅ Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                                <span className="text-purple-600 font-semibold">API Services</span>
                                <span className="text-purple-600 text-sm">✅ Running</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white rounded-3xl p-8 shadow-soft"
                    >
                        <h2 className="text-2xl font-bold text-neutral-800 mb-6 font-heading">
                            Quick Actions
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-300">
                                Manage Courses
                            </button>
                            <button className="w-full bg-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-600 transition-colors duration-300">
                                View Analytics
                            </button>
                            <button className="w-full bg-sage-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sage-600 transition-colors duration-300">
                                User Management
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-white rounded-3xl p-8 shadow-soft"
                >
                    <h2 className="text-2xl font-bold text-neutral-800 mb-6 font-heading text-center">
                        System Overview
                    </h2>
                    <p className="text-neutral-600 text-center mb-8">
                        Admin dashboard content will be implemented here.
                    </p>
                    <p className="text-neutral-600 text-center">
                        Status of this web application
                    </p>
                </motion.div>
            </div>
        </div>
    );
}


