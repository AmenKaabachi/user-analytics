import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaChartLine, FaUsers, FaClock } from 'react-icons/fa'
import './HomePage.css'
import analyticsDashboardImg from '../../assets/analytics-dashboard.png';
import NeonButton from '../../components/NeonButton/NeonButton';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <Container>
          <Row className="dashboard-container align-items-center min-vh-100">
            <Col md={6} className="text-md-left">
              <h1>Transform Your Data into Insights</h1>
              <p className="lead">
                Powerful analytics tools to understand your users and grow your business
              </p>
              <NeonButton href="#features" className="btn btn-primary mx-auto hero-button">Get Started</NeonButton>

            </Col>
            <Col md={6} className="text-center">
              <img src={analyticsDashboardImg} alt="Analytics Dashboard" className="dashboard-image img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <FaChartLine className="feature-icon" />
                  <Card.Title>Real-time Analytics</Card.Title>
                  <Card.Text>
                    Track user behavior and engagement in real-time with our powerful dashboard
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <FaUsers className="feature-icon" />
                  <Card.Title>User Insights</Card.Title>
                  <Card.Text>
                    Understand your users better with detailed demographic and behavioral data
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <FaClock className="feature-icon" />
                  <Card.Title>Historical Data</Card.Title>
                  <Card.Text>
                    Access and analyze historical data to identify trends and patterns
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="pricing" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Pricing Plans</h2>
          <Row>
            <Col md={4}>
              <Card className="pricing-card">
                <Card.Body className="text-center">
                  <Card.Title>Starter</Card.Title>
                  <h3 className="price">$29<small>/month</small></h3>
                  <ul className="list-unstyled">
                    <li>Up to 10,000 events/month</li>
                    <li>Basic analytics</li>
                    <li>Email support</li>
                  </ul>
                  <NeonButton href="#">Choose Plan</NeonButton>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pricing-card featured">
                <Card.Body className="text-center">
                  <Card.Title>Professional</Card.Title>
                  <h3 className="price">$99<small>/month</small></h3>
                  <ul className="list-unstyled">
                    <li>Up to 100,000 events/month</li>
                    <li>Advanced analytics</li>
                    <li>Priority support</li>
                  </ul>
                  <NeonButton href="#">Choose Plan</NeonButton>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pricing-card">
                <Card.Body className="text-center">
                  <Card.Title>Enterprise</Card.Title>
                  <h3 className="price">Custom</h3>
                  <ul className="list-unstyled">
                    <li>Unlimited events</li>
                    <li>Custom solutions</li>
                    <li>24/7 support</li>
                  </ul>
                  <NeonButton href="#">Contact Us</NeonButton>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default HomePage