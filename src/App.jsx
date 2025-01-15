import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/Login/LoginPage';
import SignUpPage from './pages/Auth/SignUp/SignUpPage';
//import DashboardPage from '../../../Dashboards/coreui/src/views/dashboard/Dashboard';
import DashboardPage from '../../../Dashboards/datta-able/src/views/dashboard/index';
import ProfilePage from './pages/Profile/ProfilePage'; // Import ProfilePage component

// Main App Component
function App() {
  // State for Authentication Status
  const [authStatus, setAuthStatus] = useState(false);

  // Get the Current Route Location
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  // Define Routes Where Navbar and Footer Should Be Hidden
  const hideLayoutRoutes = ['/','/dashboard', '/store'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  // Debugging: Log the Current Route
  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  // Update onLoginSuccess to navigate to the profile page
  const handleLoginSuccess = () => {
    setAuthStatus(true);
    navigate('/profile'); // Navigate to profile page on successful login
  };

  return (
    <>
      {/* Render Navbar if Layout is Not Hidden */}
      {!shouldHideLayout && <Navbar />}

      {/* Define Routes for the Application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Add ProfilePage route */}
      </Routes>

      {/* Render Footer if Layout is Not Hidden */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
