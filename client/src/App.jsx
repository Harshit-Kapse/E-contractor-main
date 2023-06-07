import AuthPage from './pages/AuthPage';
import CustomerHome from './pages/customer/Home';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import VendorHome from './pages/vendor/Home';
import ContactUs from './pages/customer/ContactUs'
import Services from './pages/customer/Services'
import AboutUs from './pages/customer/AboutUs'
import Service from './pages/customer/Service';
import Feedbacks from './pages/Feedbacks';
import Bookings from './pages/vendor/Bookings';
import Profile from './pages/vendor/Profile';
import VendorDetails from './pages/customer/VendorDetails';

const App = () => {
  return (
    <div className="app">
      <Routes>

        {/* Authentication route */}
        <Route path="/" element={<AuthPage />} exact />

        {/* Customer routes */}
        <Route path="/home" element={<CustomerHome />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="services/:serviceName" element={<Service />} />
        <Route path="services/:serviceName/:vendorId" element={<VendorDetails />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Vendor routes */}
        <Route path="/vendor/home" element={<VendorHome />} />
        <Route path="/vendor/bookings" element={<Bookings />} />
        <Route path="/vendor/profile" element={<Profile />} />

        {/* Admin route for feedbacks */}
        <Route path="/admin/a638215eb/feedbacks" element={<Feedbacks />} />

      </Routes>
    </div>
  );
}

export default App;
