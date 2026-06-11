import Fuse from 'fuse.js';
import { FAQ } from '../models/faq.js';
import { logger } from '../utils/logger.js';

let faqCache = [];
let faqFuse = null;

/**
 * Initialize FAQ cache and fuzzy search index
 */
export async function initializeFAQCache() {
  try {
    // Fetch all active FAQs from database
    faqCache = await FAQ.find({ isActive: true }).sort({ priority: -1 }).lean();
    
    if (faqCache.length === 0) {
      logger.warn('No active FAQs found in database');
    } else {
      logger.info(`Loaded ${faqCache.length} FAQs into cache`);
    }

    // Initialize Fuse for fuzzy search
    faqFuse = new Fuse(faqCache, {
      keys: ['question', 'answer', 'keywords'],
      threshold: 0.4, // 40% match threshold (0-1, lower = stricter)
      minMatchCharLength: 2,
      includeScore: true,
      useExtendedSearch: true
    });

    return faqCache.length;
  } catch (error) {
    logger.error('Failed to initialize FAQ cache', error.message);
    throw error;
  }
}

/**
 * Search FAQs using fuzzy matching
 * @param {string} question - User question
 * @param {number} topK - Number of results (default: 3)
 * @returns {Promise<Array>} Matching FAQs with scores
 */
export async function searchFAQ(question, topK = 3) {
  try {
    if (!faqFuse || faqCache.length === 0) {
      return [];
    }

    // Perform fuzzy search
    const results = faqFuse.search(question).slice(0, topK);

    // Format results
    const faqs = results.map(result => ({
      ...result.item,
      matchScore: (1 - result.score).toFixed(2) // Convert score to 0-1 range
    }));

    logger.info(`FAQ search for "${question}"`, { resultsFound: faqs.length });

    return faqs;
  } catch (error) {
    logger.error('FAQ search failed', error.message);
    return [];
  }
}

/**
 * Get best matching FAQ if confidence is high enough
 * @param {string} question - User question
 * @param {number} confidenceThreshold - Minimum match score (0-1)
 * @returns {Promise<Object|null>} Best matching FAQ or null
 */
export async function getBestMatchingFAQ(question, confidenceThreshold = 0.65) {
  try {
    const results = await searchFAQ(question, 1);

    if (results.length > 0) {
      const bestMatch = results[0];
      const score = parseFloat(bestMatch.matchScore);

      if (score >= confidenceThreshold) {
        // Increment view count
        await FAQ.updateOne(
          { _id: bestMatch._id },
          { $inc: { views: 1 } }
        );

        logger.info(`FAQ match found for "${question}"`, { 
          matchedQuestion: bestMatch.question,
          score: score
        });

        return bestMatch;
      }
    }

    return null;
  } catch (error) {
    logger.error('Failed to get best matching FAQ', error.message);
    return null;
  }
}

/**
 * Add or update FAQ
 * @param {Object} faqData - FAQ data
 * @returns {Promise<Object>} Created/updated FAQ
 */
export async function saveFAQ(faqData) {
  try {
    const { question, answer, category, keywords, priority } = faqData;

    const faq = await FAQ.findOneAndUpdate(
      { question },
      {
        question,
        answer,
        category: category || 'general',
        keywords: keywords || [],
        priority: priority || 0,
        updatedAt: Date.now()
      },
      { upsert: true, new: true }
    );

    // Refresh cache after adding/updating
    await initializeFAQCache();

    logger.info('FAQ saved', { faqId: faq._id, question });
    return faq;
  } catch (error) {
    logger.error('Failed to save FAQ', error.message);
    throw error;
  }
}

/**
 * Get all FAQs (paginated)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 20)
 * @param {string} category - Filter by category (optional)
 * @returns {Promise<Object>} Paginated FAQs
 */
export async function getAllFAQs(page = 1, limit = 20, category = null) {
  try {
    const skip = (page - 1) * limit;
    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const faqs = await FAQ.find(query)
      .sort({ priority: -1, views: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await FAQ.countDocuments(query);

    return {
      faqs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    logger.error('Failed to get FAQs', error.message);
    throw error;
  }
}

/**
 * Delete FAQ
 * @param {string} faqId - FAQ ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteFAQ(faqId) {
  try {
    const result = await FAQ.findByIdAndDelete(faqId);

    if (result) {
      // Refresh cache after deletion
      await initializeFAQCache();
      logger.info('FAQ deleted', { faqId });
      return true;
    }

    return false;
  } catch (error) {
    logger.error('Failed to delete FAQ', error.message);
    throw error;
  }
}

/**
 * Deactivate FAQ (soft delete)
 * @param {string} faqId - FAQ ID
 * @returns {Promise<Object>} Updated FAQ
 */
export async function deactivateFAQ(faqId) {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      faqId,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (faq) {
      // Refresh cache after deactivation
      await initializeFAQCache();
      logger.info('FAQ deactivated', { faqId });
    }

    return faq;
  } catch (error) {
    logger.error('Failed to deactivate FAQ', error.message);
    throw error;
  }
}

/**
 * Get FAQ statistics
 * @returns {Promise<Object>} FAQ stats
 */
export async function getFAQStats() {
  try {
    const total = await FAQ.countDocuments();
    const active = await FAQ.countDocuments({ isActive: true });
    const byCategory = await FAQ.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    return {
      total,
      active,
      byCategory: Object.fromEntries(byCategory.map(b => [b._id, b.count]))
    };
  } catch (error) {
    logger.error('Failed to get FAQ statistics', error.message);
    throw error;
  }
}

export default {
  initializeFAQCache,
  searchFAQ,
  getBestMatchingFAQ,
  saveFAQ,
  getAllFAQs,
  deleteFAQ,
  deactivateFAQ,
  getFAQStats
};
