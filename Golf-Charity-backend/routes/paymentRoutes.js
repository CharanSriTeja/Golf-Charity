import express from 'express';
import {
  createOrder,
  verifyPayment,
  getTransactions,
  cancelSubscription,
  webhook,
  getPlans,
  devBypass,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/plans', getPlans);
router.post('/webhook', webhook);

// Protected routes
router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/transactions', protect, getTransactions);
router.post('/cancel-subscription', protect, cancelSubscription);
router.post('/dev-bypass', protect, devBypass);

export default router;
