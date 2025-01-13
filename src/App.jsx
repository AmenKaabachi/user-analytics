//import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HashRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/Login/LoginPage';
import SignUpPage from './pages/Auth/SignUp/SignUpPage';
import axios from 'axios';

// Import your Dashboard
import DashboardPage from '../../../Dashboards/coreui/src/views/dashboard/Dashboard'; 

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Define the routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/dashboard', '/store'];

  // Check if the current route matches any of the hideLayoutRoutes
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const handleLogin = async (email, password) => {
    try {
      // Send login data to the backend
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data.message === 'Login successful') {
        setAuthStatus(true);
        // Redirect to the dashboard page after login success
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <Router>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path="/analytics" element={<HomePage />} />
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route 
          path="/dashboard" 
          element={authStatus ? <DashboardPage /> : <LoginPage onLogin={handleLogin} />} 
        />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </Router>
  );
}

export default App;
