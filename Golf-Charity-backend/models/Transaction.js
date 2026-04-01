import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['subscription', 'winning', 'refund', 'charity_donation'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled'],
    default: 'pending',
  },
  stripePaymentIntentId: String,
  stripeChargeId: String,
  plan: String,
  period: String,
  relatedDrawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draw',
  },
  relatedCharityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity',
  },
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
