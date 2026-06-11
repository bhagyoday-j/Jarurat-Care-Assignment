import express from 'express';
import {
  registerPatient,
  getAllPatients,
  getPatientsByCity
} from '../services/patientService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/patients
 * Register a new patient
 * Request body: { name, age, gender, phone, city, concern, contactMethod }
 * Response: { id, name, age, gender, phone, city, concern, contactMethod, createdAt }
 */
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, phone, city, concern, contactMethod } = req.body;

    if (!name || !age || !gender || !phone || !city || !concern || !contactMethod) {
      return res.status(400).json({ 
        error: 'All fields required: name, age, gender, phone, city, concern, contactMethod' 
      });
    }

    const patient = await registerPatient({
      name,
      age,
      gender,
      phone,
      city,
      concern,
      contactMethod
    });

    res.status(201).json(patient);
  } catch (error) {
    logger.error('Patient registration error', error.message);
    res.status(500).json({ error: 'Failed to register patient' });
  }
});

/**
 * GET /api/patients
 * Retrieve all patients (admin endpoint)
 * Query: ?city=<optional_city_filter>
 * Response: [ { id, name, age, gender, phone, city, concern, contactMethod, createdAt }, ... ]
 */
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    let patients;

    if (city) {
      patients = await getPatientsByCity(city);
    } else {
      patients = await getAllPatients();
    }

    res.json(patients);
  } catch (error) {
    logger.error('Get patients error', error.message);
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
});

export default router;
