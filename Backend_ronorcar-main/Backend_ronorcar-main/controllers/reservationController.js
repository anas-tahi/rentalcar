import { bookingService } from '../lib/database.js';

export const createReservation = async (req, res) => {
  try {
    console.log('Request body received:', req.body);
    
    const { userId, carId, startDate, endDate, totalAmount } = req.body;

    console.log('Creating reservation:', { userId, carId, startDate, endDate, totalAmount });

    // Validate required fields
    if (!userId || !carId || !startDate || !endDate || !totalAmount) {
      console.log('Missing required fields:', { userId, carId, startDate, endDate, totalAmount });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Parse dates properly
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Check if car is available for the selected dates
    const existingBookings = await bookingService.findAll();
    console.log('Existing bookings:', existingBookings);
    
    const carBookings = existingBookings.filter(booking => 
      booking.carId === carId && 
      booking.status !== 'cancelled' &&
      new Date(booking.startDate) < end &&
      new Date(booking.endDate) > start
    );

    console.log('Conflicting bookings:', carBookings);

    if (carBookings.length > 0) {
      return res.status(400).json({ error: 'Car is already booked for these dates' });
    }

    const reservation = await bookingService.create({
      userId,
      carId,
      startDate: start,
      endDate: end,
      status: 'pending',
      totalAmount: parseFloat(totalAmount),
    });

    console.log('Reservation created successfully:', reservation);
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Reservation creation error:', error);
    console.error('Error stack:', error.stack);
    res.status(400).json({ error: error.message || 'Failed to create reservation' });
  }
};

// Helper function to clear all bookings (for testing)
export const clearAllBookings = async (req, res) => {
  try {
    await bookingService.clearAll();
    res.status(200).json({ message: 'All bookings cleared successfully' });
  } catch (error) {
    console.error('Error clearing bookings:', error);
    res.status(500).json({ error: 'Failed to clear bookings' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await bookingService.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await bookingService.findByUserId(userId);

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'Reservations not found' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status, startDate, endDate, totalAmount } = req.body;

    const reservation = await bookingService.update(reservationId, { 
      status, 
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      totalAmount: parseFloat(totalAmount) 
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const deletedReservation = await bookingService.delete(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
