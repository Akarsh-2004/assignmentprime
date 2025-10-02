const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const v1 = require('./routes/ver1'); // ✅ changed from ver1 → v1

const app = express();

// Security middleware
app.use(helmet());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_ORIGIN, // make sure there is NO trailing slash
  credentials: true
}));


// Rate limiting
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120             // 120 requests per window per IP
}));

// API routes
app.use('/api/ver1', v1); // ✅ changed from /api/ver1 → /api/v1

// Simple health check
app.get('/health', (req, res) => res.json({ ok: true }));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
