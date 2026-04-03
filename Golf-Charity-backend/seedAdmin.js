import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import fs from 'fs';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/golf-charity');
    console.log('MongoDB connected');

    const adminEmail = 'admin@admin.com';
    const adminPassword = 'password123';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists:', adminEmail);
      process.exit(0);
    }

    const adminUser = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      isActive: true,
      subscription: {
        plan: 'free',
        status: 'active'
      }
    });

    await adminUser.save();
    console.log('Admin user seeded successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

    process.exit(0);
  } catch (err) {
    fs.writeFileSync('cleanErr.txt', err.stack);
    process.exit(1);
  }
};

seedAdmin();
