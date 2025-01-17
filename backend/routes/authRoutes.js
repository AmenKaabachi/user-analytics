import express from 'express';
import { login, signup, updateProfile, resetPassword, deleteProfile } from '../controllers/authController.js'; // Import the controller functions
import { authenticateToken } from '../middleware/authMiddleware.js'; // Import the authentication middleware
import * as userService from '../services/userService.js'; // Import the user service

const router = express.Router();

// Route for user login
router.post('/login', login);

// Route for user signup
router.post('/signup', signup);

// Route to get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get user ID from the token
  try {
    const userProfile = await userService.getUserProfile(userId);
    if (userProfile.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(userProfile[0]); // Send user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to load user profile.' });
  }
});

// Route to update user profile
router.put('/profile', authenticateToken, (req, res, next) => {
  // Log the request body
  console.log('Request Body at Router Level:', req.body);

  // Proceed to the next middleware or route handler
  next();
}, updateProfile);

// Route to reset user password
router.put('/reset-password', authenticateToken, resetPassword);

// Route to delete user profile
router.delete('/profile', authenticateToken, deleteProfile);

export default router; // Export the router to be used in the main app
