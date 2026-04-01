import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'closed', 'completed'],
    default: 'upcoming',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  resultsAnnounceDate: Date,
  minScore: {
    type: Number,
    default: 1,
  },
  maxScore: {
    type: Number,
    default: 45,
  },
  prizePool: {
    type: Number,
    required: true,
  },
  prizes: [
    {
      position: Number,
      amount: Number,
      winners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    },
  ],
  totalParticipants: {
    type: Number,
    default: 0,
  },
  winners: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      position: Number,
      score: Number,
      prizeAmount: Number,
    },
  ],
  charityContribution: {
    type: Number,
    default: 0,
  },
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

export default mongoose.model('Draw', drawSchema);
