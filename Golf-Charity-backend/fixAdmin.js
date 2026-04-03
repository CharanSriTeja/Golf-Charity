import mongoose from 'mongoose';
import User from './models/User.js';

const fix = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/golf-charity');
    await User.deleteOne({ email: 'admin@playgivewin.com' });
    console.log('Deleted admin');
    process.exit(0);
  } catch(e) { console.error(e); process.exit(1); }
};
fix();
