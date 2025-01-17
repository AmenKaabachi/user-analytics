import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';
import styles from './SignUpPage.module.css';
import axios from 'axios';

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
    <div className={styles.authPage}>
      <Container>
        <div className={styles.authWrapper}>
          <h1 className={`text-center mb-4 ${styles.authTitle}`}>Create an Account</h1>
          <div className="user-icon text-center mb-4">
            <i className="fas fa-user-circle" style={{ fontSize: '4rem', color: 'var(--linearPrimaryAccent)' }}></i>
          </div>

          {/* Display Error Message if Present */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Display Success Message if Present */}
          {success && <Alert variant="success">{success}</Alert>}

          {/* Sign Up Form */}
          <Form onSubmit={handleSubmit} className={styles.authForm}>
            <Form.Group controlId="formCompanyName" className={styles.formGroup}>
              <div className={`${styles.inputGroup}`}>
                <FaBuilding className={styles.icon} /> {/* Icon element */}
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className={`${styles.formControl}`}
                />
              </div>
            </Form.Group>

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
              Sign Up
            </Button>
          </Form>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p className="text-secondary mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SignUpPage;