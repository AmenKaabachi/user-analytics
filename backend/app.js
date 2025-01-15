import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import the authentication routes
import db from './config/db.js'; // Import the database connection

dotenv.config(); // Load environment variables

const app = express();

// Middleware Configuration
app.use(cors()); // Use default CORS middleware
app.use(express.json()); // Parse JSON requests

// Use authentication routes
app.use('/api/auth', authRoutes); // Prefix all auth routes with /api/auth

// Start the Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
