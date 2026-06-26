import apiRequest from './apiRequest';

export const bookingsAPI = {
  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await apiRequest.get('/reservations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch bookings' };
    }
  },

  // Get bookings by user ID
  getBookingsByUserId: async (userId) => {
    try {
      const response = await apiRequest.get(`/reservations/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user bookings' };
    }
  },

  // Create new booking
  createBooking: async (bookingData) => {
    try {
      console.log('API: Creating booking with data:', bookingData);
      const response = await apiRequest.post('/reservations', bookingData);
      console.log('API: Booking response:', response);
      console.log('API: Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Booking error:', error);
      console.error('API: Error response:', error.response);
      console.error('API: Error status:', error.response?.status);
      console.error('API: Error data:', error.response?.data);
      throw error.response?.data || { message: 'Failed to create booking' };
    }
  },

  // Update booking
  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await apiRequest.put(`/reservations/${bookingId}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update booking' };
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      const response = await apiRequest.delete(`/reservations/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete booking' };
    }
  }
};

export default bookingsAPI;
