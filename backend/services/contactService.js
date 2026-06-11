import { appendJSON, getAll } from '../utils/db.js';
import { logger } from '../utils/logger.js';

/**
 * Create a new contact message
 */
export async function createContact(contactData) {
  try {
    const contact = await appendJSON('contacts.json', {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message
    });
    
    logger.info('Contact message created', { contactId: contact.id, email: contact.email });
    return contact;
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
    return await getAll('contacts.json');
  } catch (error) {
    logger.error('Failed to get contacts', error.message);
    throw error;
  }
}
