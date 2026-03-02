import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const DB_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const CARS_FILE = path.join(DB_DIR, 'cars.json');
const BOOKINGS_FILE = path.join(DB_DIR, 'bookings.json');

// Initialize database directory and files
async function initDatabase() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    
    // Initialize users file if it doesn't exist
    try {
      await fs.access(USERS_FILE);
    } catch {
      const initialUsers = [
        {
          id: 'admin_001',
          email: 'admin@rentalcar.com',
          password: await bcrypt.hash('admin123', 10),
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true,
          isNormalUser: false,
          emailVerified: true,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_001',
          email: 'user@rentalcar.com',
          password: await bcrypt.hash('user123', 10),
          firstName: 'Regular',
          lastName: 'User',
          isAdmin: false,
          isNormalUser: true,
          emailVerified: true,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      await fs.writeFile(USERS_FILE, JSON.stringify(initialUsers, null, 2));
    }

    // Initialize cars file if it doesn't exist
    try {
      await fs.access(CARS_FILE);
    } catch {
      const initialCars = [
        {
          id: 'car_001',
          matriculeNumber: 'CAR001',
          make: 'Mercedes-Benz',
          model: 'G-Class',
          year: 2024,
          color: 'Black',
          mileage: 0,
          price: 150,
          description: 'Luxury SUV with off-road capabilities',
          imageUrl: 'https://via.placeholder.com/400x300?text=Mercedes+G-Class',
          isAvailable: true,
          isTop: true,
          isRecommended: true,
          isNew: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'car_002',
          matriculeNumber: 'CAR002',
          make: 'Mercedes-Benz',
          model: 'GLA',
          year: 2024,
          color: 'White',
          mileage: 0,
          price: 120,
          description: 'Compact luxury SUV',
          imageUrl: 'https://via.placeholder.com/400x300?text=Mercedes+GLA',
          isAvailable: true,
          isTop: false,
          isRecommended: true,
          isNew: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'car_003',
          matriculeNumber: 'CAR003',
          make: 'Porsche',
          model: 'Cayenne',
          year: 2024,
          color: 'Silver',
          mileage: 0,
          price: 180,
          description: 'High-performance luxury SUV',
          imageUrl: 'https://via.placeholder.com/400x300?text=Porsche+Cayenne',
          isAvailable: true,
          isTop: true,
          isRecommended: false,
          isNew: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'car_004',
          matriculeNumber: 'CAR004',
          make: 'Audi',
          model: 'Q7',
          year: 2023,
          color: 'Blue',
          mileage: 5000,
          price: 140,
          description: 'Family luxury SUV',
          imageUrl: 'https://via.placeholder.com/400x300?text=Audi+Q7',
          isAvailable: true,
          isTop: false,
          isRecommended: true,
          isNew: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 'car_005',
          matriculeNumber: 'CAR005',
          make: 'BMW',
          model: 'X5',
          year: 2023,
          color: 'Gray',
          mileage: 3000,
          price: 160,
          description: 'Premium sports activity vehicle',
          imageUrl: 'https://via.placeholder.com/400x300?text=BMW+X5',
          isAvailable: true,
          isTop: true,
          isRecommended: false,
          isNew: false,
          createdAt: new Date().toISOString()
        }
      ];
      await fs.writeFile(CARS_FILE, JSON.stringify(initialCars, null, 2));
    }

    // Initialize bookings file if it doesn't exist
    try {
      await fs.access(BOOKINGS_FILE);
    } catch {
      await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2));
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

// Generic file operations
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// User operations
export const userService = {
  async findAll() {
    return await readData(USERS_FILE);
  },

  async findByEmail(email) {
    const users = await readData(USERS_FILE);
    return users.find(user => user.email === email);
  },

  async findById(id) {
    const users = await readData(USERS_FILE);
    return users.find(user => user.id === id);
  },

  async create(userData) {
    const users = await readData(USERS_FILE);
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await writeData(USERS_FILE, users);
    return newUser;
  },

  async update(id, updateData) {
    const users = await readData(USERS_FILE);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateData };
      await writeData(USERS_FILE, users);
      return users[index];
    }
    return null;
  }
};

// Car operations
export const carService = {
  async findAll() {
    return await readData(CARS_FILE);
  },

  async findById(id) {
    const cars = await readData(CARS_FILE);
    return cars.find(car => car.id === id);
  },

  async findByMatricule(matriculeNumber) {
    const cars = await readData(CARS_FILE);
    return cars.find(car => car.matriculeNumber === matriculeNumber);
  },

  async create(carData) {
    const cars = await readData(CARS_FILE);
    const newCar = {
      id: `car_${Date.now()}`,
      ...carData,
      createdAt: new Date().toISOString()
    };
    cars.push(newCar);
    await writeData(CARS_FILE, cars);
    return newCar;
  },

  async update(id, updateData) {
    const cars = await readData(CARS_FILE);
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...updateData };
      await writeData(CARS_FILE, cars);
      return cars[index];
    }
    return null;
  },

  async delete(id) {
    const cars = await readData(CARS_FILE);
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
      const deletedCar = cars[index];
      cars.splice(index, 1);
      await writeData(CARS_FILE, cars);
      return deletedCar;
    }
    return null;
  },

  async getTopCars() {
    const cars = await readData(CARS_FILE);
    return cars.filter(car => car.isTop);
  },

  async getRecommendedCars() {
    const cars = await readData(CARS_FILE);
    return cars.filter(car => car.isRecommended);
  }
};

// Booking operations
export const bookingService = {
  async findAll() {
    return await readData(BOOKINGS_FILE);
  },

  async findByUserId(userId) {
    const bookings = await readData(BOOKINGS_FILE);
    return bookings.filter(booking => booking.userId === userId);
  },

  async findById(id) {
    const bookings = await readData(BOOKINGS_FILE);
    return bookings.find(booking => booking.id === id);
  },

  async create(bookingData) {
    const bookings = await readData(BOOKINGS_FILE);
    const newBooking = {
      id: `booking_${Date.now()}`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    await writeData(BOOKINGS_FILE, bookings);
    return newBooking;
  },

  async update(id, updateData) {
    const bookings = await readData(BOOKINGS_FILE);
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updateData };
      await writeData(BOOKINGS_FILE, bookings);
      return bookings[index];
    }
    return null;
  },

  async delete(id) {
    const bookings = await readData(BOOKINGS_FILE);
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      const deletedBooking = bookings[index];
      bookings.splice(index, 1);
      await writeData(BOOKINGS_FILE, bookings);
      return deletedBooking;
    }
    return null;
  },

  async clearAll() {
    await writeData(BOOKINGS_FILE, []);
    return true;
  }
};

// Initialize database on module load
initDatabase();

export default {
  userService,
  carService,
  bookingService,
  initDatabase
};
