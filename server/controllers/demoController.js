const Demo = require('../models/Demo');
const { sendDemoConfirmation } = require('../services/emailService');

const bookDemo = async (req, res) => {
  try {
    const { name, email, phone, learningMode } = req.body;

    // Validation
    if (!name || !email || !phone || !learningMode) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    // Save to MongoDB
    const demo = await Demo.create({
      name,
      email,
      phone,
      learningMode
    });

    // Send Confirmation Email
    try {
      await sendDemoConfirmation(email, name, learningMode);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // We still return success because the booking was saved
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in Spheronix Technology. Our team will contact you shortly.',
      data: demo
    });

  } catch (error) {
    console.error('Error in bookDemo:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  bookDemo
};
