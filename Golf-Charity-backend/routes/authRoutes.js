import express from 'express';
import { signup, login, getMe, updatePassword, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);
router.post('/logout', logout);

export default router;
