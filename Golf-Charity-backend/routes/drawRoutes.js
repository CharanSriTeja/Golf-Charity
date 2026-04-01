import express from 'express';
import {
  createDraw,
  getAllDraws,
  getDrawById,
  getActiveDraw,
  updateDraw,
  announceDraw,
  deleteDraw,
} from '../controllers/drawController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllDraws);
router.get('/active', protect, getActiveDraw);
router.get('/:id', protect, getDrawById);

// Admin routes
router.post('/', protect, authorize('admin'), createDraw);
router.put('/:id', protect, authorize('admin'), updateDraw);
router.post('/:id/announce', protect, authorize('admin'), announceDraw);
router.delete('/:id', protect, authorize('admin'), deleteDraw);

export default router;
