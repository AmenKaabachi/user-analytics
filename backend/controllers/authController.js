import * as userService from '../services/userService.js'; // Importing the userService to handle database operations
import jwt from 'jsonwebtoken'; // Importing JWT to handle token generation for authentication

// Login Logic
export const login = async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from request body
  console.log('Login attempt:', email); // Log the email of the user trying to log in

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Use the userService to find a user by their email
    const users = await userService.findUserByEmail(email);

    if (users.length > 0) {
      const user = users[0]; // Get the first user from the result
      // Check if the password matches
      if (password === user.password) {
        // If password matches, generate a JWT token
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token, user }); // Respond with success and the token
      }
    }
    return res.status(400).json({ message: 'Incorrect email or password' }); // If email or password is incorrect, return a consistent error message
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    return res.status(500).json({ message: 'Server error' }); // Return a server error response
  }
};

// Signup Logic
export const signup = async (req, res) => {
  console.log('Request Body:', req.body); // Log the entire request body for debugging

  const { companyName, email, password } = req.body; // Destructure company name, email, and password from request body
  console.log('Signup attempt:', email); // Log the email of the user trying to sign up

  // Check if all required fields are provided
  if (!companyName || !email || !password) {
    return res.status(400).json({ message: 'Company name, email, and password are required' });
  }

  try {
    // Use the userService to check if a user already exists with the provided email
    const users = await userService.findUserByEmail(email);

    if (users.length > 0) {
      return res.status(400).json({ message: 'User already exists' }); // If user exists, return an error
    }

    // If user doesn't exist, create a new user using the userService
    await userService.createUser(companyName, email, password);
    res.json({ message: 'Signup successful' }); // Respond with success message
  } catch (error) {
    console.error('Error during signup:', error); // Log the error
    res.status(500).json({ message: 'Server error' }); // Return a server error response
  }
};


// Update Profile Logic
export const updateProfile = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token (authenticated user)
  const { company_name, email } = req.body; // Destructure new company name and email from request body
  console.log('Request Body:', req.body);
  console.log('Updating profile for user:', userId, company_name, email);

  try {
    // Use the userService to update the user profile
    await userService.updateUserProfile(userId, company_name, email);
    res.json({ message: 'Profile updated successfully.' }); // Respond with success message
  } catch (error) {
    console.error('Error updating profile:', error); // Log the error
    res.status(500).json({ message: 'Failed to update user profile.' }); // Return a server error response
  }
};

// Reset Password Logic
export const resetPassword = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token (authenticated user)
  const { currentPassword, newPassword } = req.body; // Destructure current and new passwords from request body
  console.log('Request Body:', req.body); // Log the entire request body
  console.log('New Password:', newPassword); // Log the new password

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new passwords are required' });
  }

  try {
    // Use the userService to get the user profile
    const users = await userService.getUserProfile(userId);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    // Check if the current password matches
    if (currentPassword !== user.password) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Use the userService to reset the user password
    await userService.resetPassword(userId, newPassword);
    res.json({ message: 'Password reset successfully.' }); // Respond with success message
  } catch (error) {
    console.error('Error resetting password:', error); // Log the error
    res.status(500).json({ message: 'Failed to reset password.' }); // Return a server error response
  }
};

// Delete Profile Logic
export const deleteProfile = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token (authenticated user)

  try {
    // Use the userService to delete the user profile
    await userService.deleteUser(userId);
    res.json({ message: 'Profile deleted successfully.' }); // Respond with success message
  } catch (error) {
    console.error('Error deleting profile:', error); // Log the error
    res.status(500).json({ message: 'Failed to delete profile.' }); // Return a server error response
  }
};

