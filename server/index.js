const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const User = require('./models/User'); // Import User for seeding
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Point to root .env

const app = express();

// Connect to MongoDB
connectDB().then(async () => {
  // Seed initial admin user if no users exist
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found, creating default Admin user...');
      await User.create({
        name: 'Super Admin',
        email: 'admin@spheronix.tech',
        password: 'Password123!',
        role: 'ADMIN'
      });
      console.log('Default admin created: admin@spheronix.tech / Password123!');
    }
  } catch (err) {
    console.error('Failed to seed admin:', err);
  }
});

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"], // Allow React inline scripts
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://i.pravatar.cc", "https://picsum.photos"], // Allow external images
      connectSrc: ["'self'", "http://localhost:5000"], // Allow API calls
    },
  },
}));

// Logging Middleware
app.use(morgan('combined')); // Standard Apache combined log format

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware for Multer and general errors
app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large. Max allowed size is 500KB.' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    console.error('Unhandled Error:', err);
    return res.status(500).json({ message: err.message || 'Server Error' });
  }
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
