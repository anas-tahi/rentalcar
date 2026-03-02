import React from "react";
import { createContext, useState, useEffect } from "react";
import apiRequest from "../Api/apiRequest";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  const logout = async () => {
    try {
      setLoggingOut(true);
      
      // Clear local state immediately for fast logout
      setCurrentUser(null);
      localStorage.removeItem("user");
      
      // Navigate to home immediately
      navigate("/");
      
      // Make API call in background (don't wait for it)
      apiRequest.post("/auth/logout").catch(error => {
        console.error("Logout API error: ", error);
      });
      
      // Force page reload to clear all state
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error("Logout error: ", error);
      // Still clear local state even if API fails
      setCurrentUser(null);
      localStorage.removeItem("user");
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logout }}>
      {!loggingOut ? (
        <>
          {children}
        </>
      ) : (
        <div>Loading...</div> // Display a loading indicator while logging out
      )}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};