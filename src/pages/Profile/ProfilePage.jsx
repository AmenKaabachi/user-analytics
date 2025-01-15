import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProfilePage.module.css'; // Import CSS module

function ProfilePage() {
  const underlineRef = useRef(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [key, setKey] = useState('profile');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
        if (!token) {
          setError('No token found. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!user) {
    return <div className={styles.loadingMessage}>Loading...</div>;
  }

  // Function to handle tab selection and underline movement
  const handleTabSelect = (k) => {
    const tabTitle = document.getElementById(`tab-title-${k}`).getBoundingClientRect();
    const underline = underlineRef.current;
    underline.style.width = `${tabTitle.width}px`;
    underline.style.transform = `translateX(${tabTitle.left}px)`;
    setKey(k);
  };

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
                  <Tab
                    eventKey="profile"
                    title={<strong id="tab-title-profile">Profile</strong>}
                  >
                    <div className={styles.profileContent}>
                      <Row>
                        <Col md={4} className={styles.avatarSection}>
                          <img
                            src="https://via.placeholder.com/150"
                            alt="Profile Avatar"
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
                                <td><strong>Phone Number:</strong></td>
                                <td>{user.phone_number}</td>
                              </tr>
                              <tr className={styles.infoRowDark}>
                                <td><strong>Address:</strong></td>
                                <td>{user.address}</td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="editProfile"
                    title={<strong id="tab-title-editProfile">Edit Profile</strong>}
                  >
                    <div className={styles.tabContent}>
                      <p>This section is under construction.</p>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="phoneVerification"
                    title={<strong id="tab-title-phoneVerification">Phone Verification</strong>}
                  >
                    <div className={styles.tabContent}>
                      <p>This section is under construction.</p>
                    </div>
                  </Tab>

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
