import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationsByUserId,
  updateReservation,
  deleteReservation,
  clearAllBookings,
} from '../controllers/reservationController.js';

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.get('/reservations/:userId', getReservationsByUserId);
router.put('/reservations/:reservationId', updateReservation);  // Use reservationId
router.delete('/reservations/:reservationId', deleteReservation);  // Use reservationId
router.delete('/reservations', clearAllBookings); // Clear all bookings (for testing)

export default router;
