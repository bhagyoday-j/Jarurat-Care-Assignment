import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  phone: {
    type: String,
    required: true,
    index: true
  },
  profession: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  availability: {
    type: [String],
    required: true,
    enum: ['Weekdays', 'Weekends', 'Morning', 'Evening']
  },
  skills: {
    type: String,
    default: ''
  },
  agreement: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'inactive'],
    default: 'pending',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Volunteer = mongoose.model('Volunteer', volunteerSchema);
