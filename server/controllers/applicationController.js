const Application = require('../models/Application');

// @desc    Submit a job application
// @route   POST /api/applications
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const { 
      jobId, jobTitle, name, email, phone, mobileNumber, currentLocation, dateOfBirth, nationality,
      currentJobTitle, totalExperience, relevantExperience, currentCompany, currentCTC, expectedCTC, noticePeriod, employmentTypePreference, workAuthorizationStatus,
      highestQualification, university, graduationYear, certifications,
      primarySkills, secondarySkills, technicalSkills, softSkills,
      applyingPosition, preferredLocation, availableJoiningDate, portfolioUrl, linkedinUrl, coverLetter,
      educationDetails, certificationDetails
    } = req.body;

    if (!jobId || !jobTitle || !name || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required base fields' });
    }

    // Check if the user has already applied for this role
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this role.' });
    }

    const application = new Application({
      jobId, jobTitle, name, email, phone, portfolioUrl, coverLetter,
      mobileNumber, currentLocation, dateOfBirth, nationality,
      currentJobTitle, totalExperience, relevantExperience, currentCompany, currentCTC, expectedCTC, noticePeriod, employmentTypePreference, workAuthorizationStatus,
      highestQualification, university, graduationYear, certifications,
      primarySkills, secondarySkills, technicalSkills, softSkills,
      applyingPosition, preferredLocation, availableJoiningDate, linkedinUrl,
      educationDetails: educationDetails ? JSON.parse(educationDetails) : [],
      certificationDetails: certificationDetails ? JSON.parse(certificationDetails) : [],
      resumePath: req.files && req.files['resume'] ? `/uploads/${req.files['resume'][0].filename}` : null,
      coverLetterPath: req.files && req.files['coverLetterFile'] ? `/uploads/${req.files['coverLetterFile'][0].filename}` : null,
      supportingDocumentsPath: req.files && req.files['supportingDocuments'] ? `/uploads/${req.files['supportingDocuments'][0].filename}` : null,
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitApplication,
  getApplications,
};
