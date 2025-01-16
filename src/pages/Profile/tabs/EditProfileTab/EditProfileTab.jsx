import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './EditProfileTab.module.css';

function EditProfileTab({ user, onSubmit, successMessage, errorMessage }) {
  const [editForm, setEditForm] = useState({
    companyName: user.company_name || '',
    email: user.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditForm({ ...editForm, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editForm);
  };

  return (
    <div className={styles.tabContent}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCompanyName">
          <Form.Label><strong>Company Name</strong></Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={editForm.companyName}
            onChange={handleInputChange}
            placeholder={user.company_name}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleInputChange}
            placeholder={user.email}
          />
        </Form.Group>
        <Form.Group controlId="formAvatar">
          <Form.Label style={{ marginTop: '0.5rem' }}><strong>Avatar</strong></Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
        
        {successMessage && (
          <Alert variant="success" className="mt-3 fade show">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" className="mt-3 fade show">
            {errorMessage}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default EditProfileTab;
