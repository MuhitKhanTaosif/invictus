import React, { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'motion/react';

const services = [
    {
        icon: '🎓',
        title: 'Training & Professional Development',
        description: 'Accredited and non-accredited programs to help individuals and teams build real-world skills.',
        link: '/services/training-program'
    },
    {
        icon: '📋',
        title: 'Consultancy & Compliance',
        description: 'Business policy development, documentation, audits, and strategic planning.',
        link: '/services/consultancy-and-compliance'
    },
    {
        icon: '🤝',
        title: 'Coaching & Mentoring',
        description: 'Personalized one-on-one mentoring and coaching sessions to unlock your potential.',
        link: '/services/coaching-and-mentoring'
    },
    {
        icon: '💚',
        title: 'Counselling & Wellbeing Support',
        description: 'Confidential, compassionate support for mental health and career clarity.',
        link: '/services/counselling-and-wellbeing-support'
    }
];

const ServiceCardComponent = ({ service, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 text-center shadow-soft border border-neutral-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-medium hover:border-primary-300"
        >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 font-heading">
                {service.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
                {service.description}
            </p>
            <Link
                to={service.link}
                className="text-primary-600 font-semibold inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary-700"
            >
                Learn More <span>→</span>
            </Link>
        </motion.div>
    );
};

const ServicesOverview = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="bg-gradient-calm py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-20">
                    <motion.h2
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 font-heading"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Tailored Support for Every Journey
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCardComponent key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
