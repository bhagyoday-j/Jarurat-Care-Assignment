import { appendJSON, getAll } from '../utils/db.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new patient
 */
export async function registerPatient(patientData) {
  try {
    const patient = await appendJSON('patients.json', {
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      phone: patientData.phone,
      city: patientData.city,
      concern: patientData.concern,
      contactMethod: patientData.contactMethod
    });
    
    logger.info('Patient registered', { patientId: patient.id, name: patient.name });
    return patient;
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
    return await getAll('patients.json');
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
    const patients = await getAll('patients.json');
    return patients.filter(p => p.city.toLowerCase() === city.toLowerCase());
  } catch (error) {
    logger.error('Failed to get patients by city', error.message);
    throw error;
  }
}
