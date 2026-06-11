import express from 'express';
import {
  saveFAQ,
  getAllFAQs,
  deleteFAQ,
  searchFAQ,
  getFAQStats
} from '../services/faqService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/faq
 * Add or update an FAQ
 */
router.post('/', async (req, res) => {
  try {
    const { question, answer, category, keywords, priority } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'question and answer are required' });
    }

    const faq = await saveFAQ({
      question,
      answer,
      category,
      keywords,
      priority
    });

    res.status(201).json(faq);
  } catch (error) {
    logger.error('FAQ creation error', error.message);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

/**
 * GET /api/faq
 * Get all FAQs (paginated)
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category } = req.query;

    const result = await getAllFAQs(parseInt(page), parseInt(limit), category);
    res.json(result);
  } catch (error) {
    logger.error('Get FAQs error', error.message);
    res.status(500).json({ error: 'Failed to retrieve FAQs' });
  }
});

/**
 * GET /api/faq/search
 * Search FAQs with fuzzy matching
 */
router.get('/search', async (req, res) => {
  try {
    const { question, topK = 3 } = req.query;

    if (!question) {
      return res.status(400).json({ error: 'question parameter is required' });
    }

    const results = await searchFAQ(question, parseInt(topK));
    res.json({
      question,
      results,
      count: results.length
    });
  } catch (error) {
    logger.error('FAQ search error', error.message);
    res.status(500).json({ error: 'FAQ search failed' });
  }
});

/**
 * GET /api/faq/stats
 * Get FAQ statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await getFAQStats();
    res.json(stats);
  } catch (error) {
    logger.error('FAQ stats error', error.message);
    res.status(500).json({ error: 'Failed to get FAQ statistics' });
  }
});

/**
 * DELETE /api/faq/:id
 * Delete an FAQ
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const success = await deleteFAQ(id);
    if (success) {
      res.json({ success: true, message: 'FAQ deleted' });
    } else {
      res.status(404).json({ error: 'FAQ not found' });
    }
  } catch (error) {
    logger.error('FAQ deletion error', error.message);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

export default router;
