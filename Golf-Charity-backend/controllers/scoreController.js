import Score from '../models/Score.js';
import Draw from '../models/Draw.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const createScore = asyncHandler(async (req, res) => {
  const { playerName, tournamentName, score, drawId, notes } = req.body;

  if (!score || !drawId) {
    return res.status(400).json({ success: false, message: 'Score and Draw ID are required' });
  }

  // Check if draw exists and is active
  const draw = await Draw.findById(drawId);
  if (!draw) {
    return res.status(404).json({ success: false, message: 'Draw not found' });
  }

  if (draw.status !== 'active') {
    return res.status(400).json({ success: false, message: 'This draw is not active' });
  }

  const newScore = await Score.create({
    userId: req.user.id,
    drawId,
    playerName: playerName || req.user.name,
    tournamentName,
    score,
    notes,
  });

  res.status(201).json({
    success: true,
    score: newScore,
  });
});

export const getUserScores = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, drawId } = req.query;

  let query = { userId: req.user.id };
  if (drawId) query.drawId = drawId;

  const scores = await Score.find(query)
    .populate('drawId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Score.countDocuments(query);

  res.status(200).json({
    success: true,
    scores,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

export const getDrawScores = asyncHandler(async (req, res) => {
  const { drawId } = req.params;
  const { page = 1, limit = 100 } = req.query;

  const scores = await Score.find({ drawId })
    .populate('userId', 'name email')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ score: -1 });

  const count = await Score.countDocuments({ drawId });

  res.status(200).json({
    success: true,
    scores,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

export const updateScore = asyncHandler(async (req, res) => {
  const { score, notes } = req.body;

  let scoreRecord = await Score.findById(req.params.id);
  if (!scoreRecord) {
    return res.status(404).json({ success: false, message: 'Score not found' });
  }

  if (scoreRecord.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to update this score' });
  }

  scoreRecord = await Score.findByIdAndUpdate(
    req.params.id,
    { score, notes },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    score: scoreRecord,
  });
});

export const deleteScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id);
  if (!score) {
    return res.status(404).json({ success: false, message: 'Score not found' });
  }

  if (score.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this score' });
  }

  await Score.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Score deleted successfully',
  });
});

export const verifyScore = asyncHandler(async (req, res) => {
  const score = await Score.findByIdAndUpdate(
    req.params.id,
    { verified: true, verifiedBy: req.user.id },
    { new: true }
  );

  if (!score) {
    return res.status(404).json({ success: false, message: 'Score not found' });
  }

  res.status(200).json({
    success: true,
    score,
  });
});
