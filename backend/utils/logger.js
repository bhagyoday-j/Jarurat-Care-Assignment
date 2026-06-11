/**
 * Simple logging utility with timestamps
 */

function formatTimestamp() {
  return new Date().toISOString();
}

export const logger = {
  info: (message, data = '') => {
    console.log(`[${formatTimestamp()}] INFO: ${message}`, data);
  },
  error: (message, error = '') => {
    console.error(`[${formatTimestamp()}] ERROR: ${message}`, error);
  },
  warn: (message, data = '') => {
    console.warn(`[${formatTimestamp()}] WARN: ${message}`, data);
  },
  debug: (message, data = '') => {
    console.debug(`[${formatTimestamp()}] DEBUG: ${message}`, data);
  }
};
