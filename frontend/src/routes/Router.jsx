import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import AllCarPage from '../Pages/AllCarPage';
import DashboardAdmin from '../Pages/DashboardAdmin';
import DashboardUser from '../Pages/DashboardUser';
import PaymentPage from '../Pages/PaymentPage';
import Unauthorized from '../Pages/Unauthorized';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminProtectedRoute from '../components/AdminProtectedRoute';
import NotFound from '../components/NotFound';
import UnifiedBooking from '../Pages/UnifiedBooking';
import RentCarPage from '../Pages/RentCarPage';
import PaymentOptions from '../Pages/PaymentOptions';

export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cars" element={<AllCarPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected — any logged in user */}
      <Route element={<ProtectedRoute />}>
        <Route path="/rent-car/:carId" element={<RentCarPage />} />
        <Route path="/booking" element={<UnifiedBooking />} />
        <Route path="/payment/:carId" element={<PaymentPage />} />
        <Route path="/payment-options" element={<PaymentOptions />} />
        <Route path="/dashboard/user/*" element={<DashboardUser />} />
        <Route path="/dashboard/User/*" element={<DashboardUser />} />
      </Route>

      {/* Admin only */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard/admin/*" element={<DashboardAdmin />} />
        <Route path="/dashboard/Admin/*" element={<DashboardAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
