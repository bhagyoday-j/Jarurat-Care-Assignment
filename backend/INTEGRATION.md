# Frontend Integration Guide

This document explains how to connect the React frontend to the backend API.

## Current State

The frontend currently:
- Makes direct API calls to Groq for chat
- Uses `console.log()` for form submissions (not sending to backend)

## Required Changes

### 1. Update ChatBot Component

**File:** `frontend/src/components/ChatBot.jsx`

Replace the direct Groq API call with a call to the backend:

```javascript
// OLD (Lines ~41-66): Direct Groq call
// const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { ... })

// NEW: Backend API call
try {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: text
    })
  });

  const data = await response.json();
  if (data.reply) {
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
  } else {
    throw new Error("Invalid response");
  }
} catch (error) {
  console.error(error);
  setMessages([...newMessages, { role: 'assistant', content: "I'm having trouble connecting. Please try again in a moment." }]);
} finally {
  setIsTyping(false);
}
```

### 2. Update Contact Form

**File:** `frontend/src/pages/Contact.jsx`

Modify the `onSubmit` function to send data to backend:

```javascript
const onSubmit = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setIsSubmitted(true);
      reset();
    } else {
      console.error('Failed to submit contact form');
    }
  } catch (error) {
    console.error('Error submitting contact:', error);
  }
};
```

### 3. Update Patient Registration Form

**File:** `frontend/src/pages/Register.jsx`

Modify the `onSubmitPatient` function:

```javascript
const onSubmitPatient = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setIsSubmitted(true);
      resetPatient();
    } else {
      console.error('Failed to register patient');
    }
  } catch (error) {
    console.error('Error registering patient:', error);
  }
};
```

### 4. Update Volunteer Registration Form

**File:** `frontend/src/pages/Register.jsx`

Modify the `onSubmitVolunteer` function:

```javascript
const onSubmitVolunteer = async (data) => {
  try {
    // Convert availability array from checkboxes
    const availability = Object.keys(data.availability).filter(key => data.availability[key]);
    
    const response = await fetch('http://localhost:3000/api/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        availability
      })
    });

    if (response.ok) {
      setIsSubmitted(true);
      resetVolunteer();
    } else {
      console.error('Failed to register volunteer');
    }
  } catch (error) {
    console.error('Error registering volunteer:', error);
  }
};
```

## Environment Setup

### Frontend

Create `.env` in the `frontend` directory (if not already present):

```env
VITE_API_URL=http://localhost:3000
```

Or hardcode during development: `http://localhost:3000`

For production, update URLs:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## CORS Handling

The backend is configured with CORS to accept requests from:
- `http://localhost:5173` (default Vite frontend)
- Any URL specified in `.env` `FRONTEND_URL` variable

If you get CORS errors:
1. Check that frontend is running on the correct port
2. Update `FRONTEND_URL` in backend `.env`
3. Restart backend server

## Testing Integration

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Test Forms

**Contact Form:**
- Go to http://localhost:5173/contact
- Fill and submit form
- Check backend console for confirmation
- Check `backend/data/contacts.json`

**Patient Registration:**
- Go to http://localhost:5173/register
- Select "Patient Support" tab
- Submit form
- Check `backend/data/patients.json`

**Volunteer Registration:**
- Go to http://localhost:5173/register
- Select "Volunteer Registration" tab
- Submit form
- Check `backend/data/volunteers.json`

**Chat:**
- Click chat widget
- Send message
- Should get response from LLM via backend
- Check `backend/data/chats.json`

## Troubleshooting

### "Cannot reach http://localhost:3000"
- Make sure backend is running: `npm run dev` in backend folder
- Check port 3000 is not blocked

### CORS error in browser console
- Backend might be using wrong FRONTEND_URL
- Update `.env` in backend and restart

### 404 errors on API routes
- Check endpoint path matches exactly
- Verify request method (GET/POST)
- Check request body format

### Empty responses from chat
- Check Groq/OpenRouter API keys in backend `.env`
- Check network connectivity
- Look at backend logs for errors

## API Response Examples

### Chat Response
```json
{
  "id": "1723456789012",
  "message": "How do I register?",
  "reply": "Visit the Register page...",
  "provider": "Groq",
  "contextUsed": true
}
```

### Contact Response
```json
{
  "id": "1723456789012",
  "name": "John",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello",
  "createdAt": "2024-06-11T10:30:45.123Z"
}
```

### Patient Response
```json
{
  "id": "1723456789012",
  "name": "Jane",
  "age": 35,
  "gender": "Female",
  "phone": "+91...",
  "city": "Delhi",
  "concern": "...",
  "contactMethod": "WhatsApp",
  "createdAt": "2024-06-11T10:30:45.123Z"
}
```

## Production Deployment

### Backend Deployment Options

1. **Vercel** (Node.js)
   - Push code to GitHub
   - Connect to Vercel
   - Set environment variables
   - Deploy

2. **Render** (Node.js)
   - Create new Web Service
   - Connect GitHub repo
   - Set environment variables
   - Deploy

3. **AWS Lambda** + API Gateway
   - Deploy Express app to Lambda
   - Set up API Gateway
   - Configure environment variables

### Frontend Deployment Options

1. **Vercel** (Recommended for Vite)
   ```bash
   npm run build
   # Deploy dist folder
   ```

2. **Netlify**
   ```bash
   npm run build
   # Drag dist folder to Netlify
   ```

3. **GitHub Pages**
   - Must use absolute backend URLs
   - Configure CORS properly

### Update URLs in Production

Frontend `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

Backend `.env`:
```env
FRONTEND_URL=https://your-frontend-url.com
```

## Support

If you encounter issues:
1. Check backend logs: `npm run dev`
2. Check browser console for errors
3. Verify API keys in `.env`
4. Review request/response in browser DevTools Network tab
5. Check [README.md](./README.md) for comprehensive documentation
