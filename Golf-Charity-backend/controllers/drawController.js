import Draw from '../models/Draw.js';
import Score from '../models/Score.js';
import Winning from '../models/Winning.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const createDraw = asyncHandler(async (req, res) => {
  const { month, year, startDate, endDate, resultsAnnounceDate, prizePool, prizes } = req.body;

  const draw = await Draw.create({
    month,
    year,
    startDate,
    endDate,
    resultsAnnounceDate,
    prizePool,
    prizes,
  });

  res.status(201).json({
    success: true,
    draw,
  });
});

export const getAllDraws = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, year } = req.query;

  let query = {};
  if (status) query.status = status;
  if (year) query.year = year;

  const draws = await Draw.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ year: -1, month: -1 });

  const count = await Draw.countDocuments(query);

  res.status(200).json({
    success: true,
    draws,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

export const getDrawById = asyncHandler(async (req, res) => {
  const draw = await Draw.findById(req.params.id)
    .populate('prizes.winners', 'name email')
    .populate('winners.userId', 'name email charityId');

  if (!draw) {
    return res.status(404).json({ success: false, message: 'Draw not found' });
  }

  res.status(200).json({
    success: true,
    draw,
  });
});

export const getActiveDraw = asyncHandler(async (req, res) => {
  const draw = await Draw.findOne({ status: 'active' })
    .populate('winners.userId', 'name email');

  if (!draw) {
    return res.status(404).json({ success: false, message: 'No active draw found' });
  }

  res.status(200).json({
    success: true,
    draw,
  });
});

export const updateDraw = asyncHandler(async (req, res) => {
  const { status, prizes, charityContribution, notes } = req.body;

  const draw = await Draw.findByIdAndUpdate(
    req.params.id,
    { status, prizes, charityContribution, notes },
    { new: true, runValidators: true }
  );

  if (!draw) {
    return res.status(404).json({ success: false, message: 'Draw not found' });
  }

  res.status(200).json({
    success: true,
    draw,
  });
});

export const announceDraw = asyncHandler(async (req, res) => {
  const draw = await Draw.findById(req.params.id);
  if (!draw) {
    return res.status(404).json({ success: false, message: 'Draw not found' });
  }

  // Get top scorers
  const topScores = await Score.find({ drawId: req.params.id })
    .populate('userId')
    .sort({ score: -1 })
    .limit(10);

  const winners = [];
  const prizes = draw.prizes || [];

  for (let i = 0; i < topScores.length && i < prizes.length; i++) {
    const winning = await Winning.create({
      userId: topScores[i].userId._id,
      drawId: draw._id,
      prizeAmount: prizes[i].amount,
      position: i + 1,
      donationAmount: (prizes[i].amount * (topScores[i].userId.donationPercentage || 30)) / 100,
      charityId: topScores[i].userId.charityId,
      status: 'pending',
    });

    winners.push({
      userId: topScores[i].userId._id,
      position: i + 1,
      score: topScores[i].score,
      prizeAmount: prizes[i].amount,
    });
  }

  draw.winners = winners;
  draw.status = 'completed';
  draw.totalParticipants = await Score.countDocuments({ drawId: req.params.id });
  await draw.save();

  res.status(200).json({
    success: true,
    message: 'Draw announced successfully',
    draw,
    winners,
  });
});

export const deleteDraw = asyncHandler(async (req, res) => {
  const draw = await Draw.findByIdAndDelete(req.params.id);
  if (!draw) {
    return res.status(404).json({ success: false, message: 'Draw not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Draw deleted successfully',
  });
});
