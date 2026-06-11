import { Volunteer } from '../models/volunteer.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new volunteer
 */
export async function registerVolunteer(volunteerData) {
  try {
    const volunteer = await Volunteer.create({
      name: volunteerData.name,
      email: volunteerData.email,
      phone: volunteerData.phone,
      profession: volunteerData.profession,
      availability: volunteerData.availability,
      skills: volunteerData.skills || '',
      agreement: volunteerData.agreement,
      status: 'pending' // pending, approved, rejected
    });
    
    logger.info('Volunteer registered', { volunteerId: volunteer._id, name: volunteer.name });
    return volunteer.toObject();
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
    const volunteers = await Volunteer.find().sort({ createdAt: -1 }).lean();
    return volunteers;
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
    const volunteers = await Volunteer.find({ profession: { $regex: profession, $options: 'i' } }).sort({ createdAt: -1 }).lean();
    return volunteers;
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
    const volunteers = await Volunteer.find({ status: 'pending' }).sort({ createdAt: -1 }).lean();
    return volunteers;
  } catch (error) {
    logger.error('Failed to get pending volunteers', error.message);
    throw error;
  }
}
