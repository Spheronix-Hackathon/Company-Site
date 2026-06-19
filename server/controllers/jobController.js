const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Public (Should be Admin in production)
const createJob = async (req, res) => {
  try {
    const { 
      title, department, location, type, experienceLevel,
      referenceNumber, salaryRange, aboutCompany, roleOverview,
      educationalRequirements, workingModel, applicationDeadline,
      hiringProcess, equalOpportunityStatement, keyResponsibilities,
      requiredSkills, preferredQualifications, benefits 
    } = req.body;

    if (!title || !department || !location || !type || !experienceLevel) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = new Job({
      title, department, location, type, experienceLevel,
      referenceNumber, salaryRange, aboutCompany, roleOverview,
      educationalRequirements, workingModel, applicationDeadline,
      hiringProcess, equalOpportunityStatement, keyResponsibilities,
      requiredSkills, preferredQualifications, benefits
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Public (Should be Admin in production)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      job.title = req.body.title !== undefined ? req.body.title : job.title;
      job.department = req.body.department !== undefined ? req.body.department : job.department;
      job.location = req.body.location !== undefined ? req.body.location : job.location;
      job.type = req.body.type !== undefined ? req.body.type : job.type;
      job.experienceLevel = req.body.experienceLevel !== undefined ? req.body.experienceLevel : job.experienceLevel;
      
      job.referenceNumber = req.body.referenceNumber !== undefined ? req.body.referenceNumber : job.referenceNumber;
      job.salaryRange = req.body.salaryRange !== undefined ? req.body.salaryRange : job.salaryRange;
      job.aboutCompany = req.body.aboutCompany !== undefined ? req.body.aboutCompany : job.aboutCompany;
      job.roleOverview = req.body.roleOverview !== undefined ? req.body.roleOverview : job.roleOverview;
      job.educationalRequirements = req.body.educationalRequirements !== undefined ? req.body.educationalRequirements : job.educationalRequirements;
      job.workingModel = req.body.workingModel !== undefined ? req.body.workingModel : job.workingModel;
      job.applicationDeadline = req.body.applicationDeadline !== undefined ? req.body.applicationDeadline : job.applicationDeadline;
      job.hiringProcess = req.body.hiringProcess !== undefined ? req.body.hiringProcess : job.hiringProcess;
      job.equalOpportunityStatement = req.body.equalOpportunityStatement !== undefined ? req.body.equalOpportunityStatement : job.equalOpportunityStatement;
      
      job.keyResponsibilities = req.body.keyResponsibilities !== undefined ? req.body.keyResponsibilities : job.keyResponsibilities;
      job.requiredSkills = req.body.requiredSkills !== undefined ? req.body.requiredSkills : job.requiredSkills;
      job.preferredQualifications = req.body.preferredQualifications !== undefined ? req.body.preferredQualifications : job.preferredQualifications;
      job.benefits = req.body.benefits !== undefined ? req.body.benefits : job.benefits;

      const updatedJob = await job.save();
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Public (Should be Admin in production)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      await job.deleteOne();
      res.status(200).json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};
