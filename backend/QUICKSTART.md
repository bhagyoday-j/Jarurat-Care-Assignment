# Quick Start Guide

## Installation & Running

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up Environment
Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
PINECONE_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here (optional for fallback)
```

### Step 3: Start Server
```bash
npm run dev
```

Server will be available at `http://localhost:3000`

---

## Quick Test

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Submit Contact Form
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello world"
  }'
```

### 3. Send Chat Message
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "How can I register as a patient?"}'
```

### 4. Initialize RAG Knowledge Base
```bash
node initializeRAG.js
```

---

## Next Steps

1. **Update Frontend:** Modify `ChatBot.jsx` to call `POST /api/chat` instead of calling Groq directly
2. **Update Form Submissions:** 
   - Contact form → `POST /api/contacts`
   - Patient form → `POST /api/patients`
   - Volunteer form → `POST /api/volunteers`
3. **Test Integration:** Run frontend and backend together
4. **Production:** Deploy backend to cloud (Vercel, Render, AWS Lambda, etc.)

---

## Documentation

See [README.md](./README.md) for comprehensive API documentation.
