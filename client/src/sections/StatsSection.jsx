import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatsContainer = styled.section`
  background: white;
  padding: 80px 0;
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 60px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  padding: 20px;
`;

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::after {
    content: '+';
    font-size: 2rem;
    color: #B8860B;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatDescription = styled.div`
  font-size: 0.9rem;
  color: #999;
  margin-top: 5px;
`;

const stats = [
  {
    number: 50,
    label: 'Institutions Impacted',
    description: 'Schools, organizations, and communities'
  },
  {
    number: 1000,
    label: 'Individuals Supported',
    description: 'Through our programs and services'
  },
  {
    number: 200,
    label: 'Workshops',
    description: 'Interactive sessions delivered'
  },
  {
    number: 100,
    label: 'Programs',
    description: 'Customized solutions created'
  }
];

const StatItemComponent = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <StatItem
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <StatNumber
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        {stat.number}
      </StatNumber>
      <StatLabel>{stat.label}</StatLabel>
      <StatDescription>{stat.description}</StatDescription>
    </StatItem>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <StatsContainer>
      <StatsContent>
        <SectionTitle
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Our Impact
        </SectionTitle>
        
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatItemComponent key={stat.label} stat={stat} index={index} />
          ))}
        </StatsGrid>
      </StatsContent>
    </StatsContainer>
  );
};

export default StatsSection;
