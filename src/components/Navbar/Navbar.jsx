import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import siteLogo from '../../assets/site-logo.png';

function Navbar() {
  const navigate = useNavigate();

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

  return (
    <BsNavbar bg="light" variant="dark" expand="lg" fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={siteLogo} alt="UsageLens Logo" className="site-logo" />
          <span className="ms-1" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>UsageLens</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavClick('features')}>Features</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('pricing')}>Pricing</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('footer')}>Contact</Nav.Link>
          </Nav>
          <Nav>
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            <Link to="/dashboard" className="btn btn-secondary ms-2" style={{ backgroundColor: 'blue', color: 'white' }}>Dashboard</Link>
            <Link to="/store" className="btn btn-dark ms-2 text-white">Store</Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
