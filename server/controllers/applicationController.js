const Application = require('../models/Application');
const Job = require('../models/Job');

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

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'This role is no longer available.' });
    }

    const application = new Application({
      applicationType: job.type.endsWith('Term Internship') ? 'Internship' : 'Job',
      jobId, jobTitle, name, email, phone, portfolioUrl, coverLetter,
      mobileNumber, currentLocation, dateOfBirth, nationality,
      currentJobTitle, totalExperience, relevantExperience, currentCompany, currentCTC, expectedCTC, noticePeriod, employmentTypePreference, workAuthorizationStatus,
      highestQualification, university, graduationYear, certifications,
      primarySkills, secondarySkills, technicalSkills, softSkills,
      applyingPosition, preferredLocation, availableJoiningDate, linkedinUrl,
      educationDetails: educationDetails ? JSON.parse(educationDetails) : [],
      certificationDetails: certificationDetails ? JSON.parse(certificationDetails) : [],
      resumePath: req.files && req.files['resume'] ? req.files['resume'][0].path : null,
      coverLetterPath: req.files && req.files['coverLetterFile'] ? req.files['coverLetterFile'][0].path : null,
      supportingDocumentsPath: req.files && req.files['supportingDocuments'] ? req.files['supportingDocuments'][0].path : null,
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

// @desc    Update application status and interview details
// @route   PATCH /api/applications/:id
// @access  Private/Admin
const updateApplication = async (req, res) => {
  try {
    const { status, interviewDate, interviewMode, interviewLink, interviewNotes } = req.body;

    if (status === 'Interview Scheduled' && !interviewDate) {
      return res.status(400).json({ message: 'Please set the interview date and time' });
    }

    // Update only these paths so older applications missing newer required fields can still move forward
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status, interviewDate, interviewMode, interviewLink, interviewNotes } },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid application status' });
    }
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplication,
};
