# Jarurat Care Foundation — Healthcare Support Web App

## Overview
Jarurat Care Foundation is a concept-level web app for a healthcare NGO that connects 
patients with support services and volunteers across India.

## Tech Stack
- React 18 + Vite
- Tailwind CSS (custom design tokens)
- React Hook Form (validation)
- Groq Llama 3 API (via OpenRouter/Groq format)
- React Router v6
- Hosted on Vercel

## AI Feature
A floating AI-powered chatbot answers FAQs 24/7 — covering patient 
registration, volunteer onboarding, available services, and general health 
queries. It maintains full conversation history for natural multi-turn dialogue, 
reducing load on human staff.

## NGO Use Case
Small NGOs lack the staff to answer repetitive intake questions around the clock.
The AI chatbot handles common queries instantly, the registration forms capture 
structured patient and volunteer data, and the blog/news section keeps the 
community informed — all in one lightweight, deployable platform.

## Setup
1. `npm install`
2. Create `.env` → `VITE_AI_API_KEY=your_key_here`
3. `npm run dev`

## Deploy (Vercel)
Add `VITE_AI_API_KEY` in Vercel → Settings → Environment Variables,
then push to GitHub and import the repo in Vercel.
