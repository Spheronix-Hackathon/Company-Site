const Contact = require('../models/Contact');
const { sendContactNotification, sendContactConfirmation } = require('../services/emailService');

const submitContact = async (req, res) => {
  const { name, email, domain, scale, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // 1. Save to MongoDB
    const newContact = new Contact({ name, email, domain, scale, message });
    await newContact.save();

    // 2. Send Email Notification to Admin
    await sendContactNotification({ name, email, domain, scale, message });

    // 3. Send Confirmation Email to User
    await sendContactConfirmation(email, name);

    res.json({ success: true, message: 'Thank you for your interest in Spheronix Technology. Our team will contact you shortly.' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  submitContact
};
