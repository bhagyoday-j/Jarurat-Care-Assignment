import dotenv from 'dotenv';
import { ingestDocument } from './services/rag.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

/**
 * Initialize the backend with sample knowledge base documents
 * Run this once to populate the RAG system with useful content
 */
async function initializeKnowledgeBase() {
  logger.info('Initializing RAG knowledge base...');

  const documents = [
    {
      docId: 'jarurat-care-intro',
      text: `Jarurat Care Foundation is a healthcare NGO in India dedicated to providing affordable and accessible healthcare services to underserved communities. We offer patient support, volunteer opportunities, and health education programs.`,
      metadata: { category: 'about', type: 'organization' }
    },
    {
      docId: 'patient-registration-guide',
      text: `To register as a patient, visit the Register page and click on the Patient Support tab. Fill in your personal information including name, age, gender, phone number, city, and describe your health concern. Select your preferred contact method (Phone, WhatsApp, or Email) and submit. Our team will contact you within 24-48 hours.`,
      metadata: { category: 'patients', type: 'guide' }
    },
    {
      docId: 'volunteer-registration-guide',
      text: `Interested in volunteering? Click on the Volunteer Registration tab in the Register page. Provide your contact details, select your profession (Doctor, Nurse, Pharmacist, Counselor, Admin, or Other), and indicate your availability (Weekdays, Weekends, Morning, Evening). Tell us about your skills and experience. Agree to our volunteer code of conduct and submit. Pending applications will be reviewed and approved within 3-5 business days.`,
      metadata: { category: 'volunteers', type: 'guide' }
    },
    {
      docId: 'health-schemes-india',
      text: `India offers several government health schemes. Ayushman Bharat provides coverage up to 5 lakh rupees per family annually for secondary and tertiary hospitalization. PMJAY (Pradhan Mantri Jan Arogya Yojana) covers 100 million families for health insurance. ESI Scheme covers organized sector workers. State-specific schemes vary by location. Check with your state health department for eligibility and benefits.`,
      metadata: { category: 'health', type: 'schemes' }
    },
    {
      docId: 'common-health-issues',
      text: `Common health issues in India include respiratory infections, water-borne diseases, malaria, diabetes, and hypertension. Prevention includes clean drinking water, vaccination, proper sanitation, regular exercise, and healthy diet. For any health concerns, consult a qualified doctor. Jarurat Care partners with healthcare providers to offer affordable consultations and follow-up care.`,
      metadata: { category: 'health', type: 'faq' }
    },
    {
      docId: 'contact-information',
      text: `Jarurat Care Foundation is located at 123 Health Avenue, New Delhi, India 110001. Phone: +91 98765 43210. Email: support@jarurat.care. You can also reach out through our website contact form. We are available 9 AM to 6 PM, Monday to Friday (excluding holidays).`,
      metadata: { category: 'contact', type: 'info' }
    },
    {
      docId: 'services-offered',
      text: `Jarurat Care offers free and subsidized healthcare services including general medical consultations, health check-ups, vaccinations, maternal and child health programs, mental health counseling, and health education workshops. All services are designed keeping affordability and accessibility in mind.`,
      metadata: { category: 'services', type: 'overview' }
    },
    {
      docId: 'volunteer-benefits',
      text: `Volunteers at Jarurat Care gain valuable experience in healthcare delivery, make a meaningful impact on underserved communities, build professional networks, receive certificates of participation, and get priority consideration for positions if we hire. Flexible scheduling accommodates working professionals and students.`,
      metadata: { category: 'volunteers', type: 'benefits' }
    }
  ];

  for (const doc of documents) {
    try {
      const result = await ingestDocument(doc.docId, doc.text, doc.metadata);
      logger.info(`Document ingested: ${doc.docId}`, { chunks: result.chunksCreated });
    } catch (error) {
      logger.error(`Failed to ingest ${doc.docId}`, error.message);
    }
  }

  logger.info('Knowledge base initialization complete');
}

// Run initialization
initializeKnowledgeBase().catch(err => {
  logger.error('Initialization failed', err.message);
  process.exit(1);
});
