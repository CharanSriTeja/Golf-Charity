import mongoose from 'mongoose';

const winningSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draw',
    required: true,
  },
  prizeAmount: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  donationAmount: {
    type: Number,
    default: 0,
  },
  charityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'paid', 'rejected'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'upi', 'cheque'],
  },
  paymentDate: Date,
  transactionId: String,
  taxReceipt: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Winning', winningSchema);
