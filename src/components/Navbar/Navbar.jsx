import React, { useState } from 'react';
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import siteLogo from '../../assets/site-logo.png';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleNavClick = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <BsNavbar bg="light" variant="dark" expand="lg" fixed="top" className={styles.navbar}>
        <Container>
          <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={siteLogo} alt="UsageLens Logo" className={styles.siteLogo} />
            <span className={`ms-1 ${styles.navbarTitle}`}>UsageLens</span>
          </BsNavbar.Brand>
          <BsNavbar.Toggle />
          <BsNavbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleNavClick('features')} className={styles.navLink}>Features</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('pricing')} className={styles.navLink}>Pricing</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('footer')} className={styles.navLink}>Contact</Nav.Link>
            </Nav>
            <Nav>
              {!token ? (
                <>
                  <Link to="/login" className={styles.navLinkLogin}>Log In</Link>
                  <Link to="/signup" className={`btn ${styles.btnPrimary}`}>Sign Up</Link>
                </>
              ) : (
                <NavDropdown
                  title={
                    <div className={styles.hamburgerMenu}>
                      <div className={styles.bar}></div>
                      <div className={styles.bar}></div>
                      <div className={styles.bar}></div>
                    </div>
                  }
                  id="basic-nav-dropdown"
                  className={`${styles.customDropdown} dropdown`}
                  align="end"
                  show={showDropdown} // Use state to control visibility
                  onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
                  onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on leave
                >
                  <NavDropdown.Item as={Link} to="/profile" className={styles.dropdownItem}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard" className={styles.dropdownItem}>
                    Dashboard
                  </NavDropdown.Item>
                  <div className={styles.dropdownDivider}></div>
                  <NavDropdown.Item onClick={handleLogout} className={styles.dropdownItemLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </div>
  );
}

export default Navbar;
