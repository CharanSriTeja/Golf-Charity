import Charity from '../models/Charity.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const createCharity = asyncHandler(async (req, res) => {
  const { name, category, description, website, email, phone, registrationNumber, impact } = req.body;

  const charity = await Charity.create({
    name,
    category,
    description,
    website,
    email,
    phone,
    registrationNumber,
    impact,
  });

  res.status(201).json({
    success: true,
    charity,
  });
});

export const getAllCharities = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, isActive = true } = req.query;

  let query = { isActive };
  if (category) query.category = category;

  const charities = await Charity.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ subscriberCount: -1 });

  const count = await Charity.countDocuments(query);

  res.status(200).json({
    success: true,
    charities,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

export const getCharityById = asyncHandler(async (req, res) => {
  const charity = await Charity.findById(req.params.id);

  if (!charity) {
    return res.status(404).json({ success: false, message: 'Charity not found' });
  }

  res.status(200).json({
    success: true,
    charity,
  });
});

export const updateCharity = asyncHandler(async (req, res) => {
  const { name, category, description, website, email, phone, registrationNumber, impact, bankDetails, isActive } = req.body;

  const charity = await Charity.findByIdAndUpdate(
    req.params.id,
    { name, category, description, website, email, phone, registrationNumber, impact, bankDetails, isActive },
    { new: true, runValidators: true }
  );

  if (!charity) {
    return res.status(404).json({ success: false, message: 'Charity not found' });
  }

  res.status(200).json({
    success: true,
    charity,
  });
});

export const deleteCharity = asyncHandler(async (req, res) => {
  const charity = await Charity.findByIdAndDelete(req.params.id);
  if (!charity) {
    return res.status(404).json({ success: false, message: 'Charity not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Charity deleted successfully',
  });
});

export const getCharityStats = asyncHandler(async (req, res) => {
  const charityId = req.params.id;

  const subscribers = await User.countDocuments({ charityId });
  const charity = await Charity.findById(charityId);

  if (!charity) {
    return res.status(404).json({ success: false, message: 'Charity not found' });
  }

  res.status(200).json({
    success: true,
    stats: {
      name: charity.name,
      totalDonated: charity.totalDonated,
      subscriberCount: subscribers,
      impact: charity.impact,
    },
  });
});

export const updateCharityDonation = asyncHandler(async (req, res) => {
  const { charityId, amount } = req.body;

  const charity = await Charity.findById(charityId);
  if (!charity) {
    return res.status(404).json({ success: false, message: 'Charity not found' });
  }

  charity.totalDonated += amount;
  await charity.save();

  res.status(200).json({
    success: true,
    charity,
  });
});
