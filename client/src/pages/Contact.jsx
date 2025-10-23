import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-2px) translateX(1px); }
    50% { transform: translateY(1px) translateX(-1px); }
    75% { transform: translateY(-1px) translateX(2px); }
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

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const InfoSection = styled.div`
  padding-right: 20px;
`;

const SectionLabel = styled.div`
  font-size: 0.9rem;
  color: #FFD700;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
`;

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
  line-height: 1.2;
`;

const SubHeading = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
`;

const NormalText = styled.p`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const GetInTouchSection = styled.div`
  margin-top: 50px;
  padding: 40px 30px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 165, 0, 0.08) 100%);
  border-radius: 20px;
  border: 2px solid rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 10%, rgba(255, 215, 0, 0.1) 0%, transparent 30%),
      radial-gradient(circle at 90% 90%, rgba(255, 165, 0, 0.08) 0%, transparent 30%);
    z-index: 0;
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
        transparent 15px,
        rgba(255, 215, 0, 0.03) 15px,
        rgba(255, 215, 0, 0.03) 16px,
        transparent 16px,
        transparent 30px
      );
    z-index: 1;
    animation: shimmer 6s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.5; transform: translateX(0px); }
    50% { opacity: 0.8; transform: translateX(5px); }
  }
`;

const GetInTouchTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  text-align: center;
  text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: 2px;
  }
`;

const Blockquote = styled.blockquote`
  font-size: 1.2rem;
  font-style: italic;
  color: #1a1a1a;
  line-height: 1.6;
  margin: 30px 0;
  padding: 20px 0;
  border-left: 4px solid #FFD700;
  padding-left: 20px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 8px;
  font-family: 'Georgia', serif;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
  z-index: 2;
`;

const ContactItem = styled.div`
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.5);
    background: rgba(255, 255, 255, 0.95);
    
    &::before {
      left: 100%;
    }
  }
`;

const ContactLabel = styled.div`
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(255, 215, 0, 0.2);
  letter-spacing: 0.5px;
`;

const ContactValue = styled.div`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const FormSection = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 24px;
  padding: 60px;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.15),
    0 15px 40px rgba(0, 0, 0, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: visible;
  border: 3px solid transparent;
  background-clip: padding-box;
  transform: perspective(1000px) rotateX(2deg);
  transition: all 0.4s ease;
  
  &:hover {
    transform: perspective(1000px) rotateX(0deg) translateY(-5px);
    box-shadow: 
      0 35px 100px rgba(0, 0, 0, 0.2),
      0 20px 50px rgba(0, 0, 0, 0.15),
      0 8px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #FFD700, #FFA500, #FFD700);
    border-radius: 24px;
    padding: 3px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30px;
    right: 30px;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.12));
    border-radius: 50%;
    z-index: 0;
    animation: pulse 4s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
  }
`;

const RotatingOrb = styled.div`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.5))'};
  top: ${props => props.top || '10%'};
  left: ${props => props.left || '5%'};
  z-index: -2;
  animation: ${props => props.animation || 'orbit1'} ${props => props.duration || '8s'} linear infinite;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  @keyframes orbit1 {
    0% { 
      transform: rotateY(0deg) rotateX(0deg) translateZ(0px);
    }
    25% { 
      transform: rotateY(90deg) rotateX(45deg) translateZ(20px);
    }
    50% { 
      transform: rotateY(180deg) rotateX(0deg) translateZ(0px);
    }
    75% { 
      transform: rotateY(270deg) rotateX(-45deg) translateZ(-20px);
    }
    100% { 
      transform: rotateY(360deg) rotateX(0deg) translateZ(0px);
    }
  }
  
  @keyframes orbit2 {
    0% { 
      transform: rotateY(0deg) rotateX(45deg) translateZ(15px);
    }
    25% { 
      transform: rotateY(90deg) rotateX(0deg) translateZ(0px);
    }
    50% { 
      transform: rotateY(180deg) rotateX(-45deg) translateZ(-15px);
    }
    75% { 
      transform: rotateY(270deg) rotateX(0deg) translateZ(0px);
    }
    100% { 
      transform: rotateY(360deg) rotateX(45deg) translateZ(15px);
    }
  }
  
  @keyframes orbit3 {
    0% { 
      transform: rotateY(45deg) rotateX(0deg) translateZ(10px);
    }
    25% { 
      transform: rotateY(135deg) rotateX(90deg) translateZ(25px);
    }
    50% { 
      transform: rotateY(225deg) rotateX(0deg) translateZ(10px);
    }
    75% { 
      transform: rotateY(315deg) rotateX(-90deg) translateZ(-25px);
    }
    100% { 
      transform: rotateY(405deg) rotateX(0deg) translateZ(10px);
    }
  }
  
  @keyframes orbit4 {
    0% { 
      transform: rotateY(0deg) rotateX(60deg) translateZ(30px);
    }
    33% { 
      transform: rotateY(120deg) rotateX(0deg) translateZ(0px);
    }
    66% { 
      transform: rotateY(240deg) rotateX(-60deg) translateZ(-30px);
    }
    100% { 
      transform: rotateY(360deg) rotateX(60deg) translateZ(30px);
    }
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.3))'};
  top: ${props => props.top || '20%'};
  right: ${props => props.right || '10%'};
  z-index: -1;
  animation: ${props => props.animation || 'float1'} ${props => props.duration || '6s'} ease-in-out infinite;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  
  @keyframes float1 {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) rotateZ(0deg);
      opacity: 0.7;
    }
    50% { 
      transform: translateY(-20px) translateX(10px) rotateZ(180deg);
      opacity: 1;
    }
  }
  
  @keyframes float2 {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) rotateZ(0deg);
      opacity: 0.5;
    }
    50% { 
      transform: translateY(15px) translateX(-15px) rotateZ(-180deg);
      opacity: 0.9;
    }
  }
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: 2px;
  }
`;

