import express from 'express';
import {
  createCharity,
  getAllCharities,
  getCharityById,
  updateCharity,
  deleteCharity,
  getCharityStats,
  updateCharityDonation,
} from '../controllers/charityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCharities);
router.get('/:id', getCharityById);
router.get('/:id/stats', getCharityStats);

// Admin routes
router.post('/', protect, authorize('admin'), createCharity);
router.put('/:id', protect, authorize('admin'), updateCharity);
router.delete('/:id', protect, authorize('admin'), deleteCharity);
router.post('/:id/donate', protect, authorize('admin'), updateCharityDonation);

export default router;
