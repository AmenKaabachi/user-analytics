import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/Login/LoginPage';
import SignUpPage from './pages/Auth/SignUp/SignUpPage';

import DashboardPage from '../../../Dashboards/coreui/src/views/dashboard/Dashboard'; 
//import DashboardPage from '../../../Dashboards/datta-able/src/views/dashboard/index'; 
//import Store from '../../shop/src/pages/Home'; 

function App() {
  const location = useLocation();

  // Define the routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/dashboard', '/store'];

  // Check if the current route matches any of the hideLayoutRoutes
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path="/analytics" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}


export default App;
