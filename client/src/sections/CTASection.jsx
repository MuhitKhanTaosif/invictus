import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CTAContainer = styled.section`
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  color: #FFD700;
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 40px;
  line-height: 1.6;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: #FFD700;
  color: #000000;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #B8860B;
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: #FFD700;
  padding: 16px 32px;
  border: 2px solid #FFD700;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #FFD700;
    color: #000000;
    transform: translateY(-2px);
  }
`;

const CTASection = () => {
    return (
        <CTAContainer>
            <CTAContent>
                <CTATitle
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Let's Make it Happen
                </CTATitle>

                <CTASubtitle
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Whether you're ready to book a session or just want to have a conversation we're here to help.
                </CTASubtitle>

                <ButtonGroup
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <PrimaryButton to="/contact">
                        Book a Consult
                        <span>📅</span>
                    </PrimaryButton>
                    <SecondaryButton to="/contact">
                        Contact Us
                        <span>📞</span>
                    </SecondaryButton>
                </ButtonGroup>
            </CTAContent>
        </CTAContainer>
    );
};

export default CTASection;
