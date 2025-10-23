import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CounsellingContainer = styled.div`
  padding-top: 80px; /* Account for fixed header */
  background: #f8f9fa;
  min-height: 100vh;
`;

const CounsellingContent = styled.div`
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

const SpecialtiesSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  margin: 60px 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const SpecialtiesTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const SpecialtiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const SpecialtyCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const SpecialtyIcon = styled.div`
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

const SpecialtyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const SpecialtyDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ApproachSection = styled.div`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  border-radius: 16px;
  padding: 50px;
  margin: 60px 0;
  color: white;
`;

const ApproachTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const ApproachItem = styled.div`
  text-align: center;
  padding: 20px;
`;

const ApproachIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const ApproachItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ApproachItemDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

const ConfidentialitySection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  margin: 60px 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ConfidentialityTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const ConfidentialityDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
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

const counsellingServices = [
    {
        icon: '👤',
        title: 'Individual Counselling',
        description: 'One-on-one counselling sessions tailored to address personal challenges, mental health concerns, and life transitions.'
    },
    {
        icon: '👨‍👩‍👧‍👦',
        title: 'Family Therapy',
        description: 'Family-focused therapy to improve communication, resolve conflicts, and strengthen family relationships.'
    },
    {
        icon: '🧠',
        title: 'Mental Health Support',
        description: 'Comprehensive mental health support for anxiety, depression, stress management, and emotional well-being.'
    },
    {
        icon: '🩹',
        title: 'Trauma Counselling',
        description: 'Specialized trauma-informed counselling to help individuals process and heal from traumatic experiences.'
    },
    {
        icon: '🚫',
        title: 'Addiction Recovery',
        description: 'Support and counselling for individuals and families dealing with addiction and substance abuse issues.'
    },
    {
        icon: '💑',
        title: 'Couples Counselling',
        description: 'Relationship counselling to help couples improve communication, resolve conflicts, and strengthen their bond.'
    }
];

const specialties = [
    {
        icon: '😰',
        title: 'Anxiety & Stress',
        description: 'Evidence-based approaches to manage anxiety, stress, and panic disorders.'
    },
    {
        icon: '😔',
        title: 'Depression',
        description: 'Comprehensive support for individuals experiencing depression and mood disorders.'
    },
    {
        icon: '💔',
        title: 'Grief & Loss',
        description: 'Support through the grieving process and help with loss and bereavement.'
    },
    {
        icon: '🎯',
        title: 'Life Transitions',
        description: 'Guidance through major life changes, career transitions, and personal growth.'
    },
    {
        icon: '👶',
        title: 'Parenting Support',
        description: 'Counselling and support for parenting challenges and family dynamics.'
    },
    {
        icon: '🎓',
        title: 'Academic Stress',
        description: 'Support for students dealing with academic pressure, performance anxiety, and educational challenges.'
    }
];

const approaches = [
    {
        icon: '🤝',
        title: 'Client-Centered',
        description: 'We prioritize your needs and create a safe, non-judgmental space for healing and growth.'
    },
    {
        icon: '🔬',
        title: 'Evidence-Based',
        description: 'Our approaches are grounded in research and proven therapeutic methodologies.'
    },
    {
        icon: '🎯',
        title: 'Goal-Oriented',
        description: 'We work together to set clear, achievable goals and track progress throughout your journey.'
    },
    {
        icon: '💪',
        title: 'Strengths-Based',
        description: 'We focus on building upon your existing strengths while addressing areas for growth.'
    }
];

export default function CounsellingAndWellbeingSupport() {
    return (
        <CounsellingContainer>
            <CounsellingContent>
                <PageHeader>
                    <PageTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Counselling Services
                    </PageTitle>
                    <PageSubtitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Professional counselling services providing confidential support for mental health, personal challenges, and emotional well-being through compassionate, evidence-based care.
                    </PageSubtitle>
                </PageHeader>

                <ServicesGrid>
                    {counsellingServices.map((service, index) => (
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

                <SpecialtiesSection>
                    <SpecialtiesTitle>Areas of Specialization</SpecialtiesTitle>
                    <SpecialtiesGrid>
                        {specialties.map((specialty, index) => (
                            <SpecialtyCard
                                key={specialty.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <SpecialtyIcon>{specialty.icon}</SpecialtyIcon>
                                <SpecialtyTitle>{specialty.title}</SpecialtyTitle>
                                <SpecialtyDescription>{specialty.description}</SpecialtyDescription>
                            </SpecialtyCard>
                        ))}
                    </SpecialtiesGrid>
                </SpecialtiesSection>

                <ApproachSection>
                    <ApproachTitle>Our Therapeutic Approach</ApproachTitle>
                    <ApproachGrid>
                        {approaches.map((approach, index) => (
                            <ApproachItem
                                key={approach.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ApproachIcon>{approach.icon}</ApproachIcon>
                                <ApproachItemTitle>{approach.title}</ApproachItemTitle>
                                <ApproachItemDescription>{approach.description}</ApproachItemDescription>
                            </ApproachItem>
                        ))}
                    </ApproachGrid>
                </ApproachSection>

                <ConfidentialitySection>
                    <ConfidentialityTitle>Confidentiality & Privacy</ConfidentialityTitle>
                    <ConfidentialityDescription>
                        Your privacy and confidentiality are our top priorities. All counselling sessions are conducted in a safe, secure environment, and your personal information is protected according to professional ethical standards and legal requirements.
                    </ConfidentialityDescription>
                </ConfidentialitySection>

                <CTASection>
                    <CTATitle>Ready to Begin Your Healing Journey?</CTATitle>
                    <CTADescription>
                        Take the first step towards better mental health and emotional well-being. Our experienced counsellors are here to support you.
                    </CTADescription>
                    <CTAButton>Schedule Consultation</CTAButton>
                </CTASection>
            </CounsellingContent>
        </CounsellingContainer>
    );
};



