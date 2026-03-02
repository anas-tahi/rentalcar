import React, { useState, useEffect } from 'react';
import Loading from './components/Loading'; // Import the Loading component
import "../src/dist/styles.css";
import Router from './routes/Router';
import './components/i18n'; // Import the i18n configuration


function App() {
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some async operation
    setTimeout(() => {
      setLoading(false); // Set loading to false after some time
    }, 1000);
  }, []);

  return (
    <>
    
      {loading ? (
        <Loading /> 
      ) : (
        <>
        <Router/>
        </>
      )}
    </>
  );
}

export default App;
