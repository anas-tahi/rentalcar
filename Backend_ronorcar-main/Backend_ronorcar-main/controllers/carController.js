import { carService } from '../lib/database.js';

export const getAllCars = async (req, res) => {
  try {
    const cars = await carService.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carService.findById(id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching car' });
  }
};

export const createCar = async (req, res) => {
  try {
    const newCar = await carService.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Error creating car' });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await carService.update(id, req.body);
    if (updatedCar) {
      res.json(updatedCar);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating car' });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await carService.delete(id);
    if (deletedCar) {
      res.json({ message: 'Car deleted successfully' });
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting car' });
  }
};

// Function to get top cars
export const getTopCars = async (req, res) => {
    try {
      const topCars = await carService.getTopCars();
      res.json(topCars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching top cars' });
    }
  };
  
// Function to get recommended cars
export const getRecommendedCars = async (req, res) => {
    try {
      const recommendedCars = await carService.getRecommendedCars();
      res.json(recommendedCars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommended cars' });
    }
  };
  