let cars = [
  { id: '1', name: 'BMW 5 Series', brand: 'BMW', category: 'Sedan', pricePerDay: 89, location: 'Madrid', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Diesel', year: 2024, available: true },
  { id: '2', name: 'Mercedes-Benz GLE', brand: 'Mercedes', category: 'SUV', pricePerDay: 145, location: 'Barcelona', image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80', seats: 7, transmission: 'Automatic', fuel: 'Hybrid', year: 2024, available: true },
  { id: '3', name: 'Porsche 911 Carrera', brand: 'Porsche', category: 'Sports', pricePerDay: 320, location: 'Marbella', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', seats: 2, transmission: 'Automatic', fuel: 'Petrol', year: 2024, available: true },
  { id: '4', name: 'Range Rover Sport', brand: 'Land Rover', category: 'SUV', pricePerDay: 185, location: 'Valencia', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Diesel', year: 2024, available: true },
  { id: '5', name: 'Audi A4', brand: 'Audi', category: 'Sedan', pricePerDay: 75, location: 'Seville', image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Petrol', year: 2023, available: true },
  { id: '6', name: 'Tesla Model 3', brand: 'Tesla', category: 'Electric', pricePerDay: 95, location: 'Madrid', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Electric', year: 2024, available: true },
  { id: '7', name: 'Ferrari F8 Spider', brand: 'Ferrari', category: 'Convertible', pricePerDay: 850, location: 'Marbella', image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80', seats: 2, transmission: 'Automatic', fuel: 'Petrol', year: 2024, available: true },
  { id: '8', name: 'Volkswagen Golf', brand: 'Volkswagen', category: 'Economy', pricePerDay: 45, location: 'Barcelona', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80', seats: 5, transmission: 'Manual', fuel: 'Petrol', year: 2023, available: true },
  { id: '9', name: 'Lamborghini Huracán', brand: 'Lamborghini', category: 'Sports', pricePerDay: 1200, location: 'Barcelona', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80', seats: 2, transmission: 'Automatic', fuel: 'Petrol', year: 2024, available: true },
  { id: '10', name: 'Toyota Camry', brand: 'Toyota', category: 'Economy', pricePerDay: 55, location: 'Valencia', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Hybrid', year: 2023, available: true },
  { id: '11', name: 'Mercedes-Benz C-Class', brand: 'Mercedes', category: 'Sedan', pricePerDay: 110, location: 'Bilbao', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Diesel', year: 2024, available: true },
  { id: '12', name: 'Jeep Wrangler', brand: 'Jeep', category: 'SUV', pricePerDay: 98, location: 'Granada', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', seats: 5, transmission: 'Manual', fuel: 'Petrol', year: 2023, available: true },
];

export const carDB = {
  findAll: (filters = {}) => {
    let result = [...cars];
    if (filters.category) result = result.filter(c => c.category === filters.category);
    if (filters.location) result = result.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.maxPrice) result = result.filter(c => c.pricePerDay <= Number(filters.maxPrice));
    if (filters.fuel) result = result.filter(c => c.fuel === filters.fuel);
    if (filters.transmission) result = result.filter(c => c.transmission === filters.transmission);
    return result;
  },
  findById: (id) => cars.find(c => c.id === id),
  create: (data) => { const car = { id: `${Date.now()}`, ...data, createdAt: new Date().toISOString() }; cars.push(car); return car; },
  update: (id, data) => { const i = cars.findIndex(c => c.id === id); if (i !== -1) { cars[i] = { ...cars[i], ...data }; return cars[i]; } return null; },
  delete: (id) => { const i = cars.findIndex(c => c.id === id); if (i !== -1) { return cars.splice(i, 1)[0]; } return null; },
  getTop: () => cars.slice(0, 6),
  getRecommended: () => cars.filter(c => c.pricePerDay < 200),
};
