// src/Pages/NotFound.js
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="404"
        title="Sorry!"
        subTitle="We can't seem to find the resource you're looking for."
        extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
      />
    </div>
  );
};

export default NotFound;
