const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  learningMode: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Demo', demoSchema);
