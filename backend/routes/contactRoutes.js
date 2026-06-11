import express from 'express';
import { createContact, getAllContacts } from '../services/contactService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/contacts
 * Submit a contact message
 * Request body: { name: string, email: string, subject: string, message: string }
 * Response: { id: string, name: string, email: string, subject: string, message: string, createdAt: string }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (name, email, subject, message) are required' });
    }

    const contact = await createContact({ name, email, subject, message });
    res.status(201).json(contact);
  } catch (error) {
    logger.error('Contact creation error', error.message);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

/**
 * GET /api/contacts
 * Retrieve all contact messages (admin endpoint)
 * Response: [ { id, name, email, subject, message, createdAt }, ... ]
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (error) {
    logger.error('Get contacts error', error.message);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

export default router;
