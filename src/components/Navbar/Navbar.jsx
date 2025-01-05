import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/">AnalyticsPro</BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar