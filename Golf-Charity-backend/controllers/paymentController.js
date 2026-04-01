import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PLANS = {
  monthly: {
    amount: 99900, // Amount in paise (999 INR)
    currency: 'INR',
    interval: 'month',
    description: 'Monthly subscription - Rs.999/month',
  },
  yearly: {
    amount: 999900, // Amount in paise (9999 INR)
    currency: 'INR',
    interval: 'year',
    description: 'Yearly subscription - Rs.9,999/year',
  },
};

// Create a Razorpay order
export const createOrder = asyncHandler(async (req, res) => {
  const { plan } = req.body;

  if (!plan || !PLANS[plan]) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }

  const planDetails = PLANS[plan];
  const user = await User.findById(req.user.id);

  // Create Razorpay order
  const options = {
    amount: planDetails.amount,
    currency: planDetails.currency,
    receipt: `receipt_${req.user.id}_${Date.now()}`,
    notes: {
      userId: req.user.id,
      plan: plan,
      email: user.email,
    },
  };

  const order = await razorpay.orders.create(options);

  // Create pending transaction
  const transaction = await Transaction.create({
    userId: req.user.id,
    type: 'subscription',
    amount: planDetails.amount / 100,
    plan,
    status: 'pending',
    razorpayOrderId: order.id,
    description: planDetails.description,
  });

  res.status(200).json({
    success: true,
    orderId: order.id,
    amount: planDetails.amount,
    currency: planDetails.currency,
    transactionId: transaction._id,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

// Verify Razorpay payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

  // Verify signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    await Transaction.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: 'failed' }
    );
    return res.status(400).json({ success: false, message: 'Invalid payment signature' });
  }

  // Update transaction
  const transaction = await Transaction.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    { 
      status: 'success', 
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature 
    },
    { new: true }
  );

  // Update user subscription
  const user = await User.findById(req.user.id);
  const planDetails = PLANS[plan];
  const now = new Date();
  const endDate = plan === 'monthly'
    ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    : new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  user.subscription = {
    plan,
    status: 'active',
    startDate: now,
    endDate,
    razorpayCustomerId: razorpay_payment_id,
  };

  user.totalSpent += planDetails.amount / 100;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Payment verified and subscription activated successfully',
    user,
    transaction,
  });
});

// Get user transactions
export const getTransactions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, type, status } = req.query;

  let query = { userId: req.user.id };
  if (type) query.type = type;
  if (status) query.status = status;

  const transactions = await Transaction.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Transaction.countDocuments(query);

  res.status(200).json({
    success: true,
    transactions,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count,
  });
});

// Cancel subscription
export const cancelSubscription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.subscription.status !== 'active') {
    return res.status(400).json({ success: false, message: 'No active subscription' });
  }

  user.subscription.status = 'cancelled';
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Subscription cancelled successfully',
  });
});

// Razorpay webhook handler
export const webhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === 'payment.captured') {
    const payment = payload.payment.entity;
    await Transaction.findOneAndUpdate(
      { razorpayOrderId: payment.order_id },
      { status: 'success', razorpayPaymentId: payment.id }
    );
  }

  if (event === 'payment.failed') {
    const payment = payload.payment.entity;
    await Transaction.findOneAndUpdate(
      { razorpayOrderId: payment.order_id },
      { status: 'failed' }
    );
  }

  res.status(200).json({ received: true });
});

// Get subscription plans
export const getPlans = asyncHandler(async (req, res) => {
  const plans = Object.entries(PLANS).map(([key, value]) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    amount: value.amount / 100,
    currency: value.currency,
    interval: value.interval,
    description: value.description,
  }));

  res.status(200).json({
    success: true,
    plans,
  });
});
