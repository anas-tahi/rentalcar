import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { bookingDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'OK', service: 'booking-service', port: PORT }));

// Create reservation
app.post('/api/reservations', async (req, res) => {
  const { userId, carId, startDate, endDate, totalAmount } = req.body;
  try {
    if (!userId || !carId || !startDate || !endDate || !totalAmount)
      return res.status(400).json({ error: 'Missing required fields' });

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()))
      return res.status(400).json({ error: 'Invalid date format' });

    if (start >= end)
      return res.status(400).json({ error: 'End date must be after start date' });

    // Check conflicts
    const conflicts = bookingDB.findByCarId(carId).filter(b =>
      b.status !== 'cancelled' &&
      new Date(b.startDate) < end &&
      new Date(b.endDate) > start
    );

    if (conflicts.length > 0)
      return res.status(400).json({ error: 'Car is already booked for these dates' });

    const booking = bookingDB.create({ userId, carId, startDate: start, endDate: end, totalAmount: parseFloat(totalAmount) });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create reservation' });
  }
});

// Get all reservations
app.get('/api/reservations', (_, res) => res.json(bookingDB.findAll()));

// Get reservations by user
app.get('/api/reservations/user/:userId', (req, res) => {
  const bookings = bookingDB.findByUserId(req.params.userId);
  res.json(bookings);
});

// Get reservation by ID
app.get('/api/reservations/:id', (req, res) => {
  const booking = bookingDB.findById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Reservation not found' });
  res.json(booking);
});

// Update reservation
app.put('/api/reservations/:id', (req, res) => {
  const booking = bookingDB.update(req.params.id, req.body);
  if (!booking) return res.status(404).json({ error: 'Reservation not found' });
  res.json(booking);
});

// Cancel/Delete reservation
app.delete('/api/reservations/:id', (req, res) => {
  const booking = bookingDB.delete(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Reservation not found' });
  res.status(204).send();
});

// Clear all (testing)
app.delete('/api/reservations', (_, res) => {
  bookingDB.clearAll();
  res.json({ message: 'All bookings cleared' });
});

app.listen(PORT, () => console.log(`📋 Booking Service running on port ${PORT}`));
