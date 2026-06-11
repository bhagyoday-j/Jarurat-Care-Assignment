import { logger } from '../utils/logger.js';

const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Call LLM with fallback: Groq → OpenRouter
 * @param {array} messages - Chat messages
 * @param {object} options - Configuration options
 * @returns {Promise<{content: string, provider: string}>}
 */
export async function callLLM(messages, options = {}) {
  const {
    maxTokens = 500,
    temperature = 0.7,
    systemMessage = 'You are a helpful assistant for Jarurat Care Foundation, a healthcare NGO in India.'
  } = options;

  const formattedMessages = [
    { role: 'system', content: systemMessage },
    ...messages
  ];

  // Try Groq first
  try {
    const groqResponse = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: formattedMessages,
        max_tokens: maxTokens,
        temperature: temperature
      })
    });

    if (groqResponse.ok) {
      const data = await groqResponse.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        logger.info('LLM Response', { provider: 'Groq', model: 'llama-3.1-8b-instant' });
        return { content, provider: 'Groq' };
      }
    }

    if (groqResponse.status === 401 || groqResponse.status === 403) {
      logger.warn('Groq authentication failed, trying OpenRouter');
    } else if (!groqResponse.ok) {
      logger.warn(`Groq API error: ${groqResponse.status}, trying OpenRouter`);
    }
  } catch (error) {
    logger.error('Groq API call failed', error.message);
  }

  // Fallback to OpenRouter
  try {
    const openRouterResponse = await fetch(OPENROUTER_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
        'X-Title': 'Jarurat Care'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: formattedMessages,
        max_tokens: maxTokens,
        temperature: temperature
      })
    });

    if (openRouterResponse.ok) {
      const data = await openRouterResponse.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        logger.info('LLM Response', { provider: 'OpenRouter', model: 'meta-llama/llama-3.1-8b-instruct' });
        return { content, provider: 'OpenRouter' };
      }
    }

    logger.error('OpenRouter API error', `Status: ${openRouterResponse.status}`);
  } catch (error) {
    logger.error('OpenRouter API call failed', error.message);
  }

  // Both providers failed
  logger.error('Both LLM providers failed');
  throw new Error('Both Groq and OpenRouter LLM providers failed. Please check your API keys and try again.');
}

/**
 * Call LLM with context (for RAG-aware responses)
 * @param {string} question - User question
 * @param {array} contextChunks - Relevant context from Pinecone
 * @returns {Promise<{content: string, provider: string}>}
 */
export async function callLLMWithContext(question, contextChunks = []) {
  let contextText = '';
  if (contextChunks.length > 0) {
    contextText = '\n\nRelevant context:\n' + contextChunks.map((chunk, i) => `${i + 1}. ${chunk}`).join('\n');
  }

  const systemMessage = `You are a warm, helpful assistant for Jarurat Care Foundation, a healthcare NGO in India.
Help users with: patient registration, volunteer sign-up, available services, health FAQs, and government health schemes.
Be concise (max 3 sentences per response).
Always recommend consulting a real doctor for serious medical advice.${contextText}`;

  return callLLM([{ role: 'user', content: question }], { systemMessage });
}
