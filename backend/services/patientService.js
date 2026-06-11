import { Patient } from '../models/patient.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new patient
 */
export async function registerPatient(patientData) {
  try {
    const patient = await Patient.create({
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      phone: patientData.phone,
      city: patientData.city,
      concern: patientData.concern,
      contactMethod: patientData.contactMethod
    });
    
    logger.info('Patient registered', { patientId: patient._id, name: patient.name });
    return patient.toObject();
  } catch (error) {
    logger.error('Failed to register patient', error.message);
    throw error;
  }
}

/**
 * Get all patients
 */
export async function getAllPatients() {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 }).lean();
    return patients;
  } catch (error) {
    logger.error('Failed to get patients', error.message);
    throw error;
  }
}

/**
 * Get patients by city
 */
export async function getPatientsByCity(city) {
  try {
    const patients = await Patient.find({ city: { $regex: city, $options: 'i' } }).sort({ createdAt: -1 }).lean();
    return patients;
  } catch (error) {
    logger.error('Failed to get patients by city', error.message);
    throw error;
  }
}
