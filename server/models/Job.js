const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  referenceNumber: { type: String },
  salaryRange: { type: String },
  aboutCompany: { type: String },
  roleOverview: { type: String },
  keyResponsibilities: { type: [String], default: [] },
  requiredSkills: { type: [String], default: [] },
  preferredQualifications: { type: [String], default: [] },
  educationalRequirements: { type: String },
  benefits: { type: [String], default: [] },
  workingModel: { type: String },
  applicationDeadline: { type: String },
  hiringProcess: { type: String },
  equalOpportunityStatement: { type: String },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
