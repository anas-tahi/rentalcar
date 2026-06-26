// In-memory store (replace with MongoDB in production)
let users = [
  {
    id: 'admin_001',
    email: 'admin@rentalcar.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 'password'
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_001',
    email: 'user@rentalcar.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    firstName: 'Regular',
    lastName: 'User',
    isAdmin: false,
    createdAt: new Date().toISOString()
  }
];

export const userDB = {
  findAll: () => users,
  findByEmail: (email) => users.find(u => u.email === email),
  findById: (id) => users.find(u => u.id === id),
  create: (data) => {
    const user = { id: `user_${Date.now()}`, ...data, createdAt: new Date().toISOString() };
    users.push(user);
    return user;
  },
  update: (id, data) => {
    const i = users.findIndex(u => u.id === id);
    if (i !== -1) { users[i] = { ...users[i], ...data }; return users[i]; }
    return null;
  }
};
