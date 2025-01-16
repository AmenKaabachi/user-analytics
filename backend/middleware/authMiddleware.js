import jwt from 'jsonwebtoken';
import multer from 'multer';

// Middleware to check if the user is authenticated
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  // Verify the token
  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Use a unique filename for each file to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname); // Timestamp + original file name
  }
});

// Initialize Multer with storage configuration
export const upload = multer({ storage: storage });
