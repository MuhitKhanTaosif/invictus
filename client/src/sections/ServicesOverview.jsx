import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ServicesContainer = styled.section`
  background: #f8f9fa;
  padding: 100px 0;
`;

const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(255, 215, 0, 0.2);
    border-color: #FFD700;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
  color: #000000;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const ServiceLink = styled(Link)`
  color: #FFD700;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #B8860B;
  }
`;

const services = [
    {
        icon: '💼',
        title: 'Business Consulting',
        description: 'Strategic business consulting services to help organizations optimize operations and achieve sustainable growth.',
        link: '/services/business-consulting'
    },
    {
        icon: '🎓',
        title: 'Training Programs',
        description: 'Comprehensive training programs designed to enhance skills, knowledge, and professional development.',
        link: '/training-programs'
    },
    {
        icon: '🤝',
        title: 'Mentoring & Coaching',
        description: 'Personalized mentoring and coaching services to support individual growth and career development.',
        link: '/services/mentoring-coaching'
    },
    {
        icon: '💬',
        title: 'Counselling',
        description: 'Professional counselling services providing confidential support for mental health and emotional well-being.',
        link: '/services/counselling'
    }
];

const ServiceCardComponent = ({ service, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <ServiceCard
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceLink to={service.link}>
                Learn More <span>→</span>
            </ServiceLink>
        </ServiceCard>
    );
};

const ServicesOverview = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <ServicesContainer>
            <ServicesContent>
                <SectionHeader>
                    <SectionTitle
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        Our Services
                    </SectionTitle>
                    <SectionSubtitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Tailored Support for Every Journey
                    </SectionSubtitle>
                </SectionHeader>

                <ServicesGrid>
                    {services.map((service, index) => (
                        <ServiceCardComponent key={service.title} service={service} index={index} />
                    ))}
                </ServicesGrid>
            </ServicesContent>
        </ServicesContainer>
    );
};

export default ServicesOverview;
