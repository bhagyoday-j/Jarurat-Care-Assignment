import { Pinecone } from '@pinecone-database/pinecone';
import { pipeline } from '@xenova/transformers';
import { logger } from '../utils/logger.js';

let pc = null;
let embeddingPipeline = null;

/**
 * Initialize Pinecone client
 */
async function getPineconeClient() {
  if (!pc) {
    pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    });
  }
  return pc;
}

/**
 * Get or create Pinecone index
 */
async function getOrCreateIndex() {
  const client = await getPineconeClient();
  const indexName = process.env.PINECONE_INDEX || 'jarurat-care';

  try {
    const indexes = await client.listIndexes();
    const exists = indexes.indexes?.some(i => i.name === indexName);
    
    if (!exists) {
      logger.info(`Creating Pinecone index: ${indexName}`);
      await client.createIndex({
        name: indexName,
        dimension: 384, // Dimension for Xenova/all-MiniLM-L6-v2
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        }
      });
    }
  } catch (error) {
    logger.error('Pinecone index creation error', error.message);
  }

  return client.Index(indexName);
}

/**
 * Initialize embedding model (Xenova/all-MiniLM-L6-v2)
 */
async function getEmbeddingPipeline() {
  if (!embeddingPipeline) {
    logger.info('Loading embedding model: Xenova/all-MiniLM-L6-v2');
    embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true
    });
  }
  return embeddingPipeline;
}

/**
 * Generate embedding for text
 */
export async function generateEmbedding(text) {
  const model = await getEmbeddingPipeline();
  const result = await model(text, { pooling: 'mean', normalize: true });
  return Array.from(result.data);
}

/**
 * Chunk text with overlap
 * @param {string} text - Text to chunk
 * @param {number} chunkSize - Characters per chunk (default: 500)
 * @param {number} overlap - Overlap between chunks (default: 50)
 */
export function chunkText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.substring(start, end));
    start = end - overlap;
    if (start < 0) start = 0;
  }

  return chunks;
}

/**
 * Ingest document into Pinecone
 * @param {string} docId - Unique document ID
 * @param {string} text - Document text
 * @param {object} metadata - Additional metadata
 */
export async function ingestDocument(docId, text, metadata = {}) {
  try {
    const index = await getOrCreateIndex();
    const chunks = chunkText(text, 500, 50);
    
    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);
      
      vectors.push({
        id: `${docId}-chunk-${i}`,
        values: embedding,
        metadata: {
          docId,
          chunkIndex: i,
          text: chunk,
          ...metadata
        }
      });
    }

    await index.upsert(vectors);
    logger.info(`Ingested document: ${docId}`, { chunks: vectors.length });
    
    return { success: true, docId, chunksCreated: vectors.length };
  } catch (error) {
    logger.error('Document ingestion failed', error.message);
    throw error;
  }
}

/**
 * Query Pinecone for relevant chunks
 * @param {string} question - User question
 * @param {number} topK - Number of results (default: 5)
 */
export async function queryRAG(question, topK = 5) {
  try {
    const index = await getOrCreateIndex();
    const embedding = await generateEmbedding(question);
    
    const results = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true
    });

    const chunks = results.matches
      ?.map(match => match.metadata?.text)
      .filter(text => text) || [];
    
    logger.info('RAG query executed', { question, resultsFound: chunks.length });
    
    return chunks;
  } catch (error) {
    logger.error('RAG query failed', error.message);
    throw error;
  }
}

/**
 * Clear all vectors from index (useful for development)
 */
export async function clearIndex() {
  try {
    const index = await getOrCreateIndex();
    await index.deleteAll();
    logger.info('Pinecone index cleared');
  } catch (error) {
    logger.error('Failed to clear index', error.message);
    throw error;
  }
}
