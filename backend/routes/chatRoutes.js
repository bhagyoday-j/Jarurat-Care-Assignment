import express from 'express';
import { handleChat } from '../services/chatService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/chat
 * Handle user chat message with RAG support
 * Request body: { question: string }
 * Response: { id: string, message: string, reply: string, provider: string, contextUsed: boolean }
 */
router.post('/', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === '') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const result = await handleChat(question.trim(), true);
    res.json(result);
  } catch (error) {
    logger.error('Chat endpoint error', error.message);
    res.status(503).json({ error: 'LLM service unavailable. Please try again later.' });
  }
});

export default router;
