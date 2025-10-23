import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  color: white;
  padding: 150px 0 120px;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,215,0,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 30px;
  line-height: 1.1;
  background: linear-gradient(135deg, #FFFFFF 0%, #FFD700 50%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: #000000;
  padding: 18px 36px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 18px 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }
`;

const HeroSection = () => {
    return (
        <HeroContainer>
            <HeroContent>
                <HeroTitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Invictus Solutions
                </HeroTitle>

                <HeroSubtitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Professional consulting, training, and development services that transform
                    individuals and organizations through strategic guidance and expert support.
                </HeroSubtitle>

                <ButtonGroup
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <PrimaryButton to="/book-consultation">
                        Book Consultation
                        <span>→</span>
                    </PrimaryButton>
                    <SecondaryButton to="/services">
                        Our Services
                        <span>→</span>
                    </SecondaryButton>
                </ButtonGroup>
            </HeroContent>
        </HeroContainer>
    );
};

export default HeroSection;
