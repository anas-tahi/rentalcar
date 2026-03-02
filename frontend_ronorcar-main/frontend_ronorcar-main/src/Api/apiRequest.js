// src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


const apiRequest = axios.create({
  baseURL:API_URL,
  withCredentials: true,
})

export default apiRequest;
