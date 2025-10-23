import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #000000;
  color: #FFD700;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #FFD700;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #FFD700;
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 10px;
    color: #bdc3c7;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: #FFD700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #B8860B;
    color: #FFFFFF;
    transform: translateY(-2px);
  }
`;

const Newsletter = styled.div`
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #34495e;
    border-radius: 6px;
    background: #34495e;
    color: white;
    margin-bottom: 10px;

    &::placeholder {
      color: #bdc3c7;
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background: #FFD700;
    color: #000000;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #B8860B;
      color: #FFFFFF;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333333;
  padding-top: 20px;
  text-align: center;
  color: #999999;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Invictus Solutions</h3>
          <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
            Tailored programs, mentoring, and strategic support that uplift the Self,
            Community and Ummah. We deliver practical, purpose-driven services that
            support individuals, schools, organisations, and communities.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
            <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">💼</SocialLink>
            <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Navigation</h3>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/training-programs">Training Programs</FooterLink>
            <FooterLink to="/blog">Blogs</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <FooterLinks>
            <FooterLink to="/services/business-consulting">Business Consulting</FooterLink>
            <FooterLink to="/training-programs">Training Programs</FooterLink>
            <FooterLink to="/services/mentoring-coaching">Mentoring & Coaching</FooterLink>
            <FooterLink to="/services/counselling">Counselling</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <p>📍 Sydney, Australia</p>
            <p>📧 hello@invictussolutions.com.au</p>
            <p>📞 1300 INVICTUS</p>
          </ContactInfo>

          <Newsletter>
            <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>
              Subscribe to Invictus Solutions
            </h4>
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </Newsletter>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              © {currentYear} Invictus Solutions. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <FooterLink to="/privacy" style={{ fontSize: '0.9rem' }}>Privacy Policy</FooterLink>
              <FooterLink to="/terms" style={{ fontSize: '0.9rem' }}>Terms of Service</FooterLink>
            </div>
          </div>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};
