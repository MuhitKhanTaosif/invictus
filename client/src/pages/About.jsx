import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Main Container
const AboutContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: #FFFFFF;
`;

// Header Section - Similar to Contact Page
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

const TextureLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    /* Detailed square grid pattern */
    linear-gradient(90deg, transparent 0px, rgba(0, 0, 0, 0.02) 1px, transparent 2px),
    linear-gradient(0deg, transparent 0px, rgba(0, 0, 0, 0.02) 1px, transparent 2px),
    /* Larger square pattern */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 20px,
      rgba(0, 0, 0, 0.015) 20px,
      rgba(0, 0, 0, 0.015) 21px,
      transparent 21px,
      transparent 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 20px,
      rgba(0, 0, 0, 0.015) 20px,
      rgba(0, 0, 0, 0.015) 21px,
      transparent 21px,
      transparent 40px
    ),
    /* Diagonal square patterns */
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 15px,
      rgba(0, 0, 0, 0.01) 15px,
      rgba(0, 0, 0, 0.01) 16px,
      transparent 16px,
      transparent 30px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 15px,
      rgba(0, 0, 0, 0.01) 15px,
      rgba(0, 0, 0, 0.01) 16px,
      transparent 16px,
      transparent 30px
    ),
    /* Radial patterns for depth */
    radial-gradient(circle at 10% 10%, rgba(0, 0, 0, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 90% 90%, rgba(0, 0, 0, 0.03) 0%, transparent 25%),
    radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.015) 0%, transparent 50%);
  z-index: 3;
  pointer-events: none;
  animation: textureMove 12s ease-in-out infinite;
  
  @keyframes textureMove {
    0%, 100% { 
      transform: translateX(0px) translateY(0px) rotate(0deg);
      opacity: 1;
    }
    25% { 
      transform: translateX(2px) translateY(1px) rotate(0.5deg);
      opacity: 0.8;
    }
    50% { 
      transform: translateX(-1px) translateY(2px) rotate(-0.5deg);
      opacity: 0.9;
    }
    75% { 
      transform: translateX(1px) translateY(-1px) rotate(0.3deg);
      opacity: 0.85;
    }
  }
`;

const AnimatedSquares = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    /* Moving square grid */
    repeating-conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      rgba(0, 0, 0, 0.008) 90deg,
      transparent 90deg,
      transparent 360deg
    ),
    /* Hexagonal-like square pattern */
    repeating-linear-gradient(
      30deg,
      transparent,
      transparent 25px,
      rgba(0, 0, 0, 0.006) 25px,
      rgba(0, 0, 0, 0.006) 26px,
      transparent 26px,
      transparent 50px
    ),
    repeating-linear-gradient(
      60deg,
      transparent,
      transparent 25px,
      rgba(0, 0, 0, 0.006) 25px,
      rgba(0, 0, 0, 0.006) 26px,
      transparent 26px,
      transparent 50px
    ),
    repeating-linear-gradient(
      120deg,
      transparent,
      transparent 25px,
      rgba(0, 0, 0, 0.006) 25px,
      rgba(0, 0, 0, 0.006) 26px,
      transparent 26px,
      transparent 50px
    );
  z-index: 2.5;
  pointer-events: none;
  animation: squareFloat 15s linear infinite;
  
  @keyframes squareFloat {
    0% { 
      transform: translateX(0px) translateY(0px) rotate(0deg);
    }
    33% { 
      transform: translateX(5px) translateY(-3px) rotate(1deg);
    }
    66% { 
      transform: translateX(-3px) translateY(4px) rotate(-1deg);
    }
    100% { 
      transform: translateX(0px) translateY(0px) rotate(0deg);
    }
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 4;
`;

const PageTitle = styled.h1`
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
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
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

// Hero Section - Main About Content
const HeroSection = styled.div`
  background: #FFFFFF;
  padding: 100px 0;
  position: relative;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 30px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 40px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const HeroDescription = styled.div`
  font-size: 1.2rem;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 30px;
  
  p {
    margin-bottom: 20px;
  }
`;

// Philosophy Section
const PhilosophySection = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.02) 0%, 
    rgba(255, 255, 255, 1) 50%, 
    rgba(255, 215, 0, 0.02) 100%);
  padding: 100px 0;
`;

const PhilosophyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PhilosophyContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const PhilosophyTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PhilosophyText = styled.p`
  font-size: 1.2rem;
  color: #666666;
  line-height: 1.8;
`;

// What We Do Section
const WhatWeDoSection = styled.div`
  background: #FFFFFF;
  padding: 100px 0;
`;

const WhatWeDoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const WhatWeDoHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const WhatWeDoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ServiceCard = styled.div`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(255, 215, 0, 0.2);
  }
`;

const ServiceNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #666666;
  line-height: 1.7;
`;

// Why Invictus Section
const WhyInvictusSection = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.03) 0%, 
    rgba(255, 255, 255, 1) 50%, 
    rgba(255, 215, 0, 0.03) 100%);
  padding: 100px 0;
`;

const WhyInvictusContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const WhyInvictusHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const WhyInvictusTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FeatureCard = styled.div`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(255, 215, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666666;
  line-height: 1.7;
`;

// Vision Mission Section
const VisionMissionSection = styled.div`
  background: #FFFFFF;
  padding: 100px 0;
`;

const VisionMissionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const VisionMissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const VisionMissionCard = styled.div`
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.05) 0%, 
    rgba(255, 255, 255, 1) 50%, 
    rgba(255, 215, 0, 0.05) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
`;

const VisionMissionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const VisionMissionText = styled.p`
  font-size: 1.1rem;
  color: #666666;
  line-height: 1.7;
`;

// Statistics Section - Like Variety theme
const StatsSection = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const StatsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const StatsSubtitle = styled.p`
  font-size: 1.2rem;
  color: #FFD700;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const StatNumber = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 15px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: #FFFFFF;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Services Solutions Section
const ServicesSolutionsSection = styled.div`
  background: #FFFFFF;
  padding: 100px 0;
`;

const ServicesSolutionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServicesSolutionsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const ServicesSolutionsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ServicesSolutionsSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesSolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ServiceSolutionCard = styled.div`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(255, 215, 0, 0.2);
  }
