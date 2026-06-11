import mongoose from 'mongoose';
import { logger } from './logger.js';

/**
 * Connect to MongoDB Atlas
 */
export async function connectDB() {
  try {
    const uri = process.env.DATABASE_URL;
    
    if (!uri) {
      throw new Error('DATABASE_URL not configured in .env');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info('MongoDB Atlas connected successfully');
    return mongoose.connection;
  } catch (error) {
    logger.error('MongoDB connection failed', error.message);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error('MongoDB disconnection failed', error.message);
    throw error;
  }
}

export default mongoose;
