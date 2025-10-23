import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  background: 
    linear-gradient(135deg, #FFD700 0%, #B8860B 25%, #FFD700 50%, #B8860B 75%, #FFD700 100%);
  padding: 60px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Geometric patterns */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.05) 20px,
        rgba(255, 255, 255, 0.05) 21px,
        transparent 21px,
        transparent 40px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.03) 20px,
        rgba(255, 255, 255, 0.03) 21px,
        transparent 21px,
        transparent 40px
      ),
      /* Radial light effects */
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      /* Diagonal light streaks */
      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%);
    z-index: 1;
    animation: heroTextureMove 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 8px,
        rgba(255, 255, 255, 0.03) 8px,
        rgba(255, 255, 255, 0.03) 12px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 6px,
        rgba(255, 255, 255, 0.02) 6px,
        rgba(255, 255, 255, 0.02) 10px
      );
    backdrop-filter: blur(1px);
    z-index: 2;
    animation: drift 8s linear infinite;
  }
  
  @keyframes heroTextureMove {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 1;
    }
    25% { 
      transform: translateY(-3px) translateX(2px) rotate(1deg);
      opacity: 0.9;
    }
    50% { 
      transform: translateY(2px) translateX(-2px) rotate(-1deg);
      opacity: 0.95;
    }
    75% { 
      transform: translateY(-1px) translateX(3px) rotate(0.5deg);
      opacity: 0.85;
    }
  }
  
  @keyframes drift {
    0% { transform: translateX(0px) translateY(0px); }
    100% { transform: translateX(10px) translateY(5px); }
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 4;
`;

const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.8), transparent);
    border-radius: 2px;
  }
`;

const Breadcrumb = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  
  a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 6px 12px;
    border-radius: 6px;
    
    &:hover {
      color: #000000;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  span {
    color: #000000;
    text-decoration: underline;
    font-weight: 600;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 6px solid #FFD700;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent);
    border-radius: 0 16px 0 100px;
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  font-size: 1.8rem;
  color: white;
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1.1rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
`;

const FeatureItem = styled.li`
  color: #555;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  font-size: 1rem;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #FFD700;
    font-weight: bold;
  }
`;

const ServiceCTA = styled(Link)`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
  }
`;

const StatsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  margin-top: 60px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatsTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`;

const services = [
  {
    icon: '💼',
    title: 'Business Consulting',
    description: 'Strategic business consulting services to help organizations optimize operations, improve efficiency, and achieve sustainable growth.',
    features: [
      'Strategic planning and analysis',
      'Process optimization',
      'Change management',
      'Performance improvement',
      'Market research and analysis'
    ],
    link: '/services/business-consulting'
  },
  {
    icon: '🎓',
    title: 'Training Programs',
    description: 'Comprehensive training programs designed to enhance skills, knowledge, and professional development across various domains.',
    features: [
      'First Aid Training',
      'Leadership & Management',
      'Workplace Safety',
      'Soft Skills Development',
      'Custom training solutions'
    ],
    link: '/training-programs'
  },
  {
    icon: '🤝',
    title: 'Mentoring & Coaching',
    description: 'Personalized mentoring and coaching services to support individual growth, career development, and personal transformation.',
    features: [
      'One-on-one mentoring',
      'Career coaching',
      'Leadership development',
      'Personal growth programs',
      'Executive coaching'
    ],
    link: '/services/mentoring-coaching'
  },
  {
    icon: '💬',
    title: 'Counselling',
    description: 'Professional counselling services providing confidential support for mental health, personal challenges, and emotional well-being.',
    features: [
      'Individual counselling',
      'Family therapy',
      'Mental health support',
      'Trauma counselling',
      'Addiction recovery support'
    ],
    link: '/services/counselling'
  }
];

export default function Services() {
  return (
    <ServicesContainer>
      <HeaderSection>
        <HeaderContent>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </PageTitle>
          <Breadcrumb>
            <a href="/">HOME</a> &gt; <span>SERVICES</span>
          </Breadcrumb>
        </HeaderContent>
      </HeaderSection>

      <ServicesContent>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '1.3rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Comprehensive solutions designed to empower individuals and organizations through professional development, strategic consulting, and personalized support.
          </motion.p>
        </div>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                ))}
              </ServiceFeatures>
              <ServiceCTA to={service.link}>
                Learn More <span>→</span>
              </ServiceCTA>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <StatsSection>
          <StatsTitle>Service Excellence by Numbers</StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>1000+</StatNumber>
              <StatLabel>Clients Served</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Organizations</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>98%</StatNumber>
              <StatLabel>Client Satisfaction</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Support Available</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      </ServicesContent>
    </ServicesContainer>
  );
};

