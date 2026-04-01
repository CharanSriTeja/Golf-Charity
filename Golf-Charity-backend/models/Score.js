import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
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
  playerName: String,
  tournamentName: String,
  score: {
    type: Number,
    required: [true, 'Please provide a score'],
    min: 1,
    max: 45,
  },
  notes: String,
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

export default mongoose.model('Score', scoreSchema);
