import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create Admin Permission
    const adminPermission = await prisma.adminPermission.upsert({
      where: { name: 'Full Admin' },
      update: {},
      create: {
        name: 'Full Admin',
        description: 'Full administrative access',
        Badge: 'Full'
      }
    });

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@rentalcar.com' },
      update: {},
      create: {
        email: 'admin@rentalcar.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
        isNormalUser: false,
        emailVerified: true,
        isActive: true,
        adminPermissionId: adminPermission.id
      }
    });

    // Create Regular User
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@rentalcar.com' },
      update: {},
      create: {
        email: 'user@rentalcar.com',
        password: userPassword,
        firstName: 'Regular',
        lastName: 'User',
        isAdmin: false,
        isNormalUser: true,
        emailVerified: true,
        isActive: true
      }
    });

    // Create Categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { id: 'suv' },
        update: {},
        create: { id: 'suv', name: 'SUV' }
      }),
      prisma.category.upsert({
        where: { id: 'sedan' },
        update: {},
        create: { id: 'sedan', name: 'Sedan' }
      }),
      prisma.category.upsert({
        where: { id: 'sports' },
        update: {},
        create: { id: 'sports', name: 'Sports Car' }
      }),
      prisma.category.upsert({
        where: { id: 'luxury' },
        update: {},
        create: { id: 'luxury', name: 'Luxury' }
      })
    ]);

    // Create Cars
    const cars = [
      {
        matriculeNumber: 'CAR001',
        make: 'Mercedes-Benz',
        model: 'G-Class',
        year: 2024,
        color: 'Black',
        mileage: 0,
        price: 150,
        description: 'Luxury SUV with off-road capabilities',
        imageUrl: 'https://example.com/g-class.jpg',
        isAvailable: true,
        isTop: true,
        isRecommended: true,
        isNew: true
      },
      {
        matriculeNumber: 'CAR002',
        make: 'Mercedes-Benz',
        model: 'GLA',
        year: 2024,
        color: 'White',
        mileage: 0,
        price: 120,
        description: 'Compact luxury SUV',
        imageUrl: 'https://example.com/gla.jpg',
        isAvailable: true,
        isTop: false,
        isRecommended: true,
        isNew: true
      },
      {
        matriculeNumber: 'CAR003',
        make: 'Porsche',
        model: 'Cayenne',
        year: 2024,
        color: 'Silver',
        mileage: 0,
        price: 180,
        description: 'High-performance luxury SUV',
        imageUrl: 'https://example.com/cayenne.jpg',
        isAvailable: true,
        isTop: true,
        isRecommended: false,
        isNew: true
      },
      {
        matriculeNumber: 'CAR004',
        make: 'Audi',
        model: 'Q7',
        year: 2023,
        color: 'Blue',
        mileage: 5000,
        price: 140,
        description: 'Family luxury SUV',
        imageUrl: 'https://example.com/q7.jpg',
        isAvailable: true,
        isTop: false,
        isRecommended: true,
        isNew: false
      },
      {
        matriculeNumber: 'CAR005',
        make: 'BMW',
        model: 'X5',
        year: 2023,
        color: 'Gray',
        mileage: 3000,
        price: 160,
        description: 'Premium sports activity vehicle',
        imageUrl: 'https://example.com/x5.jpg',
        isAvailable: true,
        isTop: true,
        isRecommended: false,
        isNew: false
      }
    ];

    for (const carData of cars) {
      await prisma.car.upsert({
        where: { matriculeNumber: carData.matriculeNumber },
        update: carData,
        create: carData
      });
    }

    // Create Insurance Types
    const insuranceTypes = await Promise.all([
      prisma.insuranceType.upsert({
        where: { id: 'basic' },
        update: {},
        create: { id: 'basic', name: 'Basic Insurance' }
      }),
      prisma.insuranceType.upsert({
        where: { id: 'comprehensive' },
        update: {},
        create: { id: 'comprehensive', name: 'Comprehensive Insurance' }
      }),
      prisma.insuranceType.upsert({
        where: { id: 'premium' },
        update: {},
        create: { id: 'premium', name: 'Premium Insurance' }
      })
    ]);

    // Create Payment Method Types
    const paymentMethodTypes = await Promise.all([
      prisma.paymentMethodType.upsert({
        where: { id: 'credit-card' },
        update: {},
        create: { id: 'credit-card', name: 'Credit Card' }
      }),
      prisma.paymentMethodType.upsert({
        where: { id: 'paypal' },
        update: {},
        create: { id: 'paypal', name: 'PayPal' }
      }),
      prisma.paymentMethodType.upsert({
        where: { id: 'stripe' },
        update: {},
        create: { id: 'stripe', name: 'Stripe' }
      })
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('👤 Admin user: admin@rentalcar.com / admin123');
    console.log('👤 Regular user: user@rentalcar.com / user123');
    console.log('🚗 Created 5 sample cars');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
