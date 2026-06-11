import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { connectDB } from './utils/mongodb.js';
import { initializeFAQCache } from './services/faqService.js';

// Routes
import chatRoutes from './routes/chatRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import ragRoutes from './routes/ragRoutes.js';
import faqRoutes from './routes/faqRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/faq', faqRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    // Initialize FAQ cache from MongoDB
    await initializeFAQCache();
    logger.info('FAQ cache initialized successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Jarurat Care Backend Server running on port ${PORT}`);
      logger.info(`CORS enabled for: ${FRONTEND_URL}`);
      logger.info(`Frontend URL: ${FRONTEND_URL}`);
      logger.info(`MongoDB connected - FAQ system active`);
    });
  } catch (error) {
    logger.error('Failed to start server', error.message);
    process.exit(1);
  }
}

startServer();
