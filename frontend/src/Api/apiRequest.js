import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://drivees-gateway.onrender.com/api';

const apiRequest = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Auto-attach token from localStorage
apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiRequest;