let reservations = [];

export const bookingDB = {
  findAll: () => reservations,
  findById: (id) => reservations.find(b => b.id === id),
  findByUserId: (userId) => reservations.filter(b => b.userId === userId),
  findByCarId: (carId) => reservations.filter(b => b.carId === carId),
  create: (data) => {
    const booking = { id: `booking_${Date.now()}`, ...data, status: 'pending', createdAt: new Date().toISOString() };
    reservations.push(booking);
    return booking;
  },
  update: (id, data) => {
    const i = reservations.findIndex(b => b.id === id);
    if (i !== -1) { reservations[i] = { ...reservations[i], ...data }; return reservations[i]; }
    return null;
  },
  delete: (id) => {
    const i = reservations.findIndex(b => b.id === id);
    if (i !== -1) return reservations.splice(i, 1)[0];
    return null;
  },
  clearAll: () => { reservations = []; }
};
