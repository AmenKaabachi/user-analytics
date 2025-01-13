const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'analytics'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting to the database: ', err);
    return;
  }
  console.log('connected to the database');
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Query to find user by email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (result.length > 0) {
      const user = result[0];
      
      // Compare password with hashed password stored in DB
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // Generate a token for the user
          const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
          res.json({ token, user });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  });
});

// Listen to port
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
