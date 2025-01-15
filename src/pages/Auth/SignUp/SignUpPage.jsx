import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SignUpPage.css';

// Sign Up Page Component
function SignUpPage() {
  // States for Form Input Fields and Error Messages
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Hook for Navigation
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Default Form Submission
    setError(''); // Reset Error State
    setSuccess(''); // Reset Success State

    // Validate Input Fields
    if (!companyName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send Signup Data to Backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', { companyName, email, password });

      // Check Signup Success Response
      if (response.data.message === 'Signup successful') {
        setSuccess('Account created successfully!'); // Notify user of success
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a short delay
        }, 2000);
      } else {
        setError(response.data.message || 'Signup failed.'); // Handle Signup Errors
      }
    } catch (err) {
      // Handle API or Network Errors
      console.error('Signup error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <h1 className="text-center mb-4">Create an Account</h1>

          {/* Display Error Message if Present */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Display Success Message if Present */}
          {success && <Alert variant="success">{success}</Alert>}

          {/* Sign Up Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
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
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignUpPage;