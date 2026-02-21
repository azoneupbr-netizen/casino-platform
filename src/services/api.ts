import axios from 'axios';

// Backend API URL - defaults to deployed backend or localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://n8n-casino-api.hzkzun.easypanel.host';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor - add auth token and tenant domain
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Add JWT token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add tenant domain header for multi-tenancy
    const tenantDomain = window.location.hostname;
    config.headers['x-tenant-domain'] = tenantDomain;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      const status = error.response.status;
      
      // Unauthorized - token expired or invalid
      if (status === 401) {
        // Clear token and redirect to login if needed
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          // Don't redirect if already on auth pages
          if (!currentPath.includes('/auth')) {
            localStorage.removeItem('token');
            // You could dispatch an event or use a callback here
            console.warn('Session expired. Please login again.');
          }
        }
      }
      
      // Forbidden - insufficient permissions
      if (status === 403) {
        console.error('Access denied. Insufficient permissions.');
      }
      
      // Not Found
      if (status === 404) {
        console.error('Resource not found:', error.config?.url);
      }
      
      // Server error
      if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Export base URL for reference
export const getApiBaseUrl = () => API_BASE_URL;