`;

const ServiceSolutionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const ServiceSolutionDescription = styled.p`
  font-size: 1rem;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 20px;
`;

const ServiceSolutionLink = styled.a`
  color: #FFD700;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

// What We Offer Section
const WhatWeOfferSection = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.02) 0%, 
    rgba(255, 255, 255, 1) 50%, 
    rgba(255, 215, 0, 0.02) 100%);
  padding: 100px 0;
`;

const WhatWeOfferContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const WhatWeOfferHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const WhatWeOfferTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const WhatWeOfferSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const WhatWeOfferAuthor = styled.div`
  font-size: 1rem;
  color: #FFD700;
  font-weight: 600;
  margin-top: 20px;
`;

const WhatWeOfferList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const WhatWeOfferItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
`;

const WhatWeOfferNumber = styled.div`
  background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
  color: #FFFFFF;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const WhatWeOfferText = styled.div`
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
`;

// Testimonials Section
const TestimonialsSection = styled.div`
  background: #FFFFFF;
  padding: 100px 0;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const TestimonialsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const TestimonialsSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const TestimonialCard = styled.div`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(255, 215, 0, 0.2);
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 30px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TestimonialAuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 1.2rem;
`;

const TestimonialAuthorInfo = styled.div`
  flex: 1;
`;

const TestimonialAuthorName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 5px;
`;

const TestimonialAuthorTitle = styled.div`
  font-size: 0.9rem;
  color: #666666;
`;

// Partnership Section
const PartnershipSection = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.02) 0%, 
    rgba(255, 255, 255, 1) 50%, 
    rgba(255, 215, 0, 0.02) 100%);
  padding: 100px 0;
`;

const PartnershipContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PartnershipContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const PartnershipTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PartnershipText = styled.p`
  font-size: 1.2rem;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 20px;
`;


