# OAuth Setup Instructions

## 1. Install Required Packages

```bash
cd backend
npm install passport passport-google-oauth20 passport-github2 express-session
```

## 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (production)
7. Copy Client ID and Client Secret

## 3. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: Codevra
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Click "Register application"
5. Copy Client ID and generate Client Secret

## 4. Update Backend .env

Add these to your `backend/.env`:

```env
# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# URLs
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Session Secret (generate a random string)
SESSION_SECRET=your_random_session_secret_here
```

## 5. Update User Model

Add these fields to your User schema in `backend/src/models/index.js`:

```javascript
googleId: { type: String, sparse: true },
githubId: { type: String, sparse: true },
avatar: { type: String },
provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
```

## 6. Update server.js

Add passport initialization in `backend/src/server.js`:

```javascript
const session = require('express-session');
const passport = require('./config/passport');

// After express() initialization
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
```

## 7. Frontend Environment

Create/update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## 8. Test OAuth Flow

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Go to `/auth/login`
4. Click "Continue with Google" or "Continue with GitHub"
5. Complete OAuth flow
6. You should be redirected back and logged in

## Security Notes

- Never commit .env files
- Use HTTPS in production
- Set proper CORS origins
- Implement rate limiting on auth routes
- Use secure session cookies in production
