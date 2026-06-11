import { appendJSON, getAll } from '../utils/db.js';
import { logger } from '../utils/logger.js';
import { callLLMWithContext, callLLM } from './llm.js';
import { queryRAG } from './rag.js';

/**
 * Handle user chat message with RAG context
 * @param {string} message - User message
 * @param {boolean} useRAG - Whether to use RAG context (default: true)
 */
export async function handleChat(message, useRAG = true) {
  try {
    let contextChunks = [];
    
    // Retrieve RAG context if enabled
    if (useRAG) {
      try {
        contextChunks = await queryRAG(message, 5);
      } catch (error) {
        logger.warn('RAG query failed, continuing without context', error.message);
      }
    }

    // Get LLM response
    let response;
    if (contextChunks.length > 0) {
      response = await callLLMWithContext(message, contextChunks);
    } else {
      response = await callLLM([{ role: 'user', content: message }]);
    }

    // Store chat message
    const chatRecord = await appendJSON('chats.json', {
      message,
      response: response.content,
      provider: response.provider,
      ragUsed: useRAG && contextChunks.length > 0,
      contextChunkCount: contextChunks.length
    });

    return {
      id: chatRecord.id,
      message,
      reply: response.content,
      provider: response.provider,
      contextUsed: contextChunks.length > 0
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
