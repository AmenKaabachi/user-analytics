// LoginPage.jsx (Frontend)
import { useState } from 'react';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onLogin function passed from App.jsx
    onLogin(email, password);
  };

  return (
    <div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <h1 className="text-center mb-4">Welcome Back</h1>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

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

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

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
