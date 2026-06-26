import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const UserProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to="/login" />;
  return <Outlet />;
};

export default UserProtectedRoute;
