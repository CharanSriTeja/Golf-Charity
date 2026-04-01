import express from 'express';
import {
  createScore,
  getUserScores,
  getDrawScores,
  updateScore,
  deleteScore,
  verifyScore,
} from '../controllers/scoreController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createScore);
router.get('/user/scores', protect, getUserScores);
router.get('/:drawId', protect, getDrawScores);
router.put('/:id', protect, updateScore);
router.delete('/:id', protect, deleteScore);

// Admin routes
router.put('/:id/verify', protect, authorize('admin'), verifyScore);

export default router;
