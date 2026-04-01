import mongoose from 'mongoose';

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide charity name'],
    unique: true,
  },
  category: {
    type: String,
    enum: ['Education', 'Health', 'Relief', 'Elderly', 'Mental Health', 'Children', 'Hunger', 'Other'],
    required: true,
  },
  description: String,
  website: String,
  email: String,
  phone: String,
  registrationNumber: String,
  impact: String,
  image: String,
  totalDonated: {
    type: Number,
    default: 0,
  },
  subscriberCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Charity', charitySchema);
