import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ConsultationContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const ConsultationContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const InfoDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ContactInfo = styled.div`
  margin-bottom: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #666;
`;

const ContactIcon = styled.span`
  margin-right: 10px;
  color: #FFD700;
`;

const ClientNote = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #FFD700;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
`;

const ClientNoteTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ClientNoteText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ClientLink = styled.a`
  color: #FFD700;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #B8860B;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FFD700;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FFD700;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FFD700;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  margin-top: 20px;
`;

export default function ConsultancyAndCompliance() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConsultationContainer>
      <ConsultationContent>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Book a Consultation
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Simple, quick and designed around your needs
          </PageSubtitle>
        </PageHeader>

        <ContentGrid>
          <InfoSection>
            <InfoTitle>Let's Get Started</InfoTitle>
            <InfoDescription>
              Use the form below to book a session with our team. Whether you're scheduling a workshop, consultation or one-on-one support, choose a time that works for you and we'll take care of the rest.
            </InfoDescription>
            <InfoDescription>
              If you have questions or need help with your booking, feel free to contact us.
            </InfoDescription>

            <ContactInfo>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                Sydney, Australia
              </ContactItem>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                hello@invictussolutions.com.au
              </ContactItem>
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                1300 INVICTUS
              </ContactItem>
            </ContactInfo>

            <ClientNote>
              <ClientNoteTitle>Already a Client?</ClientNoteTitle>
              <ClientNoteText>
                If you've booked with us before and need to reschedule, cancel, or update your details, click here to access the Customer Panel.
              </ClientNoteText>
              <ClientLink href="#">Access Customer Panel</ClientLink>
            </ClientNote>
          </InfoSection>

          <FormSection>
            <FormTitle>Book Your Session</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="business-consulting">Business Consulting</option>
                  <option value="training-programs">Training Programs</option>
                  <option value="mentoring-coaching">Mentoring & Coaching</option>
                  <option value="counselling">Counselling</option>
                  <option value="first-aid-training">First Aid Training</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                  <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Additional Information</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about what you're looking for..."
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Book Consultation'}
              </SubmitButton>

              {submitStatus === 'success' && (
                <SuccessMessage>
                  Thank you! Your consultation request has been submitted successfully. We'll contact you within 24 hours to confirm your appointment.
                </SuccessMessage>
              )}

              {submitStatus === 'error' && (
                <ErrorMessage>
                  Sorry, there was an error submitting your request. Please try again or contact us directly.
                </ErrorMessage>
              )}
            </Form>
          </FormSection>
        </ContentGrid>
      </ConsultationContent>
    </ConsultationContainer>
  );
};
