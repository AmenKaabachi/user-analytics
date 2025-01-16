import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProfilePage.module.css';

import noAvatarImage from '../../assets/no-avatar.png';

function ProfilePage() {
  const underlineRef = useRef(null);
  
  // 1. State Management
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [key, setKey] = useState('profile');
  const [editForm, setEditForm] = useState({
    companyName: '',
    email: '',
    // avatar: null, // Commenting out avatar for now
  });

  // 2. Fetch user profile data on page load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
        if (!token) {
          setErrorMessage('No token found. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setErrorMessage('Failed to load user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  // 3. Handle tab selection for active tab navigation
  const handleTabSelect = (k) => {
    const tabTitle = document.getElementById(`tab-title-${k}`).getBoundingClientRect();
    const underline = underlineRef.current;
    underline.style.width = `${tabTitle.width}px`;
    underline.style.transform = `translateX(${tabTitle.left}px)`;
    setKey(k);
  };

  // 4. Handle form submission for editing profile
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('company_name', 'olap'); // Hardcoded for testing
      formData.append('email', 'aa@gmail.com'); // Hardcoded for testing

      // if (editForm.avatar) formData.append('avatar', editForm.avatar); // Commenting out avatar for now

      // Debugging output: log formData entries before the request
      for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key}: ${value}`);
      }

      // Ensure that the request is correctly formed and headers are set
      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response); // Debugging the response

      // Update user data after edit
      setUser((prevUser) => ({
        ...prevUser,
        company_name: editForm.companyName,
        email: editForm.email,
      }));

      // Set success message
      setSuccessMessage('Profile edited successfully!');
      setErrorMessage(''); // Clear error message

    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMessage('Failed to update profile.');
      setSuccessMessage(''); // Clear success message in case of error
    }
  };

  // 5. Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 6. Handle file change for avatar upload
  const handleFileChange = (e) => {
    setEditForm({ ...editForm, avatar: e.target.files[0] });
  };

  // Fix: Check and log editForm values before submission to ensure they are populated correctly
  console.log('Edit Form:', editForm); // Fix

  // 7. Render error message if any
  if (errorMessage) {
    return <div className={styles.errorMessage}>{errorMessage}</div>;
  }

  // 8. Render loading message if user data is not yet loaded
  if (!user) {
    return <div className={styles.loadingMessage}>Loading...</div>;
  }

  // 9. Render profile page UI
  return (
    <div className={`${styles.profilePage} mt-4`}>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <Card className={styles.profileCard}>
              <Card.Body>
                <Tabs
                  id="profile-tabs"
                  activeKey={key}
                  onSelect={handleTabSelect}
                  className={styles.tabs}
                >
                  {/* Profile Tab */}
                  <Tab
                    eventKey="profile"
                    title={<strong id="tab-title-profile">Profile</strong>}
                  >
                    <div className={styles.profileContent}>
                      <Row>
                        <Col md={4} className={styles.avatarSection}>
                          <img
                            src={user.avatar ? user.avatar : noAvatarImage}
                            alt={user.avatar ? "User Avatar" : "No Avatar Available"}
                            className={styles.avatar}
                          />
                        </Col>
                        <Col md={8} className={styles.infoSection}>
                          <table className={styles.infoTable}>
                            <tbody>
                              <tr className={styles.infoRowLight}>
                                <td><strong>Company Name:</strong></td>
                                <td>{user.company_name}</td>
                              </tr>
                              <tr className={styles.infoRowDark}>
                                <td><strong>Email:</strong></td>
                                <td>{user.email}</td>
                              </tr>
                              <tr className={styles.infoRowLight}>
                                <td><strong>Status:</strong></td>
                                <td>Active</td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </div>
                  </Tab>

                  {/* Edit Profile Tab */}
                  <Tab
                    eventKey="editProfile"
                    title={<strong id="tab-title-editProfile">Edit Profile</strong>}
                  >
                    <div className={styles.tabContent}>
                      <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="formCompanyName">
                          <Form.Label><strong>Company Name</strong></Form.Label>
                          <Form.Control
                            type="text"
                            name="companyName"
                            value={editForm.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label><strong>Email</strong></Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                        {/* Commenting out avatar field for now */}
                        {/* <Form.Group controlId="formAvatar">
                          <Form.Label>Avatar</Form.Label>
                          <Form.Control
                            type="file"
                            name="avatar"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="mt-3">
                          Save Changes
                        </Button>
                        
                        {/* Success or Error message */}
                        {successMessage && (
                          <div style={{ color: '#32CD32', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div style={{ color: '#8B0000', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
                            {errorMessage}
                          </div>
                        )}
                      </Form>
                    </div>
                  </Tab>

                  {/* Placeholder for other tabs */}
                  <Tab
                    eventKey="resetPassword"
                    title={<strong id="tab-title-resetPassword">Reset Password</strong>}
                  >
                    <div className={styles.tabContent}>
                      <p>This section is under construction.</p>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="activityLog"
                    title={<strong id="tab-title-activityLog">Activity Log</strong>}
                  >
                    <div className={styles.tabContent}>
                      <p>This section is under construction.</p>
                    </div>
                  </Tab>
                </Tabs>
                <div ref={underlineRef} className={styles.underline} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
