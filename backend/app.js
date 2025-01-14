import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

// Middleware Configuration
app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // Parse JSON Requests

// Set Up MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'analytics'
});

// Connect to the Database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Login API Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email); // Debugging Log

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
      const user = result[0];
      console.log('User found:', user); // Debugging Log

      // Check If Password Matches
      if (password === user.password) {
        console.log('Password match'); // Debugging Log

        // Generate a Simple JWT Token (No Password Hashing for Now)
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });

        // Respond with Success and Token
        res.json({ message: 'Login successful', token, user });
      } else {
        console.log('Password does not match'); // Debugging Log
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      console.log('User not found'); // Debugging Log
      res.status(400).json({ message: 'User not found' });
    }
  });
});

// Start the Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
