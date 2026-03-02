import dotenv from 'dotenv';
import express from "express";
import authRoute from './routes/auth.route.js';
import BodyParserMiddleware from "./middlewares/BodyParser.js"
import loggerMiddleware from './middlewares/logger.js'
import cookieParser from 'cookie-parser';
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js"
import carRoutes from "./routes/CarRoutes.js"
import userRoutes from "./routes/user.route.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(loggerMiddleware); // Logging middleware
app.use(cookieParser()); // Cookie parsing middleware
app.use(BodyParserMiddleware); // Custom body parser middleware

// Ensure correct CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};
app.use(cors(corsOptions)); // CORS middleware

// Routes
app.use("/api/auth", authRoute); // Authentication routes
app.use('/api/payment', paymentRoutes); // Payment routes
app.use('/api', reservationRoutes);
app.use('/api/cars',carRoutes );
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
