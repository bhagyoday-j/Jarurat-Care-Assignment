import { appendJSON, getAll } from '../utils/db.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new volunteer
 */
export async function registerVolunteer(volunteerData) {
  try {
    const volunteer = await appendJSON('volunteers.json', {
      name: volunteerData.name,
      email: volunteerData.email,
      phone: volunteerData.phone,
      profession: volunteerData.profession,
      availability: volunteerData.availability,
      skills: volunteerData.skills || '',
      agreement: volunteerData.agreement,
      status: 'pending' // pending, approved, rejected
    });
    
    logger.info('Volunteer registered', { volunteerId: volunteer.id, name: volunteer.name });
    return volunteer;
  } catch (error) {
    logger.error('Failed to register volunteer', error.message);
    throw error;
  }
}

/**
 * Get all volunteers
 */
export async function getAllVolunteers() {
  try {
    return await getAll('volunteers.json');
  } catch (error) {
    logger.error('Failed to get volunteers', error.message);
    throw error;
  }
}

/**
 * Get volunteers by profession
 */
export async function getVolunteersByProfession(profession) {
  try {
    const volunteers = await getAll('volunteers.json');
    return volunteers.filter(v => v.profession.toLowerCase() === profession.toLowerCase());
  } catch (error) {
    logger.error('Failed to get volunteers by profession', error.message);
    throw error;
  }
}

/**
 * Get pending volunteer applications
 */
export async function getPendingVolunteers() {
  try {
    const volunteers = await getAll('volunteers.json');
    return volunteers.filter(v => v.status === 'pending');
  } catch (error) {
    logger.error('Failed to get pending volunteers', error.message);
    throw error;
  }
}
