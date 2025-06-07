const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventFor: { type: String, enum: ['all', 'faculty', 'students'], required: true },
  grade: { type: String }, // Only applicable if eventFor is 'students'
  startDate: { type: Date, default: Date.now },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;