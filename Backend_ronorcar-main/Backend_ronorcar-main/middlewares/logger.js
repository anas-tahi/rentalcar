// middleware/logger.js
import morgan from 'morgan';

// Create a Morgan middleware instance with the desired format
const loggerMiddleware = morgan('dev');

export default loggerMiddleware;