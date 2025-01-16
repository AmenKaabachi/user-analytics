import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import EditProfileTab from './tabs/EditProfileTab/EditProfileTab';
import ResetPasswordTab from './tabs/ResetPasswordTab/ResetPasswordTab';
import ActivityLogTab from './tabs/ActivityLogTab/ActivityLogTab';
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
  const [showModal, setShowModal] = useState(false); // State for modal visibility

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
        setEditForm({
          companyName: response.data.company_name || '',
          email: response.data.email || '',
        });
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setErrorMessage('Failed to load user profile.');
        setTimeout(() => setErrorMessage(''), 7000); // Clear error message after 7 seconds
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
  const handleEditSubmit = async (editForm) => {
    if (!editForm.companyName.trim() || !editForm.email.trim()) {
      setErrorMessage('Company Name and Email cannot be empty or just spaces.');
      setTimeout(() => setErrorMessage(''), 7000); // Clear error message after 7 seconds
      return;
    }
    setEditForm(editForm); // Set the editForm state
    setShowModal(true); // Show the confirmation modal
  };

  // 5. Handle confirmation of changes
  const handleConfirmChanges = async () => {
    setShowModal(false); // Hide the confirmation modal

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found. Please log in again.');
        setTimeout(() => setErrorMessage(''), 7000); // Clear error message after 7 seconds
        return;
      }

      // Send JSON data instead of FormData
      const requestBody = {
        company_name: editForm.companyName,
        email: editForm.email,
      };

      console.log('Request Body:', requestBody); // Debugging the payload

      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        requestBody, // Send the JSON payload directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set Content-Type to JSON
          },
        }
      );

      console.log('Response:', response); // Debugging the response

      // Update user data after edit
      setUser((prevUser) => ({
        ...prevUser,
        company_name: editForm.companyName,
        email: editForm.email,
      }));

      // Set success message
      setSuccessMessage('Profile edited successfully!');
      setTimeout(() => setSuccessMessage(''), 7000); // Clear success message after 7 seconds
      setErrorMessage(''); // Clear error message
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMessage('Failed to update profile.');
      setTimeout(() => setErrorMessage(''), 7000); // Clear error message after 7 seconds
      setSuccessMessage(''); // Clear success message in case of error
    }
  };

  // 6. Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 7. Handle file change for avatar upload
  const handleFileChange = (e) => {
    setEditForm({ ...editForm, avatar: e.target.files[0] });
  };

  // Fix: Check and log editForm values before submission to ensure they are populated correctly
  console.log('Edit Form:', editForm); // Fix

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
                    <EditProfileTab
                      user={user}
                      onSubmit={handleEditSubmit}
                      successMessage={successMessage}
                      errorMessage={errorMessage}
                    />
                  </Tab>

                  {/* Reset Password Tab */}
                  <Tab
                    eventKey="resetPassword"
                    title={<strong id="tab-title-resetPassword">Reset Password</strong>}
                  >
                    <ResetPasswordTab />
                  </Tab>

                  {/* Activity Log Tab */}
                  <Tab
                    eventKey="activityLog"
                    title={<strong id="tab-title-activityLog">Activity Log</strong>}
                  >
                    <ActivityLogTab />
                  </Tab>
                </Tabs>
                <div ref={underlineRef} className={styles.underline} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to make these changes?</p>
          <p><strong>Company Name:</strong> {editForm.companyName}</p>
          <p><strong>Email:</strong> {editForm.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmChanges}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  // Function to show toast notification
  function showToast(type, message) {
    console.log('Showing toast:', type, message); // Debugging output
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 7000);
  }
}

export default ProfilePage;