const FormNote = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
  z-index: 1;
`;

const InputGroup = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    transition: width 0.3s ease;
  }
  
  &:focus-within::before {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 0 18px 0;
  border: none;
  border-bottom: 2px solid #e9ecef;
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  color: #1a1a1a;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    border-bottom-color: #FFD700;
    outline: none;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
  }
  
  &::placeholder {
    color: #666;
    transition: color 0.3s ease;
    font-weight: 500;
  }
  
  &:focus::placeholder {
    color: #FFD700;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 18px 15px;
  border: none;
  border-bottom: 2px solid #e9ecef;
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  color: #1a1a1a;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    border-bottom-color: #FFD700;
    outline: none;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
  }
  
  &::placeholder {
    color: #666;
    transition: color 0.3s ease;
    font-weight: 500;
  }
  
  &:focus::placeholder {
    color: #FFD700;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 18px 15px;
  border: none;
  border-bottom: 2px solid #e9ecef;
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  color: #1a1a1a;
  font-family: inherit;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    border-bottom-color: #FFD700;
    outline: none;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
  }
  
  option {
    color: #1a1a1a;
    background: white;
    padding: 10px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #1a1a1a;
  border: none;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const MapSection = styled.div`
  margin-top: 80px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 0;
  position: relative;
  
  iframe {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
    
    &:hover {
      filter: grayscale(0%);
    }
  }
`;


const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border: none;
  position: relative;
  margin: 0;
  padding: 0;
  
  iframe {
    border-radius: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: '',
        comment: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', mobile: '', service: '', comment: '' });
    };

    return (
        <ContactContainer>
            <HeaderSection>
                <TextureLayer />
                <AnimatedSquares />
                <HeaderContent>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <PageTitle>Contact Us</PageTitle>
                        <Breadcrumb>
                            <a href="/">HOME</a> &gt; <span>CONTACT</span>
                        </Breadcrumb>
                    </motion.div>
                </HeaderContent>
            </HeaderSection>

            <MainContent>
                <ContentGrid>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <InfoSection>
                            <SectionLabel>/ WE'RE HERE TO HELP /</SectionLabel>
                            <MainHeading>Your NEXT BIG STEP starts with a conversation.</MainHeading>
                            <NormalText>We believe powerful change begins with meaningful dialogue.</NormalText>

                            <Blockquote>
                                Strength isn't about never falling—it's about rising, stronger and wiser, every time you do. Let's build your next success story together.
                            </Blockquote>

                            <GetInTouchSection>
                                <GetInTouchTitle>Get In Touch</GetInTouchTitle>
                                <ContactDetails>
                                    <ContactItem>
                                        <ContactLabel>📍 Sydney, Australia</ContactLabel>
                                    </ContactItem>
                                    <ContactItem>
                                        <ContactLabel>📞 0490 132 692</ContactLabel>
                                    </ContactItem>
                                    <ContactItem>
                                        <ContactLabel>📧 Invictus.consultants@outlook.com</ContactLabel>
                                    </ContactItem>
                                    <ContactItem>
                                        <ContactLabel>Business Hours: Mon-Fri 9AM-6PM</ContactLabel>
                                    </ContactItem>
                                </ContactDetails>
                            </GetInTouchSection>
                        </InfoSection>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FormSection>
                            <RotatingOrb
                                size="80px"
                                top="5%"
                                left="3%"
                                animation="orbit1"
                                duration="10s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.6))"
                            />
                            <RotatingOrb
                                size="60px"
                                top="70%"
                                right="8%"
                                animation="orbit2"
                                duration="12s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.5))"
                            />
                            <RotatingOrb
                                size="50px"
                                top="30%"
                                left="85%"
                                animation="orbit3"
                                duration="8s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.4))"
                            />
                            <FloatingElement
                                size="35px"
                                top="15%"
                                right="15%"
                                animation="float1"
                                duration="7s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.4))"
                            />
                            <FloatingElement
                                size="45px"
                                top="60%"
                                left="10%"
                                animation="float2"
                                duration="9s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(255, 165, 0, 0.35))"
                            />
                            <FloatingElement
                                size="30px"
                                top="80%"
                                right="25%"
                                animation="float1"
                                duration="5s"
                                gradient="linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.3))"
                            />
                            <FormTitle>Drop Us a Message</FormTitle>
                            <FormNote>Your email address will not be published. Required fields are marked *</FormNote>

                            <Form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Name *"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile *"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Which Service (Select One) *</option>
                                        <option value="General Enquiry">General Enquiry</option>
                                        <option value="Counselling">Counselling</option>
                                        <option value="Consulting">Consulting</option>
                                        <option value="Mentoring">Mentoring</option>
                                        <option value="Workshop">Workshop</option>
                                    </Select>
                                </InputGroup>

                                <InputGroup>
                                    <TextArea
                                        name="comment"
                                        placeholder="Your comment"
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                                <SubmitButton type="submit">GET IN TOUCH</SubmitButton>
                            </Form>
                        </FormSection>
                    </motion.div>
                </ContentGrid>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <MapSection>
                        <MapContainer>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d151.2093!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae665e892fdd%3A0x3133f8d75a1ac251!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Sydney Location Map"
                            ></iframe>
                        </MapContainer>
                    </MapSection>
                </motion.div>
            </MainContent>
        </ContactContainer>
    );
};

