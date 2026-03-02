import apiRequest from './apiRequest';

export const carsAPI = {
  // Get all cars
  getAllCars: async () => {
    try {
      const response = await apiRequest.get('/cars/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cars' };
    }
  },

  // Get car by ID
  getCarById: async (id) => {
    try {
      const response = await apiRequest.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch car' };
    }
  },

  // Get top cars
  getTopCars: async () => {
    try {
      const response = await apiRequest.get('/cars/topCars');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch top cars' };
    }
  },

  // Get recommended cars
  getRecommendedCars: async () => {
    try {
      const response = await apiRequest.get('/cars/recommendedCars');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch recommended cars' };
    }
  },

  // Create new car (admin only)
  createCar: async (carData) => {
    try {
      const response = await apiRequest.post('/cars', carData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create car' };
    }
  },

  // Update car (admin only)
  updateCar: async (id, carData) => {
    try {
      const response = await apiRequest.put(`/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update car' };
    }
  },

  // Delete car (admin only)
  deleteCar: async (id) => {
    try {
      const response = await apiRequest.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete car' };
    }
  }
};

export default carsAPI;
