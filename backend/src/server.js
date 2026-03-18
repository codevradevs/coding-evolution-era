require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./db/connection');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vaultRoutes = require('./routes/vault');
const challengeRoutes = require('./routes/challenges');
const trackerRoutes = require('./routes/tracker');
const networkRoutes = require('./routes/network');
const contactRoutes = require('./routes/contact');
const tipsRoutes = require('./routes/tips');
const productsRoutes = require('./routes/products');
const blogsRoutes = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' },
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Codevra Devs API', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/blogs', blogsRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Codevra Devs API running on port ${PORT}`);
});

module.exports = app;
