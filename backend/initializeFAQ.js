import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './utils/mongodb.js';
import { saveFAQ, getFAQStats } from './services/faqService.js';
import { logger } from './utils/logger.js';

dotenv.config();

/**
 * Initialize FAQ database with sample questions
 */
async function initializeFAQDatabase() {
  try {
    await connectDB();
    logger.info('Connected to MongoDB');

    // Sample FAQs for Jarurat Care
    const faqs = [
      {
        question: 'How do I register as a patient?',
        answer: 'To register as a patient, visit the Register page and click on the Patient Support tab. Fill in your personal information including name, age, gender, phone number, city, and describe your health concern. Select your preferred contact method (Phone, WhatsApp, or Email) and submit. Our team will contact you within 24-48 hours.',
        category: 'registration',
        keywords: ['patient', 'register', 'registration', 'sign up', 'how to'],
        priority: 10
      },
      {
        question: 'How can I volunteer with Jarurat Care?',
        answer: 'You can volunteer by visiting the Register page and clicking on the Volunteer Registration tab. Provide your contact details, select your profession, and indicate your availability. Tell us about your skills and experience, agree to our code of conduct, and submit. We will review your application and contact you within 3-5 business days.',
        category: 'volunteer',
        keywords: ['volunteer', 'volunteering', 'help', 'contribute', 'register volunteer'],
        priority: 10
      },
      {
        question: 'What services does Jarurat Care offer?',
        answer: 'Jarurat Care offers free and subsidized healthcare services including general medical consultations, health check-ups, vaccinations, maternal and child health programs, mental health counseling, and health education workshops. All services are designed to be affordable and accessible to underserved communities.',
        category: 'services',
        keywords: ['services', 'what do you offer', 'programs', 'help', 'available'],
        priority: 9
      },
      {
        question: 'Is Jarurat Care free?',
        answer: 'Yes, Jarurat Care provides free and subsidized healthcare services to underserved communities in India. Our goal is to make quality healthcare accessible to everyone regardless of their financial status.',
        category: 'services',
        keywords: ['free', 'cost', 'price', 'charge', 'payment'],
        priority: 8
      },
      {
        question: 'What are the government health schemes available?',
        answer: 'India offers several government health schemes including Ayushman Bharat (covering up to 5 lakh rupees per family annually), PMJAY (Pradhan Mantri Jan Arogya Yojana - covers 100 million families), and ESI Scheme (for organized sector workers). State-specific schemes also vary by location. Contact your state health department for eligibility and benefits.',
        category: 'health',
        keywords: ['government', 'schemes', 'health scheme', 'insurance', 'benefits'],
        priority: 8
      },
      {
        question: 'How do I contact Jarurat Care?',
        answer: 'You can reach Jarurat Care through multiple channels: Phone: +91 98765 43210, Email: support@jarurat.care, or use our website contact form. You can also visit us at 123 Health Avenue, New Delhi, India 110001. We are available 9 AM to 6 PM, Monday to Friday (excluding holidays).',
        category: 'general',
        keywords: ['contact', 'phone', 'email', 'address', 'reach us', 'how to contact'],
        priority: 9
      },
      {
        question: 'What should I do in a medical emergency?',
        answer: 'In a medical emergency, please call your nearest emergency services or visit the nearest hospital. For non-emergencies, you can contact Jarurat Care at +91 98765 43210. Always consult a qualified doctor immediately for serious medical conditions.',
        category: 'health',
        keywords: ['emergency', 'urgent', 'hospital', 'urgent care', 'help'],
        priority: 10
      },
      {
        question: 'Can I get a consultation online?',
        answer: 'Yes, Jarurat Care offers both in-person and consultation services. For online consultations, please register as a patient first and select your preferred contact method. Our healthcare professionals will be in touch to schedule your consultation.',
        category: 'services',
        keywords: ['online', 'consultation', 'virtual', 'remote', 'video call'],
        priority: 7
      },
      {
        question: 'What vaccinations are available?',
        answer: 'We provide vaccinations as per government health guidelines and recommended immunization schedules. For specific vaccination queries, please register as a patient or contact us directly. Our team will guide you on available vaccines and their benefits.',
        category: 'health',
        keywords: ['vaccination', 'vaccine', 'immunization', 'immunize'],
        priority: 7
      },
      {
        question: 'Do you provide mental health support?',
        answer: 'Yes, Jarurat Care provides mental health counseling and support services. We have trained counselors and mental health professionals who can help with stress management, anxiety, depression, and other mental health concerns. Contact us to schedule a session.',
        category: 'services',
        keywords: ['mental health', 'counseling', 'mental', 'psychology', 'stress'],
        priority: 8
      },
      {
        question: 'What qualifications do your doctors have?',
        answer: 'Jarurat Care works with qualified and registered healthcare professionals including MBBS doctors, nursing staff, pharmacists, and counselors. All our team members are verified and follow professional ethics and standards.',
        category: 'general',
        keywords: ['doctor', 'qualifications', 'credentials', 'qualified'],
        priority: 6
      },
      {
        question: 'How long does it take to get an appointment?',
        answer: 'After registering as a patient, our team will contact you within 24-48 hours to schedule an appointment. Urgent cases may be prioritized. For specific appointment inquiries, call us at +91 98765 43210.',
        category: 'services',
        keywords: ['appointment', 'schedule', 'timing', 'when', 'how long'],
        priority: 7
      },
      {
        question: 'What should I bring for my first visit?',
        answer: 'Please bring a valid ID, any previous medical records or health reports you have, and a list of current medications (if any). This helps our doctors provide better care. For online consultations, make sure you have a stable internet connection.',
        category: 'general',
        keywords: ['visit', 'appointment', 'documents', 'bring', 'first time'],
        priority: 6
      },
      {
        question: 'Is there a follow-up care available?',
        answer: 'Yes, Jarurat Care provides comprehensive follow-up care. After your initial consultation, our team will schedule follow-up appointments as needed and monitor your health progress.',
        category: 'services',
        keywords: ['follow-up', 'aftercare', 'follow up', 'next step'],
        priority: 6
      },
      {
        question: 'How can I provide feedback?',
        answer: 'We value your feedback! You can use the Contact page on our website to send us your suggestions, feedback, or complaints. We review all feedback and use it to improve our services continuously.',
        category: 'general',
        keywords: ['feedback', 'suggestion', 'complaint', 'review', 'opinion'],
        priority: 5
      }
    ];

    logger.info(`Adding ${faqs.length} FAQs to the database...`);

    for (const faq of faqs) {
      try {
        const result = await saveFAQ(faq);
        logger.info(`FAQ added: ${faq.question.substring(0, 50)}...`);
      } catch (error) {
        logger.warn(`Failed to add FAQ: ${faq.question}`, error.message);
      }
    }

    // Display statistics
    const stats = await getFAQStats();
    logger.info('FAQ Database Statistics:', stats);

    logger.info('✅ FAQ database initialization complete!');
  } catch (error) {
    logger.error('Failed to initialize FAQ database', error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

// Run initialization
initializeFAQDatabase().then(() => {
  logger.info('Initialization script finished');
  process.exit(0);
}).catch(error => {
  logger.error('Initialization failed', error.message);
  process.exit(1);
});
