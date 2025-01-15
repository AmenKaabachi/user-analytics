import db from '../config/db.js'; // Import the database connection
import jwt from 'jsonwebtoken'; // Import JWT for token generation

// Login Logic
export const login = (req, res) => {
  const { email, password } = req.body; // Destructure email and password from request body
  console.log('Login attempt:', email); // Log the login attempt

  // Check if Email and Password Are Provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Query to Find User by Email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Check If User Exists
    if (result.length > 0) {
      const user = result[0]; // Get the user from the result
      // Check If Password Matches
      if (password === user.password) {
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' }); // Generate a JWT token
        res.json({ message: 'Login successful', token, user }); // Respond with success and token
      } else {
        res.status(400).json({ message: 'Invalid credentials' }); // Invalid password
      }
    } else {
      res.status(400).json({ message: 'User  not found' }); // User does not exist
    }
  });
};

// Signup Logic
export const signup = (req, res) => {
  const { companyName, email, password } = req.body; // Destructure companyName, email, and password from request body
  console.log('Signup attempt:', email); // Log the signup attempt

  // Check if Company Name, Email, and Password Are Provided
  if (!companyName || !email || !password) {
    return res.status(400).json({ message: 'Company name, email, and password are required' });
  }

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // If user already exists, return an error
    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user into the database
    db.query('INSERT INTO users (company_name, email, password) VALUES (?, ?, ?)', [companyName, email, password], (err, result) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Respond with success message
      res.json({ message: 'Signup successful' }); // Notify user of successful signup
    });
  });
};