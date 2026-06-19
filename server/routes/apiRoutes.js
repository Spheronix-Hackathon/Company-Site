const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 }, // 500KB limit
});
const { bookDemo } = require('../controllers/demoController');
const { submitContact } = require('../controllers/contactController');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { submitApplication, getApplications } = require('../controllers/applicationController');
const { loginUser, updateUserProfile } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Demo Booking Route
router.post('/demo/book', bookDemo);

// Contact Route
router.post('/contact', submitContact);

// Auth Routes
router.post('/auth/login', loginUser);
router.route('/auth/profile').put(protect, updateUserProfile);

// Job Routes
router.route('/jobs').get(getJobs).post(protect, admin, createJob);
router.route('/jobs/:id').put(protect, admin, updateJob).delete(protect, admin, deleteJob);

// Application Routes
router.route('/applications')
  .post(upload.fields([
    { name: 'resume', maxCount: 1 }, 
    { name: 'coverLetterFile', maxCount: 1 }, 
    { name: 'supportingDocuments', maxCount: 1 }
  ]), submitApplication)
  .get(protect, admin, getApplications);

module.exports = router;
