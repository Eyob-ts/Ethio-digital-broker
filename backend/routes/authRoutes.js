import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  signup,
  login,
  getUsers,
  logout,
  updateProfile,
  getProfile
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/get-profile',authenticate,getProfile)
router.put('/profile',authenticate,updateProfile)
// Protected routes
router.get("/logout", logout);
router.use(authenticate);
router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.route('/users')
  .get(getUsers);


export default router;