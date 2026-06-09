import axios from 'axios';

// Base API setup for future backend integration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
