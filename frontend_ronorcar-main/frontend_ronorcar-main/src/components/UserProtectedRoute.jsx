// src/components/UserProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const UserProtectedRoute = ({ redirectPath = '/unauthorized' }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.isAdmin) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
