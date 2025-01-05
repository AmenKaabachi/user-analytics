import { Container } from 'react-bootstrap'
import SignUpForm from '../../../components/Auth/SignUpForm/SignUpForm'
import './SignUpPage.css'

function SignUpPage() {
  return (
    <div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <h1 className="text-center mb-4">Create an Account</h1>
          <SignUpForm />
        </div>
      </Container>
    </div>
  )
}

export default SignUpPage