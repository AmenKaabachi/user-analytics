import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle
import styles from './LoginPage.module.css';
import axios from 'axios';

// Login Page Component
function LoginPage({ onLoginSuccess }) {
  // States for Form Input Fields and Error Messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hook for Navigation
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Default Form Submission
    setError(''); // Reset Error State
  
    // Validate Input Fields
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
  
    try {
      // Send Login Data to Backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      // Check Login Success Response
      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
  
        onLoginSuccess(); // Notify Parent Component (if needed)
        navigate('/profile'); // Navigate to Profile page
      } else {
        setError('Incorrect email or password'); // Handle Login Errors
      }
    } catch (err) {
      // Handle API or Network Errors
      console.error('Login error:', err);
      setError('Incorrect email or password'); // Display consistent error message
    }
  };
  

  return (
    <div className={styles.authPage}>
      <Container>
        <div className={styles.authWrapper}>
          <div className="user-icon text-center mb-4">
          <FaUserCircle className={styles.userIcon} />
          </div>

          {/* Display Error Message if Present */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Login Form */}
          <Form onSubmit={handleSubmit} className={styles.authForm}>
            <Form.Group controlId="formEmail" className={styles.formGroup}>
              <div className={`${styles.inputGroup}`}>
                <FaEnvelope className={styles.icon} /> {/* Icon element */}
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${styles.formControl}`}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formPassword" className={styles.formGroup}>
              <div className={`${styles.inputGroup}`}>
                <FaLock className={styles.icon} /> {/* Icon element */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${styles.formControl}`}
                />
              </div>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className={styles.submitButton}>
              Log In
            </Button>
          </Form>

          {/* Signup Link */}
          <div className="text-center mt-3">
            <p className="text-secondary mb-0">
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
