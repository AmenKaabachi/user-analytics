import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './LoginPage.css';

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
      const response = await axios.post('http://localhost:5000/login', { email, password });

      // Check Login Success Response
      if (response.data.message === 'Login successful') {
        onLoginSuccess(); // Notify Parent Component (App.jsx)
        navigate('/dashboard'); // Navigate to Dashboard
      } else {
        setError(response.data.message || 'Invalid credentials.'); // Handle Login Errors
      }
    } catch (err) {
      // Handle API or Network Errors
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <h1 className="text-center mb-4">Welcome Back</h1>

          {/* Display Error Message if Present */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Login Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Log In
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
