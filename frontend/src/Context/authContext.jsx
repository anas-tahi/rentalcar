import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../Api/apiRequest';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; }
    catch { return null; }
  });
  const navigate = useNavigate();

  // Restore token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) apiRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const updateUser = (data) => setCurrentUser(data);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete apiRequest.defaults.headers.common['Authorization'];
    navigate('/');
  };

  useEffect(() => {
    if (currentUser) localStorage.setItem('user', JSON.stringify(currentUser));
    else localStorage.removeItem('user');
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = { children: PropTypes.node.isRequired };
