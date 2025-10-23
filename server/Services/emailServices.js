const nodemailer = require('nodemailer');

// Create a transporter based on environment
const createTransporter = async () => {
  // For production, use configured SMTP settings
  if (process.env.NODE_ENV === 'production') {
    // Check if using Gmail SMTP
    if (process.env.SMTP_HOST === 'smtp.gmail.com') {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // Generic SMTP configuration
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.office365.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || 'sabbir.rplteam@gmail.com',
          pass: process.env.SMTP_PASS || 'Rplsupport1234$$'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
  } else {
    // For development, create dynamic test account
    try {
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (error) {
      console.error('Failed to create test account, using fallback:', error.message);
      // Fallback transporter
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }
  }
};

// Send contact form email
const sendContactFormEmail = async (formData) => {
  const transporter = await createTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || '"RPL Support Website" <sabbir.rplteam@gmail.com>',
    to: [
      'admin@rplsupport.com.au',
      formData.email // Send a copy to the person who filled the form
    ],
    subject: `New Contact Form Submission - ${formData.firstName} ${formData.lastName}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #01675f; margin: 0;">New Contact Form Submission</h2>
            <p style="color: #666; margin: 5px 0 0;">RPL Support Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #666;">${formData.message}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #01675f; color: white; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Thank you for contacting RPL Support. We will get back to you as soon as possible.</p>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `
  };

  return await transporter.sendMail(mailOptions);
};

// Send free quote form email
const sendFreeQuoteEmail = async (formData, categories, courses) => {
  const transporter = await createTransporter();
  
  // Get selected category names
  const selectedCategoryNames = categories
    .filter(cat => formData.selectedCategories.includes(cat._id))
    .map(cat => cat.name);
    
  // Get selected course details
  const selectedCourseDetails = courses
    .filter(course => formData.selectedCourses.includes(course._id))
    .map(course => `${course.code} - ${course.title}`);
  
  const mailOptions = {
    from: process.env.SMTP_FROM || '"RPL Support Website" <sabbir.rplteam@gmail.com>',
    to: [
      'admin@rplsupport.com.au',
      formData.email // Send a copy to the person who filled the form
    ],
    subject: `New Free Quote Request - ${formData.firstName} ${formData.lastName}`,
    html: `
      <div style="max-width: 700px; margin: 0 auto; font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #01675f; margin: 0;">New Free Quote Request</h2>
            <p style="color: #666; margin: 5px 0 0;">RPL Support Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">State:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${formData.state || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Preferred Contact:</td>
                <td style="padding: 8px 0; color: #666;">${formData.preferredContact || 'Not specified'}</td>
              </tr>
            </table>
          </div>
          
          ${selectedCategoryNames.length > 0 ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Selected Categories</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              ${selectedCategoryNames.map(name => `<li style="margin-bottom: 5px;">${name}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${selectedCourseDetails.length > 0 ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Selected Courses</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              ${selectedCourseDetails.map(course => `<li style="margin-bottom: 5px;">${course}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${formData.experience ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Work Experience</h3>
            <p style="margin: 0; color: #666; line-height: 1.5;">${formData.experience}</p>
          </div>
          ` : ''}
          
          ${formData.goals ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Career Goals</h3>
            <p style="margin: 0; color: #666; line-height: 1.5;">${formData.goals}</p>
          </div>
          ` : ''}
          
          ${formData.additionalInfo ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #01675f; margin: 0 0 15px;">Additional Information</h3>
            <p style="margin: 0; color: #666; line-height: 1.5;">${formData.additionalInfo}</p>
          </div>
          ` : ''}
          
          <div style="background: #01675f; color: white; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Thank you for your interest in RPL Support. We will review your request and prepare a personalized quote for you.</p>
          </div>
        </div>
      </div>
    `,
    text: `
New Free Quote Request

Personal Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
State: ${formData.state || 'Not specified'}
Preferred Contact: ${formData.preferredContact || 'Not specified'}

Selected Categories:
${selectedCategoryNames.length > 0 ? selectedCategoryNames.join('\n') : 'None selected'}

Selected Courses:
${selectedCourseDetails.length > 0 ? selectedCourseDetails.join('\n') : 'None selected'}

Work Experience:
${formData.experience || 'Not provided'}

Career Goals:
${formData.goals || 'Not provided'}

Additional Information:
${formData.additionalInfo || 'Not provided'}
    `
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactFormEmail,
  sendFreeQuoteEmail
};