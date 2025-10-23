import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BlogContainer = styled.div`
  padding-top: 80px;
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

const BlogContent = styled.div`
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

export default function Blogs() {
  return (
    <BlogContainer>
      <HeaderSection>
        <HeaderContent>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Blog
          </PageTitle>
          <Breadcrumb>
            <a href="/">HOME</a> &gt; <span>BLOG</span>
          </Breadcrumb>
        </HeaderContent>
      </HeaderSection>

      <BlogContent>
        <p>Blog page content will be implemented here.</p>
      </BlogContent>
    </BlogContainer>
  );
};

