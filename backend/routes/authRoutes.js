import express from 'express';
import { login, signup } from '../controllers/authController.js'; // Import the login and signup functions
import { authenticateToken } from '../middleware/authMiddleware.js'; // Import the authentication middleware (if needed)
import db from '../config/db.js'; // Import the database configuration

const router = express.Router();

// Route for user login
router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

// Route for user signup
router.post('/signup', (req, res, next) => {
  console.log('Signup route hit');
  next();
}, signup);

// Route to get user profile
router.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id; // Get user ID from the token

  db.query('SELECT company_name, email, password FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ message: 'Failed to load user profile.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' }); // User not found
    }

    res.json(results[0]); // Send user profile data
  });
});

// Example of a protected route (optional)
// router.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });

export default router; // Export the router to be used in the main app