# Jarurat Care Backend

Complete Node.js/Express backend for the Jarurat Care Foundation NGO application with AI chatbot, RAG system, and form data management.

## Features

- **Chat API** with LLM integration (Groq primary, OpenRouter fallback)
- **RAG System** with Pinecone + embeddings
- **Contact Management** - Store and retrieve contact form submissions
- **Patient Registration** - Manage patient support requests
- **Volunteer Management** - Handle volunteer registrations
- **JSON-Based Storage** - File-based persistence with easy MongoDB migration path

## Prerequisites

- Node.js 18+
- npm
- Pinecone API key
- Groq API key (or OpenRouter API key as fallback)

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173

# Pinecone RAG
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX=jarurat-care

# LLM Providers
GROQ_API_KEY=your_groq_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 3. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

#### GET `/health`

Check if the server is running.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-06-11T10:30:45.123Z"
}
```

---

### Chat / AI Assistant

#### POST `/api/chat`

Send a message to the AI chatbot with RAG support.

**Request Body:**
```json
{
  "question": "How do I register as a patient?"
}
```

**Response (200):**
```json
{
  "id": "1723456789012",
  "message": "How do I register as a patient?",
  "reply": "You can register as a patient on our website by visiting the Register page and selecting the Patient Support tab. Fill in your details and we'll get in touch with you.",
  "provider": "Groq",
  "contextUsed": true
}
```

**Error Response (503):**
```json
{
  "error": "LLM service unavailable. Please try again later."
}
```

**Features:**
- Automatically retrieves relevant context from Pinecone RAG
- Falls back to Groq, then OpenRouter if primary fails
- Logs which LLM provider was used
- Stores all conversations in `data/chats.json`

---

### Contacts

#### POST `/api/contacts`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "I would like to know more about your services."
}
```

**Response (201):**
```json
{
  "id": "1723456789012",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "I would like to know more about your services.",
  "createdAt": "2024-06-11T10:30:45.123Z"
}
```

#### GET `/api/contacts`

Retrieve all contact messages (admin endpoint).

**Response (200):**
```json
[
  {
    "id": "1723456789012",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "General Inquiry",
    "message": "I would like to know more about your services.",
    "createdAt": "2024-06-11T10:30:45.123Z"
  }
]
```

**Storage:** `data/contacts.json`

---

### Patients

#### POST `/api/patients`

