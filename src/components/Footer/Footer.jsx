import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
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
    <footer id="footer" className="footer bg-light text-dark py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>UsageLens</h5>
            <p>Advanced analytics solutions for your business needs</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="#" onClick={() => handleNavClick('features')}>Features</Link></li>
              <li><Link to="#" onClick={() => handleNavClick('pricing')}>Pricing</Link></li>
              <li><Link to="#" onClick={() => handleNavClick('footer')}>Contact</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@UsageLens.com</p>
            <p>Phone: (555) 123-4567</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 UsageLens. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;