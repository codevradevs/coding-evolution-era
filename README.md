# Codevra Devs - MERN Stack

Full MERN stack rebuild of Codevra HQ with the same design, animations, and features.

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- Vite (fast build tool)
- React Router v6
- Framer Motion (animations)
- Tailwind CSS
- Axios

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running locally or update MONGODB_URI in `.env`

4. Start the server:
```bash
npm run dev
```

Backend runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend/codevrafront
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on http://localhost:3000

## Features

- ✅ Full authentication system (register, login, logout)
- ✅ Developer Tools Hub (JWT decoder, hash generator, Base64, regex, JSON formatter)
- ✅ Secure Vault (encrypted notes)
- ✅ Coding Arena (challenges and submissions)
- ✅ Learning Tracker (courses, certifications, skills)
- ✅ Startup Network (profiles and connections)
- ✅ Contact form
- ✅ Same animations and design as original
- ✅ Responsive design
- ✅ Fast loading with Vite

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- POST /api/auth/refresh

### Vault
- GET /api/vault
- POST /api/vault
- PUT /api/vault/:id
- DELETE /api/vault/:id

### Challenges
- GET /api/challenges
- GET /api/challenges/:id
- POST /api/challenges/:id/submit
- GET /api/challenges/user/submissions

### Tracker
- GET /api/tracker
- POST /api/tracker
- PUT /api/tracker/:id
- DELETE /api/tracker/:id

### Network
- GET /api/network/profiles
- GET /api/network/profile
- POST /api/network/profile

### Contact
- POST /api/contact
