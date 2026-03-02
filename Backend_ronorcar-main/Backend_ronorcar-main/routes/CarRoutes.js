import express from 'express';
import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/carController.js';
import { getTopCars, getRecommendedCars } from '../controllers/carController.js';

const router = express.Router();

// Route to get top cars
router.get('/topCars', getTopCars);
// Route to get recommended cars
router.get('/recommendedCars', getRecommendedCars);
router.get('/all', getAllCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
