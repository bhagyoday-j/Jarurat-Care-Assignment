import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['registration', 'volunteer', 'health', 'services', 'general'],
    default: 'general',
    index: true
  },
  keywords: {
    type: [String],
    default: []
  },
  priority: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
faqSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for search
faqSchema.index({ question: 'text', answer: 'text', keywords: 'text' });

export const FAQ = mongoose.model('FAQ', faqSchema);
