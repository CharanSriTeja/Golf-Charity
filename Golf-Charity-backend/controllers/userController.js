import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, state, country, charityId, donationPercentage } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, city, state, country, charityId, donationPercentage },
    { new: true, runValidators: true }
  ).populate('charityId');

  res.status(200).json({
    success: true,
    user,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('charityId');
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, isActive } = req.query;

  let query = {};
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';

  const users = await User.find(query)
    .populate('charityId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('charityId');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, phone, city, state, country, role, isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, phone, city, state, country, role, isActive },
    { new: true, runValidators: true }
  ).populate('charityId');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

export const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    stats: {
      totalSpent: user.totalSpent,
      totalWinnings: user.totalWinnings,
      subscription: user.subscription,
      charity: user.charityId,
    },
  });
});
