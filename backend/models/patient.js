import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    index: true
  },
  city: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  concern: {
    type: String,
    required: true,
    trim: true
  },
  contactMethod: {
    type: String,
    enum: ['Phone', 'Email', 'WhatsApp'],
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'active', 'inactive'],
    default: 'new'
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

export const Patient = mongoose.model('Patient', patientSchema);
