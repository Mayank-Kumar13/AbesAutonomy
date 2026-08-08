import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateToken } from '../middleware/auth.js';

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.badRequest(res, 'An account with this email already exists.');
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    return ApiResponse.created(res, {
      user: user.toSafeJSON(),
      token,
    }, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    const token = generateToken(user);

    return ApiResponse.success(res, {
      user: user.toSafeJSON(),
      token,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
  return ApiResponse.success(res, req.user.toSafeJSON());
};

/**
 * PATCH /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'mobile', 'email'];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // If email is being changed, check for duplicates
    if (updates.email && updates.email !== req.user.email) {
      const existing = await User.findOne({ email: updates.email });
      if (existing) {
        return ApiResponse.badRequest(res, 'Email is already in use.');
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return ApiResponse.success(res, user.toSafeJSON(), 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};
