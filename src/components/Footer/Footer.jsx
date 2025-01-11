import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

function Footer() {
  return (
    <footer id="footer" className="footer bg-light text-dark py-4"> {/* Add id to footer */}
      <Container>
        <Row>
          <Col md={4}>
            <h5>UsageLens</h5>
            <p>Advanced analytics solutions for your business needs</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#footer">Contact</a></li>
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
  )
}

export default Footer