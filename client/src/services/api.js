import axios from 'axios';

// In production, Vite uses the full backend URL from the environment.
// Fallback to '/api' for local development if the variable isn't set.
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseURL = backendUrl ? `${backendUrl}/api` : '/api';

// Base API instance pointing to backend
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
