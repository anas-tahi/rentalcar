import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import fetch from 'node-fetch';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const {
  AUTH_SERVICE,
  CAR_SERVICE,
  BOOKING_SERVICE,
  PAYMENT_SERVICE,
  JWT_SECRET
} = process.env;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// ─────────────────────────────────────────────
// Auth Middleware
// ─────────────────────────────────────────────
const authenticate = (req, res, next) => {
  const raw = req.headers.authorization;
  const token = raw?.startsWith('Bearer ') ? raw.split(' ')[1] : raw;

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ gateway: 'OK', port: PORT }));

// ─────────────────────────────────────────────
// AUTH ROUTES (manual forwarding)
// ─────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const r = await fetch(`${AUTH_SERVICE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(503).json({ error: 'Auth service unavailable' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const r = await fetch(`${AUTH_SERVICE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(503).json({ error: 'Auth service unavailable' });
  }
});

app.post('/api/auth/logout', (_, res) => {
  res.json({ message: 'Logout successful' });
});

app.get('/api/auth/users/:id', authenticate, async (req, res) => {
  try {
    const r = await fetch(`${AUTH_SERVICE}/api/auth/users/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch {
    res.status(503).json({ error: 'Auth service unavailable' });
  }
});

app.get('/api/auth/users', authenticate, async (req, res) => {
  try {
    const r = await fetch(`${AUTH_SERVICE}/api/auth/users`);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch {
    res.status(503).json({ error: 'Auth service unavailable' });
  }
});

// ─────────────────────────────────────────────
// CARS SERVICE (public GET, admin for write)
// ─────────────────────────────────────────────
app.use(
  '/api/cars',
  (req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      return authenticate(req, res, () => {
        if (!req.user?.isAdmin)
          return res.status(403).json({ error: 'Admin only' });
        next();
      });
    }
    next();
  },
  createProxyMiddleware({
    target: CAR_SERVICE,
    changeOrigin: true,
    on: {
      error: (_, __, res) =>
        res.status(503).json({ error: 'Car service unavailable' })
    }
  })
);

// ─────────────────────────────────────────────
// RESERVATIONS SERVICE (protected)
// ─────────────────────────────────────────────
app.use(
  '/api/reservations',
  authenticate,
  createProxyMiddleware({
    target: BOOKING_SERVICE,
    changeOrigin: true,
    on: {
      error: (_, __, res) =>
        res.status(503).json({ error: 'Booking service unavailable' })
    }
  })
);

// ─────────────────────────────────────────────
// PAYMENTS SERVICE (protected)
// ─────────────────────────────────────────────
app.use(
  '/api/payment',
  authenticate,
  createProxyMiddleware({
    target: PAYMENT_SERVICE,
    changeOrigin: true,
    on: {
      error: (_, __, res) =>
        res.status(503).json({ error: 'Payment service unavailable' })
    }
  })
);

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────
app.use((_, res) => res.status(404).json({ error: 'Route not found' }));

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 API Gateway → port ${PORT}`);
  console.log(`   🔐 Auth    → ${AUTH_SERVICE}`);
  console.log(`   🚗 Cars    → ${CAR_SERVICE}`);
  console.log(`   📋 Booking → ${BOOKING_SERVICE}`);
  console.log(`   💳 Payment → ${PAYMENT_SERVICE}\n`);
});
