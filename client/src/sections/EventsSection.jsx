import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TrainingContainer = styled.section`
  background: #f8f9fa;
  padding: 100px 0;
`;

const TrainingContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
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

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const TrainingCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #FFD700;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.2);
  }
`;

const TrainingIcon = styled.div`
  color: #FFD700;
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 15px;
`;

const TrainingTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const TrainingDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TrainingLink = styled.a`
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

const trainingPrograms = [
    {
        icon: '🩹',
        title: 'First Aid Training',
        description: 'Comprehensive first aid training programs designed to equip individuals with life-saving skills and emergency response knowledge.',
        link: '/training-programs'
    },
    {
        icon: '👥',
        title: 'Leadership & Management',
        description: 'Develop essential leadership skills and management capabilities to drive team success and organizational growth.',
        link: '/training-programs'
    },
    {
        icon: '🛡️',
        title: 'Workplace Safety',
        description: 'Ensure workplace safety compliance and create a secure environment for all employees through comprehensive safety training.',
        link: '/training-programs'
    }
];

const EventsSection = () => {
    return (
        <TrainingContainer>
            <TrainingContent>
                <SectionHeader>
                    <SectionTitle
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Featured Training Programs
                    </SectionTitle>
                    <SectionSubtitle
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Professional Development and Skill Enhancement
                    </SectionSubtitle>
                </SectionHeader>

                <TrainingGrid>
                    {trainingPrograms.map((program, index) => (
                        <TrainingCard
                            key={program.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <TrainingIcon>{program.icon}</TrainingIcon>
                            <TrainingTitle>{program.title}</TrainingTitle>
                            <TrainingDescription>{program.description}</TrainingDescription>
                            <TrainingLink href={program.link}>
                                Learn More <span>→</span>
                            </TrainingLink>
                        </TrainingCard>
                    ))}
                </TrainingGrid>
            </TrainingContent>
        </TrainingContainer>
    );
};

export default EventsSection;
