import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ResetPasswordTab.module.css';

function ResetPasswordTab() {
  // State variables to manage form inputs and messages
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const [showModal, setShowModal] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ width: '1%', color: '#D73F40', text: 'Weak' });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any password fields are empty
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('All password fields are required');
      setMessageType('danger');
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('danger');
      return;
    }

    // Check if new password is the same as the current password
    if (newPassword === currentPassword) {
      setMessage('New password cannot be the same as the current password');
      setMessageType('danger');
      return;
    }

    // Show confirmation modal
    setShowModal(true);
  };

  // Handle password reset confirmation
  const handleConfirmReset = async () => {
    setShowModal(false);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.put(
        'http://localhost:5000/api/auth/reset-password', // Update the URL to point to the backend server
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Password reset successfully. Old Password: ${currentPassword}, New Password: ${newPassword}`); // Set success message
      setMessageType('success');
    } catch (error) {
      setMessage(error.response.data.message || 'Failed to reset password'); // Set error message
      setMessageType('danger');
      console.error('Error resetting password:', error);
    }
  };

  // Automatically hide the alert message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle password strength detection
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    let point = 0;
    const widthPower = ["1%", "25%", "50%", "75%", "100%"];
    const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
    const textPower = ["Very Weak", "Weak", "Normal", "Strong", "Very Strong"];

    if (value.length >= 8) {
      const arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(value)) {
          point += 1;
        }
      });
    }

    setPasswordStrength({ width: widthPower[point], color: colorPower[point], text: textPower[point] });
  };

  return (
    <div className={styles.tabContent}>
      <Form onSubmit={handleSubmit}>
        {/* Current Password Input */}
        <Form.Group controlId="formCurrentPassword">
          <Form.Label><strong>Current Password</strong></Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>
        {/* New Password Input */}
        <Form.Group controlId="formNewPassword">
          <Form.Label><strong>New Password</strong></Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <div className={styles.powerContainer}>
            <div
              className={styles.powerPoint}
              style={{
                width: passwordStrength.width,
                backgroundColor: passwordStrength.color,
              }}
            ></div>
            <span className={styles.strengthText}>{passwordStrength.text}</span>
          </div>
        </Form.Group>
        {/* Confirm New Password Input */}
        <Form.Group controlId="formConfirmPassword">
          <Form.Label><strong>Confirm New Password</strong></Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Reset Password
        </Button>
        {/* Message Display */}
        {message && (
          <Alert variant={messageType} className="mt-3 fade show">
            {message}
          </Alert>
        )}
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset your password?
          <br />
          <strong>Old Password:</strong> {currentPassword}
          <br />
          <strong>New Password:</strong> {newPassword}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReset}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResetPasswordTab;
