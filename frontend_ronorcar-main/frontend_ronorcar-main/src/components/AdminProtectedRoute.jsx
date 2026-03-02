import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const AdminProtectedRoute = ({ redirectPath = '/Unauthorized' }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
