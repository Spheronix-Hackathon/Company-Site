const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  // Personal Info
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  mobileNumber: { type: String },
  currentLocation: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },

  // Professional Info
  currentJobTitle: { type: String },
  totalExperience: { type: String },
  relevantExperience: { type: String },
  currentCompany: { type: String },
  currentCTC: { type: String },
  expectedCTC: { type: String },
  noticePeriod: { type: String },
  employmentTypePreference: { type: String },
  workAuthorizationStatus: { type: String },

  // Educational Info (Legacy fields)
  highestQualification: { type: String },
  university: { type: String },
  graduationYear: { type: String },
  certifications: { type: String },

  // New Dynamic Educational Info
  educationDetails: [{
    level: { type: String, required: true },
    institution: { type: String, required: true },
    passingYear: { type: String, required: true },
    score: { type: String, required: true }
  }],
  certificationDetails: [{
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String, required: true }
  }],

  // Skills
  primarySkills: { type: String, required: true },
  secondarySkills: { type: String },
  technicalSkills: { type: String, required: true },
  softSkills: { type: String },

  // Details
  applyingPosition: { type: String },
  preferredLocation: { type: String },
  availableJoiningDate: { type: String },
  portfolioUrl: { type: String, required: true },
  linkedinUrl: { type: String, required: true },

  // Files
  coverLetter: { type: String }, // Can keep as text for legacy, or URL
  resumePath: { type: String, required: true },
  coverLetterPath: { type: String },
  supportingDocumentsPath: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'],
    default: 'Pending',
  }
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
