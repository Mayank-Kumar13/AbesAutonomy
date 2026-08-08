import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from '../validators/authValidator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// ─── Public routes ────────────────────────────────────
router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);

// ─── Protected routes ─────────────────────────────────
router.get('/profile', requireAuth, getProfile);
router.patch('/profile', requireAuth, updateProfileValidation, validate, updateProfile);

export default router;
