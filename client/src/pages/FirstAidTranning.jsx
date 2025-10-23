import React from 'react';
import { motion } from 'motion/react';
import CourseCard from '../components/CourseCard';

const courses = [
    {
        id: 1,
        title: 'Provide Cardiopulmonary Resuscitation',
        code: 'HLTAID009',
        slug: 'provide-cardiopulmonary-resuscitation',
        image: '/images/courses/cpr-training.jpg'
    },
    {
        id: 2,
        title: 'Provide Basic Emergency Life Support',
        code: 'HLTAID010',
        slug: 'provide-basic-emergency-life-support',
        image: '/images/courses/emergency-life-support.jpg'
    },
    {
        id: 3,
        title: 'Provide First Aid',
        code: 'HLTAID011',
        slug: 'provide-first-aid',
        image: '/images/courses/first-aid-basic.jpg'
    },
    {
        id: 4,
        title: 'Provide First Aid in an Education and Care Setting',
        code: 'HLTAID012',
        slug: 'provide-first-aid-education-care',
        image: '/images/courses/first-aid-education.jpg'
    },
    {
        id: 5,
        title: 'Provide First Aid in Remote or Isolated Area',
        code: 'HLTAID013',
        slug: 'provide-first-aid-remote',
        image: '/images/courses/first-aid-remote.jpg'
    },
    {
        id: 6,
        title: 'Provide Advanced First Aid',
        code: 'HLTAID014',
        slug: 'provide-advanced-first-aid',
        image: '/images/courses/advanced-first-aid.jpg'
    },
    {
        id: 7,
        title: 'Provide Advanced Resuscitation and Oxygen Therapy',
        code: 'HLTAID015',
        slug: 'provide-advanced-resuscitation-oxygen',
        image: '/images/courses/advanced-resuscitation.jpg'
    },
    {
        id: 8,
        title: 'Provide Pain Management',
        code: 'PUAEME008',
        slug: 'provide-pain-management',
        image: '/images/courses/pain-management.jpg'
    }
];

export default function FirstAidTraining() {
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
                        First Aid,
                        <span className="block text-primary-600">Resuscitation & CPR</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                        Comprehensive first aid training courses designed to equip individuals with life-saving skills and emergency response knowledge.
                        All courses are nationally recognized and meet Australian standards.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {courses.map((course, index) => (
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

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 bg-white rounded-3xl p-12 shadow-soft"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-6 font-heading">
                            Why Choose Our First Aid Training?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl text-primary-600 mx-auto mb-4">
                                    🏆
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-2 font-heading">
                                    Nationally Recognized
                                </h3>
                                <p className="text-neutral-600 text-sm">
                                    All courses meet Australian standards and are nationally recognized qualifications.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center text-3xl text-accent-600 mx-auto mb-4">
                                    👨‍⚕️
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-2 font-heading">
                                    Expert Instructors
                                </h3>
                                <p className="text-neutral-600 text-sm">
                                    Learn from qualified healthcare professionals with real-world experience.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-3xl text-sage-600 mx-auto mb-4">
                                    🎯
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-2 font-heading">
                                    Practical Training
                                </h3>
                                <p className="text-neutral-600 text-sm">
                                    Hands-on practice with modern equipment and realistic scenarios.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}



