const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { sendContactConfirmation, sendContactNotification } = require('../server/services/emailService');
const http = require('http');

const TEST_EMAIL = 'yashwanthkumar87657@gmail.com';
const API_URL = 'http://localhost:5000/api';

async function verifyDatabase() {
  console.log('\n--- 1. Database Verification ---');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully.');
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('✅ Collections found:', collections.map(c => c.name).join(', '));
    
    // Verify Demos Collection
    const demoCount = await mongoose.connection.db.collection('demos').countDocuments();
    console.log(`✅ Demos collection count: ${demoCount}`);

    // Verify Contacts Collection
    const contactCount = await mongoose.connection.db.collection('contacts').countDocuments();
    console.log(`✅ Contacts collection count: ${contactCount}`);

    return true;
  } catch (error) {
    console.error('❌ Database verification failed:', error.message);
    return false;
  }
}

async function verifyEmailSystem() {
  console.log('\n--- 2. Email System Testing ---');
  try {
    // Send test email using the contact confirmation template
    console.log(`Attempting to send test email to ${TEST_EMAIL}...`);
    await sendContactConfirmation(TEST_EMAIL, 'Test User');
    console.log('✅ Test confirmation email sent successfully.');
    return true;
  } catch (error) {
    console.error('❌ Email verification failed:', error.message);
    return false;
  }
}

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function verifyAPI() {
  console.log('\n--- 3. API Validation ---');
  
  // Test Book Demo
  console.log('Testing /api/demo/book...');
  try {
    const demoData = {
      name: 'Automated Test User',
      email: TEST_EMAIL,
      phone: '1234567890',
      learningMode: 'online'
    };
    const demoRes = await makeRequest('POST', '/api/demo/book', demoData);
    
    if (demoRes.status === 201 && demoRes.body.success) {
      console.log('✅ Demo booking API successful.');
    } else {
      console.error('❌ Demo booking API failed:', demoRes.body);
    }
  } catch (error) {
    console.error('❌ Demo booking API error:', error.message);
  }

  // Test Contact Form
  console.log('Testing /api/contact...');
  try {
    const contactData = {
      name: 'Automated Test User',
      email: TEST_EMAIL,
      domain: 'Testing',
      scale: 'Production Build',
      message: 'This is an automated production verification test.'
    };
    const contactRes = await makeRequest('POST', '/api/contact', contactData);
    
    if (contactRes.status === 200 && contactRes.body.success) {
      console.log('✅ Contact API successful.');
    } else {
      console.error('❌ Contact API failed:', contactRes.body);
    }
  } catch (error) {
    console.error('❌ Contact API error:', error.message);
  }
}

async function runVerification() {
  console.log('🚀 Starting Production Verification...');
  
  const dbSuccess = await verifyDatabase();
  if (dbSuccess) {
    await verifyEmailSystem();
    // Note: Server must be running for API tests
    await verifyAPI();
  }
  
  console.log('\n🏁 Verification Complete. Check logs above.');
  process.exit(0);
}

runVerification();
