import { getUserById } from '../controllers/userController.js';
import express from "express";
const router = express.Router();

router.get('/:id', getUserById);

export default router;
