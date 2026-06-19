const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getDemoEmailTemplate = (name, learningMode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
        .header { background-color: #4c1d95; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; background-color: #ffffff; }
        .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
        .btn { display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Spheronix Technology</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for your interest in Spheronix Technology.</p>
          
          <p>We have successfully received your request. Our team is reviewing the details, and one of our representatives will contact you shortly.</p>

          <p>We appreciate the opportunity to assist you and look forward to connecting with you soon.</p>

          <p>Best regards,<br>Spheronix Technology Team</p>

          <a href="https://spheronix.com" class="btn">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Spheronix Technology. All rights reserved.</p>
          <p>3rd Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Bengaluru, Karnataka 560100</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendDemoConfirmation = async (to, name, learningMode) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Your Demo with Spheronix Technology is Confirmed!',
      html: getDemoEmailTemplate(name, learningMode),
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const getContactEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
        .header { background-color: #4c1d95; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; background-color: #ffffff; }
        .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
        .btn { display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Spheronix Technology</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for your interest in Spheronix Technology.</p>
          
          <p>We have successfully received your request. Our team is reviewing the details, and one of our representatives will contact you shortly.</p>

          <p>We appreciate the opportunity to assist you and look forward to connecting with you soon.</p>

          <p>Best regards,<br>Spheronix Technology Team</p>

          <a href="https://spheronix.com" class="btn">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Spheronix Technology. All rights reserved.</p>
          <p>3rd Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Bengaluru, Karnataka 560100</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendContactConfirmation = async (to, name) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'We Received Your Message - Spheronix Technology',
      html: getContactEmailTemplate(name),
    });
    console.log('Contact confirmation sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact confirmation:', error);
    // Don't throw to avoid blocking the response
  }
};

const sendContactNotification = async (data) => {
  const { name, email, domain, scale, message } = data;
  try {
     await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to admin
      subject: 'New Consultation Request 🚀',
      html: `
        <h2>New Consultation</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Domain:</b> ${domain}</p>
        <p><b>Project Scale:</b> ${scale}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending contact notification:', error);
    // Don't throw here to avoid failing the request if just admin notification fails
  }
}

module.exports = {
  sendDemoConfirmation,
  sendContactNotification,
  sendContactConfirmation
};
