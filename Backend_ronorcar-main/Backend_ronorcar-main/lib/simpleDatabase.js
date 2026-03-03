// Simple in-memory database for development
let users = [];
let cars = [];
let reservations = [];

// Initialize with sample data
const initializeData = () => {
  // Sample users
  users = [
    {
      id: 'admin_001',
      email: 'admin@rentalcar.com',
      password: '$2b$10$N9qo8uLOickgx2ZMRQoq1czaj3CYLj8ZxuQ', // 'admin123' hashed
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
      password: '$2b$10$N9qo8uLOickgx2ZMRQoq1czaj3CYLj8ZxuQ', // 'user123' hashed
      firstName: 'Regular',
      lastName: 'User',
      isAdmin: false,
      isNormalUser: true,
      emailVerified: true,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  // Sample cars
  cars = [
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

  console.log('✅ Simple database initialized with sample data');
};

// Initialize data on module load
initializeData();

// User operations
export const userService = {
  async findAll() {
    return users;
  },

  async findByEmail(email) {
    return users.find(user => user.email === email);
  },

  async findById(id) {
    return users.find(user => user.id === id);
  },

  async create(userData) {
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  async update(id, updateData) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateData };
      return users[index];
    }
    return null;
  }
};

// Car operations
export const carService = {
  async findAll() {
    return cars;
  },

  async findById(id) {
    return cars.find(car => car.id === id);
  },

  async findByMatricule(matriculeNumber) {
    return cars.find(car => car.matriculeNumber === matriculeNumber);
  },

  async create(carData) {
    const newCar = {
      id: `car_${Date.now()}`,
      ...carData,
      createdAt: new Date().toISOString()
    };
    cars.push(newCar);
    return newCar;
  },

  async update(id, updateData) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...updateData };
      return cars[index];
    }
    return null;
  },

  async delete(id) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
      const deletedCar = cars[index];
      cars.splice(index, 1);
      return deletedCar;
    }
    return null;
  },

  async getTopCars() {
    return cars.filter(car => car.isTop);
  },

  async getRecommendedCars() {
    return cars.filter(car => car.isRecommended);
  }
};

// Booking operations
export const bookingService = {
  async findAll() {
    return reservations;
  },

  async findByUserId(userId) {
    return reservations.filter(booking => booking.userId === userId);
  },

  async findById(id) {
    return reservations.find(booking => booking.id === id);
  },

  async create(bookingData) {
    const newBooking = {
      id: `booking_${Date.now()}`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    reservations.push(newBooking);
    return newBooking;
  },

  async update(id, updateData) {
    const index = reservations.findIndex(booking => booking.id === id);
    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...updateData };
      return reservations[index];
    }
    return null;
  },

  async delete(id) {
    const index = reservations.findIndex(booking => booking.id === id);
    if (index !== -1) {
      const deletedBooking = reservations[index];
      reservations.splice(index, 1);
      return deletedBooking;
    }
    return null;
  }
};

export default {
  userService,
  carService,
  bookingService
};
