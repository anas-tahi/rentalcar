import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { carDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'OK', service: 'car-service', port: PORT }));

// Get all cars (with optional filters)
app.get('/api/cars', (req, res) => {
  const cars = carDB.findAll(req.query);
  res.json(cars);
});

// Get top cars
app.get('/api/cars/top', (_, res) => res.json(carDB.getTop()));

// Get recommended cars
app.get('/api/cars/recommended', (_, res) => res.json(carDB.getRecommended()));

// Get car by ID
app.get('/api/cars/:id', (req, res) => {
  const car = carDB.findById(req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

// Create car (admin)
app.post('/api/cars', (req, res) => {
  const car = carDB.create(req.body);
  res.status(201).json(car);
});

// Update car (admin)
app.put('/api/cars/:id', (req, res) => {
  const car = carDB.update(req.params.id, req.body);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

// Delete car (admin)
app.delete('/api/cars/:id', (req, res) => {
  const car = carDB.delete(req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ message: 'Car deleted', car });
});

app.listen(PORT, () => console.log(`🚗 Car Service running on port ${PORT}`));
