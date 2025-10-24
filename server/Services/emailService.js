const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
const sendContactFormEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Invictus Consultants" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to admin
      subject: 'New Contact Form Submission - Invictus Consultants',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #d1ecf1; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.logEmail('info', 'Contact form email sent successfully', { email: formData.email });
    
  } catch (error) {
    logger.logEmail('error', 'Failed to send contact form email', { error: error.message, email: formData.email });
    throw error;
  }
};

// Send free quote email
const sendFreeQuoteEmail = async (formData, categories = [], courses = []) => {
  try {
    const transporter = createTransporter();
    
    // Format selected categories and courses
    const selectedCategoriesText = formData.selectedCategories && formData.selectedCategories.length > 0 
      ? formData.selectedCategories.join(', ') 
      : 'None selected';
    
    const selectedCoursesText = formData.selectedCourses && formData.selectedCourses.length > 0 
      ? formData.selectedCourses.join(', ') 
      : 'None selected';

    const mailOptions = {
      from: `"Invictus Consultants" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to admin
      subject: 'New Free Quote Request - Invictus Consultants',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Free Quote Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>State:</strong> ${formData.state || 'Not specified'}</p>
            <p><strong>Preferred Contact:</strong> ${formData.preferredContact || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Interest Areas</h3>
            <p><strong>Selected Categories:</strong> ${selectedCategoriesText}</p>
            <p><strong>Selected Courses:</strong> ${selectedCoursesText}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Experience & Goals</h3>
            <p><strong>Experience:</strong> ${formData.experience || 'Not specified'}</p>
            <p><strong>Goals:</strong> ${formData.goals || 'Not specified'}</p>
            ${formData.additionalInfo ? `<p><strong>Additional Information:</strong> ${formData.additionalInfo}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #d1ecf1; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460;">
              <strong>Action Required:</strong> Please prepare a personalized quote and respond within 24 hours.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.logEmail('info', 'Free quote email sent successfully', { email: formData.email });
    
  } catch (error) {
    logger.logEmail('error', 'Failed to send free quote email', { error: error.message, email: formData.email });
    throw error;
  }
};

// Send email verification
const sendEmailVerification = async (userEmail, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
      from: `"Invictus Consultants" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Verify Your Email - Invictus Consultants',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Welcome to Invictus Consultants!</h2>
          
          <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6c757d;">${verificationUrl}</p>
          
          <p>This link will expire in 24 hours.</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              If you didn't create an account with us, please ignore this email.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.logEmail('info', 'Email verification sent', { email: userEmail });
    
  } catch (error) {
    logger.logEmail('error', 'Failed to send email verification', { error: error.message, email: userEmail });
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"Invictus Consultants" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Password Reset - Invictus Consultants',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          
          <p>You requested a password reset for your Invictus Consultants account.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6c757d;">${resetUrl}</p>
          
          <p>This link will expire in 1 hour.</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              If you didn't request a password reset, please ignore this email. Your password will not be changed.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.logEmail('info', 'Password reset email sent', { email: userEmail });
    
  } catch (error) {
    logger.logEmail('error', 'Failed to send password reset email', { error: error.message, email: userEmail });
    throw error;
  }
};

module.exports = {
  sendContactFormEmail,
  sendFreeQuoteEmail,
  sendEmailVerification,
  sendPasswordResetEmail
};


