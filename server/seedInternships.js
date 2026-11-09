const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Job = require('./models/Job');

const domains = [
  { code: 'WEB', title: 'Web Development', skills: ['HTML, CSS and JavaScript', 'React or a similar framework'], overview: 'Build and ship responsive web features alongside our engineering team.' },
  { code: 'PY', title: 'Python & Data Science', skills: ['Python programming', 'Data analysis with Pandas'], overview: 'Clean, analyse and model data to answer real product questions.' },
  { code: 'AI', title: 'AI / Machine Learning', skills: ['Python programming', 'Machine learning fundamentals'], overview: 'Train, evaluate and improve machine learning models with our AI team.' },
  { code: 'UX', title: 'UI/UX Design', skills: ['Figma or a similar tool', 'Design fundamentals'], overview: 'Design clear, usable interfaces from research through to prototype.' },
  { code: 'QA', title: 'Software Testing', skills: ['Testing fundamentals', 'Attention to detail'], overview: 'Plan and run manual and automated tests across our products.' },
  { code: 'DM', title: 'Digital Marketing', skills: ['Social media and content basics', 'SEO fundamentals'], overview: 'Plan campaigns, create content and track what performs.' },
  { code: 'EMB', title: 'Embedded Systems', skills: ['C programming', 'Microcontroller basics'], overview: 'Program microcontrollers and build firmware that runs on real hardware.' },
  { code: 'IOT', title: 'Internet of Things (IoT)', skills: ['Sensors and microcontroller basics', 'Networking fundamentals'], overview: 'Connect sensors and devices to the cloud and build working IoT solutions.' },
  { code: 'JFS', title: 'Java Full Stack', skills: ['Core Java', 'Spring Boot and SQL basics'], overview: 'Build backend services and connect them to working web interfaces.' },
  { code: 'APP', title: 'Mobile App Development', skills: ['Flutter or React Native', 'REST API basics'], overview: 'Build and test mobile app features for Android and iOS.' },
  { code: 'CLD', title: 'Cloud & DevOps', skills: ['Linux fundamentals', 'AWS, Docker or CI/CD basics'], overview: 'Help deploy, automate and monitor applications in the cloud.' },
  { code: 'SEC', title: 'Cybersecurity', skills: ['Networking fundamentals', 'Web security basics'], overview: 'Assess systems, find weaknesses and help strengthen our defences.' },
  { code: 'DA', title: 'Data Analytics', skills: ['Excel and SQL', 'Power BI or Tableau'], overview: 'Turn business data into clear reports and dashboards.' },
  { code: 'CW', title: 'Content Writing', skills: ['Strong written English', 'Research and editing'], overview: 'Write clear blogs, website copy and technical content.' },
];

const terms = [
  { code: 'ST', type: 'Short-Term Internship' },
  { code: 'LT', type: 'Long-Term Internship' },
];

const seed = async () => {
  await connectDB();

  for (const domain of domains) {
    for (const term of terms) {
      const referenceNumber = `INT-${term.code}-${domain.code}`;
      // $setOnInsert keeps any edits the admin has made when this is run again
      await Job.updateOne(
        { referenceNumber },
        {
          $setOnInsert: {
            title: domain.title,
            department: 'Internship Program',
            location: 'Remote',
            workingModel: 'Remote',
            type: term.type,
            experienceLevel: 'Internship',
            referenceNumber,
            salaryRange: 'Free Internship',
            roleOverview: domain.overview,
            requiredSkills: domain.skills,
          },
        },
        { upsert: true }
      );
    }
  }

  console.log(`Internships ready: ${domains.length * terms.length} roles checked.`);
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Failed to seed internships:', err);
  process.exit(1);
});
