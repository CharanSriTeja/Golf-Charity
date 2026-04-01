import Stripe from 'stripe';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  monthly: {
    amount: 99900,
    currency: 'inr',
    interval: 'month',
    description: 'Monthly subscription - ₹999/month',
  },
  yearly: {
    amount: 999900,
    currency: 'inr',
    interval: 'year',
    description: 'Yearly subscription - ₹9,999/year',
  },
};

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { plan } = req.body;

  if (!plan || !PLANS[plan]) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }

  const planDetails = PLANS[plan];
  const user = await User.findById(req.user.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: planDetails.amount,
    currency: planDetails.currency,
    metadata: {
      userId: req.user.id,
      plan: plan,
      email: user.email,
    },
  });

  const transaction = await Transaction.create({
    userId: req.user.id,
    type: 'subscription',
    amount: planDetails.amount / 100,
    plan,
    status: 'pending',
    stripePaymentIntentId: paymentIntent.id,
    description: planDetails.description,
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    transactionId: transaction._id,
  });
});

export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, plan } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ success: false, message: 'Payment not successful' });
  }

  const transaction = await Transaction.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntentId },
    { status: 'success', stripeChargeId: paymentIntent.charges.data[0]?.id },
    { new: true }
  );

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
    stripeCustomerId: paymentIntent.customer,
  };

  user.totalSpent += planDetails.amount / 100;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Subscription activated successfully',
    user,
  });
});

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

export const cancelSubscription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user.subscription.stripeSubscriptionId) {
    return res.status(400).json({ success: false, message: 'No active subscription' });
  }

  await stripe.subscriptions.cancel(user.subscription.stripeSubscriptionId);

  user.subscription.status = 'cancelled';
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Subscription cancelled successfully',
  });
});

export const webhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    await Transaction.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'success' }
    );
  }

  res.status(200).json({ received: true });
});
