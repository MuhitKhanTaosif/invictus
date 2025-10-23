import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ApproachContainer = styled.section`
  background: white;
  padding: 100px 0;
`;

const ApproachContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 80px;
  line-height: 1.6;
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ApproachCard = styled(motion.div)`
  text-align: center;
  padding: 30px;
`;

const ApproachIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 2.5rem;
  color: #000000;
`;

const ApproachTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const ApproachDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const approaches = [
  {
    icon: '🌱',
    title: 'Empowering Youth Early',
    description: 'We run proactive programs in schools, community centres, and organisations to build confidence, resilience, and leadership in young people before issues arise.'
  },
  {
    icon: '💪',
    title: 'Supporting Individuals in Struggle',
    description: 'We empower individuals to confront challenges head-on, equipping them with the tools and strategies needed to overcome adversity and achieve lasting personal growth.'
  },
  {
    icon: '🏢',
    title: 'Strengthening Communities & Teams',
    description: 'We partner with schools, businesses, and community groups to deliver tailored workshops and consulting that foster healthier, more effective environments.'
  }
];

const ApproachSection = () => {
  return (
    <ApproachContainer>
      <ApproachContent>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          We work across the spectrum of growth, support, and transformation
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          From early intervention with youth to deep, transformative work with individuals and organisations.
        </SectionSubtitle>

        <ApproachGrid>
          {approaches.map((approach, index) => (
            <ApproachCard
              key={approach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ApproachIcon>{approach.icon}</ApproachIcon>
              <ApproachTitle>{approach.title}</ApproachTitle>
              <ApproachDescription>{approach.description}</ApproachDescription>
            </ApproachCard>
          ))}
        </ApproachGrid>
      </ApproachContent>
    </ApproachContainer>
  );
};

export default ApproachSection;
