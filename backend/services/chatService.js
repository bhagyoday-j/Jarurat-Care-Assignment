import { appendJSON, getAll } from '../utils/db.js';
import { logger } from '../utils/logger.js';
import { callLLMWithContext, callLLM } from './llm.js';
import { queryRAG } from './rag.js';
import { getBestMatchingFAQ } from './faqService.js';

/**
 * Handle user chat message with FAQ → RAG → LLM flow
 * @param {string} message - User message
 * @param {boolean} useRAG - Whether to use RAG context (default: true)
 */
export async function handleChat(message, useRAG = true) {
  try {
    let response;
    let source = 'llm'; // llm, rag, or faq
    let contextChunks = [];

    // Step 1: Try to find matching FAQ first (faster, deterministic)
    let matchingFAQ = null;
    try {
      matchingFAQ = await getBestMatchingFAQ(message, 0.65);
      if (matchingFAQ) {
        source = 'faq';
        logger.info('FAQ match found', { question: message, faqQuestion: matchingFAQ.question });
        response = {
          content: matchingFAQ.answer,
          provider: 'FAQ Database'
        };
      }
    } catch (error) {
      logger.warn('FAQ search failed, continuing to RAG', error.message);
    }

    // Step 2: If no FAQ match, try RAG context
    if (!matchingFAQ && useRAG) {
      try {
        contextChunks = await queryRAG(message, 5);
      } catch (error) {
        logger.warn('RAG query failed, continuing without context', error.message);
      }
    }

    // Step 3: If no FAQ match, call LLM
    if (!matchingFAQ) {
      if (contextChunks.length > 0) {
        source = 'rag+llm';
        response = await callLLMWithContext(message, contextChunks);
      } else {
        source = 'llm';
        response = await callLLM([{ role: 'user', content: message }]);
      }
    }

    // Store chat message with source
    const chatRecord = await appendJSON('chats.json', {
      message,
      response: response.content,
      provider: response.provider,
      source, // faq, llm, or rag+llm
      faqUsed: source === 'faq',
      ragUsed: source === 'rag+llm' || (useRAG && contextChunks.length > 0),
      contextChunkCount: contextChunks.length
    });

    return {
      id: chatRecord.id,
      message,
      reply: response.content,
      provider: response.provider,
      source, // What was used to answer
      contextUsed: contextChunks.length > 0,
      faqMatch: matchingFAQ ? { question: matchingFAQ.question, score: matchingFAQ.matchScore } : null
    };
  } catch (error) {
    logger.error('Chat handling failed', error.message);
    throw error;
  }
}

/**
 * Get all chat messages
 */
export async function getAllChats() {
  try {
    const chats = await getAll('chats.json');
    return chats;
  } catch (error) {
    logger.error('Failed to get chats', error.message);
    throw error;
  }
}
