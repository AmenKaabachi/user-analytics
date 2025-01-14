import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/Login/LoginPage';
import DashboardPage from '../../../Dashboards/coreui/src/views/dashboard/Dashboard';

// Main App Component
function App() {
  // State for Authentication Status
  const [authStatus, setAuthStatus] = useState(false);

  // Get the Current Route Location
  const location = useLocation();

  // Define Routes Where Navbar and Footer Should Be Hidden
  const hideLayoutRoutes = ['/dashboard', '/store'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  // Debugging: Log the Current Route
  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  return (
    <>
      {/* Render Navbar if Layout is Not Hidden */}
      {!shouldHideLayout && <Navbar />}

      {/* Define Routes for the Application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={() => setAuthStatus(true)} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      {/* Render Footer if Layout is Not Hidden */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