Register a patient for support.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "age": 35,
  "gender": "Female",
  "phone": "+91 98765 43210",
  "city": "New Delhi",
  "concern": "I have persistent headaches and would like medical advice.",
  "contactMethod": "WhatsApp"
}
```

**Response (201):**
```json
{
  "id": "1723456789012",
  "name": "Jane Smith",
  "age": 35,
  "gender": "Female",
  "phone": "+91 98765 43210",
  "city": "New Delhi",
  "concern": "I have persistent headaches and would like medical advice.",
  "contactMethod": "WhatsApp",
  "createdAt": "2024-06-11T10:30:45.123Z"
}
```

#### GET `/api/patients`

Retrieve all patients.

**Query Parameters:**
- `city` (optional) - Filter by city

**Request Examples:**
- `GET /api/patients` - All patients
- `GET /api/patients?city=New Delhi` - Patients from New Delhi

**Response (200):**
```json
[
  {
    "id": "1723456789012",
    "name": "Jane Smith",
    "age": 35,
    "gender": "Female",
    "phone": "+91 98765 43210",
    "city": "New Delhi",
    "concern": "I have persistent headaches and would like medical advice.",
    "contactMethod": "WhatsApp",
    "createdAt": "2024-06-11T10:30:45.123Z"
  }
]
```

**Storage:** `data/patients.json`

---

### Volunteers

#### POST `/api/volunteers`

Register as a volunteer.

**Request Body:**
```json
{
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "+91 98765 43210",
  "profession": "Doctor",
  "availability": ["Weekdays", "Morning"],
  "skills": "General Medicine, Patient Counseling",
  "agreement": true
}
```

**Response (201):**
```json
{
  "id": "1723456789012",
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "+91 98765 43210",
  "profession": "Doctor",
  "availability": ["Weekdays", "Morning"],
  "skills": "General Medicine, Patient Counseling",
  "agreement": true,
  "status": "pending",
  "createdAt": "2024-06-11T10:30:45.123Z"
}
```

#### GET `/api/volunteers`

Retrieve volunteers.

**Query Parameters:**
- `profession` (optional) - Filter by profession
- `pending` (optional, true/false) - Get only pending applications

**Request Examples:**
- `GET /api/volunteers` - All volunteers
- `GET /api/volunteers?profession=Doctor` - Doctors
- `GET /api/volunteers?pending=true` - Pending applications

**Response (200):**
```json
[
  {
    "id": "1723456789012",
    "name": "Dr. Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "+91 98765 43210",
    "profession": "Doctor",
    "availability": ["Weekdays", "Morning"],
    "skills": "General Medicine, Patient Counseling",
    "agreement": true,
    "status": "pending",
    "createdAt": "2024-06-11T10:30:45.123Z"
  }
]
```

**Storage:** `data/volunteers.json`

---

## RAG (Retrieval Augmented Generation)

### Important Note: RAG Memory Requirements

The RAG system uses the Xenova/all-MiniLM-L6-v2 embedding model, which is a large transformer model (~80MB) that loads into memory on first use. When ingesting documents:
- **Recommended Node.js heap size:** 4GB or more
- **First ingest request:** May take 15-30 seconds as the model loads
- **Subsequent requests:** Faster as the model is cached

**To run with sufficient memory:**
```bash
node --max-old-space-size=4096 index.js
```

Or update package.json for development:
```json
"dev": "node --max-old-space-size=4096 --watch index.js"
```

### Endpoint: POST `/api/rag/ingest`

Ingest a document into the Pinecone RAG system for knowledge base.

**Request Body:**
```json
{
  "docId": "health-schemes-2024",
  "text": "Government health schemes provide free medical treatment to eligible citizens...",
  "metadata": {
    "source": "government_portal",
    "category": "health-schemes"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "docId": "health-schemes-2024",
  "chunksCreated": 8
}
```

**Details:**
- Text is automatically chunked (500 chars, 50 char overlap)
- Each chunk is embedded using Xenova/all-MiniLM-L6-v2
- Embeddings are stored in Pinecone

#### POST `/api/rag/query`

Query the RAG system for relevant information.

**Request Body:**
```json
{
  "question": "What are the government health schemes available?",
  "topK": 5
}
```

**Response (200):**
```json
{
  "question": "What are the government health schemes available?",
  "chunks": [
    "Government health schemes provide free medical treatment to eligible citizens...",
    "The Ayushman Bharat scheme covers up to 5 lakh rupees per family annually...",
    "..."
  ],
  "count": 2
}
```

**Details:**
- Returns top 5 most relevant chunks (default, customizable with `topK`)
- Used automatically by `/api/chat` endpoint
- Uses free, in-process embedding model (no API key needed)

#### POST `/api/rag/clear`

Clear all vectors from the Pinecone index (development/admin only).

**Response (200):**
```json
{
  "success": true
}
```

---

## Data Storage Architecture

### JSON Files Location: `/backend/data/`

- **`chats.json`** - Chat conversations and LLM responses
- **`contacts.json`** - Contact form submissions
- **`patients.json`** - Patient registrations
- **`volunteers.json`** - Volunteer registrations

### Example Data Structure

Each record includes:
- `id` - Unique timestamp-based ID
- `createdAt` - ISO 8601 timestamp
- `updatedAt` - ISO 8601 timestamp (if modified)
- Record-specific fields

### Migration to MongoDB

The data layer uses the **Repository/Service Pattern** for easy migration:

1. **Current:** `db.js` provides `readJSON()`, `writeJSON()`, etc.
2. **To migrate:** Replace `db.js` with MongoDB equivalents
3. **Services** remain unchanged - no changes needed in `services/*.js`
4. **Routes** remain unchanged - no changes needed in `routes/*.js`

---

## Error Handling

All endpoints return standardized error responses:

```json
{
  "error": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad request (missing/invalid fields)
- `403` - Forbidden
- `404` - Not found
- `500` - Server error
- `503` - Service unavailable (LLM providers down)

---

## LLM Provider Strategy

### Primary: Groq
- Model: `llama-3.1-8b-instant`
- Fast, reliable, free tier available

### Fallback: OpenRouter
- Model: `meta-llama/llama-3.1-8b-instruct:free`
- Automatically triggered if Groq fails or key missing

### Logging
Each chat request logs which provider was used:
```
[2024-06-11T10:30:45.123Z] INFO: LLM Response { provider: 'Groq', model: 'llama-3.1-8b-instant' }
```

---

## Embedding Model

- **Model:** `Xenova/all-MiniLM-L6-v2`
- **Dimensions:** 384
- **Advantage:** Runs locally (no API key needed)
- **Speed:** ~100-500ms per document chunk
- **Pinecone Integration:** Vectors stored with metadata for retrieval

---

## Environment Setup Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Add `PINECONE_API_KEY` from Pinecone console
- [ ] Add `GROQ_API_KEY` from Groq console
- [ ] Add `OPENROUTER_API_KEY` from OpenRouter (optional, for fallback)
- [ ] Set `FRONTEND_URL` to your frontend URL
- [ ] Run `npm install`
- [ ] Run `npm run dev` or `npm start`

---

## Testing Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# Send chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "How can I volunteer?"}'

# Register contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello"
  }'

# Get all contacts
curl http://localhost:3000/api/contacts
```

### Using Postman

1. Create a new collection
2. Add requests for each endpoint
3. Set `Content-Type: application/json` header
4. Use examples above as request bodies

---

## Logs

All activities are logged with timestamps:

```
[2024-06-11T10:30:45.123Z] INFO: Jarurat Care Backend Server running on port 3000
[2024-06-11T10:30:46.456Z] INFO: POST /api/chat
[2024-06-11T10:30:47.789Z] INFO: LLM Response { provider: 'Groq', model: 'llama-3.1-8b-instant' }
[2024-06-11T10:30:47.890Z] INFO: Chat handling created { id: '1723456789012' }
```

---

## Troubleshooting

### "LLM service unavailable" error
- Check `GROQ_API_KEY` and `OPENROUTER_API_KEY` in `.env`
- Verify API keys are valid and have quota
- Check network connectivity

### Embedding model slow to load first time
- First request takes 1-2 minutes for model download
- Subsequent requests are instant
- Model is cached locally

### CORS errors
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check browser console for exact CORS error
- Verify `Access-Control-Allow-Origin` header

### Empty data files
- Files are created automatically on first write
- Check `/backend/data/` directory

---

## Performance Notes

- Chat responses: 1-5 seconds (LLM latency)
- Embedding generation: 100-500ms per 500-char chunk
- Data retrieval: <100ms (JSON file)
- Pinecone query: 200-500ms

---

## Security Notes

⚠️ **Current Setup (Development):**
- No authentication/authorization
- API keys in `.env` file (not version controlled)

**For Production:**
- Add JWT authentication
- Implement role-based access control
- Use environment-based secrets management
- Add rate limiting
- Validate and sanitize all inputs
- Use HTTPS only

---

## File Structure

```
backend/
├── index.js                 # Main server file
├── package.json
├── .env                     # Environment variables (not in git)
├── .env.example             # Example env file
├── utils/
│   ├── db.js               # JSON database utilities
│   └── logger.js           # Logging utility
├── services/
│   ├── llm.js              # LLM integration (Groq + OpenRouter)
│   ├── rag.js              # Pinecone + embeddings
│   ├── chatService.js      # Chat business logic
│   ├── contactService.js   # Contact form handling
│   ├── patientService.js   # Patient registration
│   └── volunteerService.js # Volunteer management
├── routes/
│   ├── chatRoutes.js       # Chat endpoints
│   ├── contactRoutes.js    # Contact endpoints
│   ├── patientRoutes.js    # Patient endpoints
│   ├── volunteerRoutes.js  # Volunteer endpoints
│   └── ragRoutes.js        # RAG endpoints
└── data/                   # JSON data files (generated at runtime)
    ├── chats.json
    ├── contacts.json
    ├── patients.json
    └── volunteers.json
```

---

## License

MIT

---

## Support

For issues or questions, contact: support@jarurat.care
