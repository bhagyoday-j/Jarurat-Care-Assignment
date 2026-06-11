import express from 'express';
import {
  registerVolunteer,
  getAllVolunteers,
  getVolunteersByProfession,
  getPendingVolunteers
} from '../services/volunteerService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/volunteers
 * Register a new volunteer
 * Request body: { name, email, phone, profession, availability, skills, agreement }
 * Response: { id, name, email, phone, profession, availability, skills, agreement, status, createdAt }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, profession, availability, skills, agreement } = req.body;

    if (!name || !email || !phone || !profession || !availability || !agreement) {
      return res.status(400).json({ 
        error: 'Required fields missing: name, email, phone, profession, availability, agreement' 
      });
    }

    const volunteer = await registerVolunteer({
      name,
      email,
      phone,
      profession,
      availability,
      skills,
      agreement
    });

    res.status(201).json(volunteer);
  } catch (error) {
    logger.error('Volunteer registration error', error.message);
    res.status(500).json({ error: 'Failed to register volunteer' });
  }
});

/**
 * GET /api/volunteers
 * Retrieve volunteers (admin endpoint)
 * Query: ?profession=<optional_profession_filter> or ?pending=true
 * Response: [ { id, name, email, phone, profession, availability, skills, agreement, status, createdAt }, ... ]
 */
router.get('/', async (req, res) => {
  try {
    const { profession, pending } = req.query;
    let volunteers;

    if (pending === 'true') {
      volunteers = await getPendingVolunteers();
    } else if (profession) {
      volunteers = await getVolunteersByProfession(profession);
    } else {
      volunteers = await getAllVolunteers();
    }

    res.json(volunteers);
  } catch (error) {
    logger.error('Get volunteers error', error.message);
    res.status(500).json({ error: 'Failed to retrieve volunteers' });
  }
});

export default router;
