import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SignUpForm.css'

function SignUpForm() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      // Handle sign up logic here
    }

    setValidated(true)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter company name"
        />
        <Form.Control.Feedback type="invalid">
          Please provide your company name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          minLength="8"
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 8 characters.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Confirm password"
        />
        <Form.Control.Feedback type="invalid">
          Please confirm your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3">
        Sign Up
      </Button>
      
      <div className="text-center">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </Form>
  )
}

export default SignUpForm