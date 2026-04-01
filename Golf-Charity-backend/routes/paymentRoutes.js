import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  getTransactions,
  cancelSubscription,
  webhook,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/payment-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);
router.get('/transactions', protect, getTransactions);
router.post('/cancel-subscription', protect, cancelSubscription);
router.post('/webhook', webhook);

export default router;
