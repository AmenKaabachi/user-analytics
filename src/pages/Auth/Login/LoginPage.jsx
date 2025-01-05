import { Container } from 'react-bootstrap'
import LoginForm from '../../../components/Auth/LoginForm/LoginForm'
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <h1 className="text-center mb-4">Welcome Back</h1>
          <LoginForm />
        </div>
      </Container>
    </div>
  )
}

export default LoginPage