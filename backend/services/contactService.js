import { Contact } from '../models/contact.js';
import { logger } from '../utils/logger.js';

/**
 * Create a new contact message
 */
export async function createContact(contactData) {
  try {
    const contact = await Contact.create({
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message
    });
    
    logger.info('Contact message created', { contactId: contact._id, email: contact.email });
    return contact.toObject();
  } catch (error) {
    logger.error('Failed to create contact', error.message);
    throw error;
  }
}

/**
 * Get all contact messages
 */
export async function getAllContacts() {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return contacts;
  } catch (error) {
    logger.error('Failed to get contacts', error.message);
    throw error;
  }
}
