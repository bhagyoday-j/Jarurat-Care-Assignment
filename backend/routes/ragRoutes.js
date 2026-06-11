import express from 'express';
import { ingestDocument, queryRAG, clearIndex } from '../services/rag.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/rag/ingest
 * Ingest a document into Pinecone RAG system
 * Request body: { docId: string, text: string, metadata?: object }
 * Response: { success: true, docId: string, chunksCreated: number }
 */
router.post('/ingest', async (req, res) => {
  try {
    const { docId, text, metadata } = req.body;

    if (!docId || !text) {
      return res.status(400).json({ error: 'docId and text are required' });
    }

    const result = await ingestDocument(docId, text, metadata);
    res.json(result);
  } catch (error) {
    logger.error('RAG ingestion error', error.message);
    res.status(500).json({ error: 'Failed to ingest document' });
  }
});

/**
 * POST /api/rag/query
 * Query the RAG system for relevant chunks
 * Request body: { question: string, topK?: number }
 * Response: { question: string, chunks: string[], count: number }
 */
router.post('/query', async (req, res) => {
  try {
    const { question, topK } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'question is required' });
    }

    const chunks = await queryRAG(question, topK || 5);
    res.json({
      question,
      chunks,
      count: chunks.length
    });
  } catch (error) {
    logger.error('RAG query error', error.message);
    res.status(500).json({ error: 'Failed to query RAG system' });
  }
});

/**
 * POST /api/rag/clear
 * Clear all vectors from the Pinecone index (development only)
 * Response: { success: true }
 */
router.post('/clear', async (req, res) => {
  try {
    await clearIndex();
    logger.warn('RAG index cleared by admin');
    res.json({ success: true });
  } catch (error) {
    logger.error('RAG clear error', error.message);
    res.status(500).json({ error: 'Failed to clear index' });
  }
});

export default router;
