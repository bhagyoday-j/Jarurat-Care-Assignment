import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  response: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    type: String,
    enum: ['Groq', 'OpenRouter', 'FAQ Database'],
    default: 'Groq'
  },
  source: {
    type: String,
    enum: ['faq', 'llm', 'rag+llm'],
    default: 'llm'
  },
  faqUsed: {
    type: Boolean,
    default: false
  },
  ragUsed: {
    type: Boolean,
    default: false
  },
  contextChunkCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

export const Chat = mongoose.model('Chat', chatSchema);
