import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Import the authentication routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware Configuration
app.use(cors()); // Use default CORS middleware

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use authentication routes
app.use('/api/auth', authRoutes); // Prefix all auth routes with /api/auth

// Start the Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
