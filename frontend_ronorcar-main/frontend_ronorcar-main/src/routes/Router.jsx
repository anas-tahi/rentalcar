// src/Router.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Pages/About";
import Home from "../Pages/Home";
import Models from "../Pages/Models";
import TestimonialsPage from "../Pages/TestimonialsPage";
import Team from "../Pages/Team";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import DashboardAdmin from "../Pages/DashboardAdmin";
import DashboardUser from "../Pages/DashboardUser";
import PaymentPage from "../Pages/PaymentPage";
import Unauthorized from "../Pages/Unauthorized"; // Import Unauthorized
import ProtectedRoute from "../components/ProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute"; // Import AdminProtectedRoute
import UserProtectedRoute from "../components/UserProtectedRoute"; // Import UserProtectedRoute
import NotFound from "../components/NotFound";
import UnifiedBooking from "../Pages/UnifiedBooking";
import AllCarsPage from "../Pages/AllCarPage";
import RentCarPage from "../Pages/RentCarPage";
import PaymentOptions from "../Pages/PaymentOptions";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/models" element={<Models />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/cars" element={<AllCarsPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/payment/:carId" element={<PaymentPage />} />
      </Route>

      <Route element={<UserProtectedRoute />}>
        <Route path="/dashboard/User/*" element={<DashboardUser />} />
        <Route path="/booking" element={<UnifiedBooking />} />
        <Route path="/Booking" element={<UnifiedBooking />} />
        <Route path="/dashboard/user/rent-car" element={<UnifiedBooking />} />
        <Route path="/rent-car/:carId" element={<RentCarPage />} />
        <Route path="/payment-options" element={<PaymentOptions />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard/Admin/*" element={<DashboardAdmin />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
