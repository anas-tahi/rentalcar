import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