export default function About() {
  const stats = [
    { number: "10+", label: "Years" },
    { number: "50+", label: "Employees" },
    { number: "15+", label: "Countries" },
    { number: "25+", label: "Offices" }
  ];

  const serviceSolutions = [
    {
      title: "Strategic Business Consulting",
      description: "We work closely with business owners and management teams to identify challenges, streamline operations, and create growth strategies that deliver measurable results.",
      link: "Learn More"
    },
    {
      title: "Leadership Development Programs",
      description: "Our comprehensive leadership coaching helps individuals build confidence, emotional intelligence, and the ability to lead with purpose and integrity.",
      link: "Learn More"
    },
    {
      title: "Professional Training Solutions",
      description: "From first aid and emergency response to communication and leadership skills, we ensure every participant gains practical knowledge they can apply immediately.",
      link: "Learn More"
    },
    {
      title: "Team Development Services",
      description: "We provide tailored programs designed to strengthen team dynamics, boost morale, and promote continuous improvement across all organizational levels.",
      link: "Learn More"
    }
  ];

  const whatWeOffer = [
    "Strategic Business Consulting",
    "Leadership Development Programs",
    "Professional Training Solutions",
    "Team Development Services",
    "First Aid & Safety Training",
    "Communication Skills Enhancement",
    "Organizational Transformation",
    "Performance Improvement"
  ];

  const testimonials = [
    {
      text: "Invictus Consultants transformed our leadership approach completely. Their practical training methods and strategic insights have been invaluable to our organization's growth.",
      author: "Sarah Johnson",
      title: "CEO, Tech Innovations Ltd"
    },
    {
      text: "The team development programs exceeded our expectations. Our employees are more engaged, collaborative, and productive than ever before.",
      author: "Michael Chen",
      title: "HR Director, Global Solutions Inc"
    },
    {
      text: "Their first aid training was comprehensive and practical. Every participant felt confident and prepared to handle emergency situations in the workplace.",
      author: "Emma Rodriguez",
      title: "Safety Manager, Manufacturing Corp"
    }
  ];

  return (
    <AboutContainer>
      {/* Header Section */}
      <HeaderSection>
        <TextureLayer />
        <AnimatedSquares />
        <HeaderContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PageTitle>About Us</PageTitle>
            <Breadcrumb>
              <a href="/">HOME</a> &gt; <span>ABOUT US</span>
            </Breadcrumb>
          </motion.div>
        </HeaderContent>
      </HeaderSection>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <HeroTitle>About Us</HeroTitle>
              <HeroSubtitle>Empowering Growth Through Leadership, Strategy, and Practical Training</HeroSubtitle>
              <HeroDescription>
                <p>
                  We believe that true success is built on knowledge, leadership, and the confidence to act. Our mission is to empower individuals, teams, and organisations through expert consulting, mentorship, leadership development, and specialised training programs, including first aid and workplace safety.
                </p>
                <p>
                  With years of professional experience across industries, Invictus Consultants combines strategic insight with hands-on expertise to deliver tailored solutions that help clients unlock their full potential—both professionally and personally.
                </p>
              </HeroDescription>
            </HeroContent>
          </HeroContainer>
        </HeroSection>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <StatsSection>
          <StatsContainer>
            <StatsHeader>
              <StatsTitle>Consulting services</StatsTitle>
              <StatsSubtitle>Empowering growth through leadership, strategy, and practical training</StatsSubtitle>
            </StatsHeader>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard key={index}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>
          </StatsContainer>
        </StatsSection>
      </motion.div>

      {/* Services Solutions Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ServicesSolutionsSection>
          <ServicesSolutionsContainer>
            <ServicesSolutionsHeader>
              <ServicesSolutionsTitle>Consulting solutions</ServicesSolutionsTitle>
              <ServicesSolutionsSubtitle>Where uncertainties end, expertise begins</ServicesSolutionsSubtitle>
            </ServicesSolutionsHeader>
            <ServicesSolutionsGrid>
              {serviceSolutions.map((service, index) => (
                <ServiceSolutionCard key={index}>
                  <ServiceSolutionTitle>{service.title}</ServiceSolutionTitle>
                  <ServiceSolutionDescription>{service.description}</ServiceSolutionDescription>
                  <ServiceSolutionLink href="#">{service.link}</ServiceSolutionLink>
                </ServiceSolutionCard>
              ))}
            </ServicesSolutionsGrid>
          </ServicesSolutionsContainer>
        </ServicesSolutionsSection>
      </motion.div>

      {/* What We Offer Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <WhatWeOfferSection>
          <WhatWeOfferContainer>
            <WhatWeOfferHeader>
              <WhatWeOfferTitle>What we offer</WhatWeOfferTitle>
              <WhatWeOfferSubtitle>Guarding your ambitions, fortifying your legacy: our consulting - a shield for your peace of mind</WhatWeOfferSubtitle>
              <WhatWeOfferAuthor>Peter Bowman - Creative Director</WhatWeOfferAuthor>
            </WhatWeOfferHeader>
            <WhatWeOfferList>
              {whatWeOffer.map((item, index) => (
                <WhatWeOfferItem key={index}>
                  <WhatWeOfferNumber>{String(index + 1).padStart(2, '0')}</WhatWeOfferNumber>
                  <WhatWeOfferText>{item}</WhatWeOfferText>
                </WhatWeOfferItem>
              ))}
            </WhatWeOfferList>
          </WhatWeOfferContainer>
        </WhatWeOfferSection>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TestimonialsSection>
          <TestimonialsContainer>
            <TestimonialsHeader>
              <TestimonialsTitle>What they say</TestimonialsTitle>
              <TestimonialsSubtitle>Stories told by those we've advised</TestimonialsSubtitle>
            </TestimonialsHeader>
            <TestimonialsGrid>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <TestimonialText>"{testimonial.text}"</TestimonialText>
                  <TestimonialAuthor>
                    <TestimonialAuthorImage>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </TestimonialAuthorImage>
                    <TestimonialAuthorInfo>
                      <TestimonialAuthorName>{testimonial.author}</TestimonialAuthorName>
                      <TestimonialAuthorTitle>{testimonial.title}</TestimonialAuthorTitle>
                    </TestimonialAuthorInfo>
                  </TestimonialAuthor>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </TestimonialsContainer>
        </TestimonialsSection>
      </motion.div>

      {/* Partnership Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PartnershipSection>
          <PartnershipContainer>
            <PartnershipContent>
              <PartnershipTitle>Absolute excellence for your business</PartnershipTitle>
              <PartnershipText>
                Invictus Consultants is more than a consultancy—it's a partnership built on trust, expertise, and shared goals. Our collaboration with leading development and marketing professionals ensures we provide our clients with a comprehensive service ecosystem, from business strategy to digital presence and beyond.
              </PartnershipText>
              <PartnershipText>
                We are committed to helping you and your organisation achieve excellence—today and for the future.
              </PartnershipText>
            </PartnershipContent>
          </PartnershipContainer>
        </PartnershipSection>
      </motion.div>
    </AboutContainer>
  );
};
