import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MentoringContainer = styled.div`
  padding-top: 80px; /* Account for fixed header */
  background: #f8f9fa;
  min-height: 100vh;
`;

const MentoringContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const ServiceCard = styled(motion.div)`
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

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: white;
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
  margin-bottom: 20px;
`;

const ApproachSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  margin: 60px 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const ApproachTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const ApproachCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const ApproachIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: white;
`;

const ApproachCardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ApproachCardDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const BenefitsSection = styled.div`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 16px;
  padding: 50px;
  margin: 60px 0;
  color: white;
`;

const BenefitsTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const BenefitItem = styled.div`
  text-align: center;
  padding: 20px;
`;

const BenefitIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const BenefitDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

const CTASection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
  }
`;

const mentoringServices = [
  {
    icon: '👤',
    title: 'One-on-One Mentoring',
    description: 'Personalized mentoring relationships designed to support individual growth, career development, and personal transformation.'
  },
  {
    icon: '🎯',
    title: 'Career Coaching',
    description: 'Professional career coaching to help individuals navigate career transitions, set goals, and achieve professional success.'
  },
  {
    icon: '👑',
    title: 'Leadership Development',
    description: 'Comprehensive leadership development programs to build essential leadership skills and capabilities.'
  },
  {
    icon: '🌱',
    title: 'Personal Growth Programs',
    description: 'Structured programs focused on personal development, self-awareness, and building resilience.'
  },
  {
    icon: '💼',
    title: 'Executive Coaching',
    description: 'High-level executive coaching for senior leaders to enhance performance and drive organizational success.'
  },
  {
    icon: '🤝',
    title: 'Group Mentoring',
    description: 'Peer-to-peer mentoring programs that foster collaboration, learning, and mutual support.'
  }
];

const approaches = [
  {
    icon: '🎯',
    title: 'Goal-Oriented',
    description: 'We focus on setting clear, achievable goals and developing actionable plans to reach them.'
  },
  {
    icon: '💡',
    title: 'Strengths-Based',
    description: 'Our approach leverages your existing strengths while identifying areas for growth and development.'
  },
  {
    icon: '🔄',
    title: 'Continuous Learning',
    description: 'We promote a culture of continuous learning and adaptation to changing circumstances.'
  },
  {
    icon: '🤝',
    title: 'Collaborative',
    description: 'We work together as partners in your development journey, providing support and accountability.'
  }
];

const benefits = [
  {
    icon: '📈',
    title: 'Career Advancement',
    description: 'Accelerate your career growth with strategic guidance and professional development.'
  },
  {
    icon: '🎯',
    title: 'Clear Direction',
    description: 'Gain clarity on your goals and develop a clear path forward.'
  },
  {
    icon: '💪',
    title: 'Increased Confidence',
    description: 'Build confidence and self-assurance through skill development and achievement.'
  },
  {
    icon: '🌐',
    title: 'Expanded Network',
    description: 'Access to professional networks and opportunities for growth and collaboration.'
  }
];

export default function CochingAndMentoring() {
  return (
    <MentoringContainer>
      <MentoringContent>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mentoring & Coaching
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Personalized mentoring and coaching services designed to support individual growth, career development, and personal transformation through expert guidance and proven methodologies.
          </PageSubtitle>
        </PageHeader>

        <ServicesGrid>
          {mentoringServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <ApproachSection>
          <ApproachTitle>Our Approach</ApproachTitle>
          <ApproachGrid>
            {approaches.map((approach, index) => (
              <ApproachCard
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ApproachIcon>{approach.icon}</ApproachIcon>
                <ApproachCardTitle>{approach.title}</ApproachCardTitle>
                <ApproachCardDescription>{approach.description}</ApproachCardDescription>
              </ApproachCard>
            ))}
          </ApproachGrid>
        </ApproachSection>

        <BenefitsSection>
          <BenefitsTitle>Benefits of Mentoring & Coaching</BenefitsTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitItem>
            ))}
          </BenefitsGrid>
        </BenefitsSection>

        <CTASection>
          <CTATitle>Ready to Start Your Development Journey?</CTATitle>
          <CTADescription>
            Let's discuss how our mentoring and coaching services can help you achieve your personal and professional goals.
          </CTADescription>
          <CTAButton>Schedule Consultation</CTAButton>
        </CTASection>
      </MentoringContent>
    </MentoringContainer>
  );
};



