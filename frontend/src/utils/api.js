import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If in production and no explicit API URL, use the production backend
  if (import.meta.env.PROD) {
    return 'https://bug-tracker-3dlf.onrender.com/api';
  }
  
  // Default to local development
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

// Log the API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
  console.log('🌍 Environment:', import.meta.env.MODE);
  console.log('🔧 VITE_API_URL:', import.meta.env.VITE_API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Public bug reporting
export const reportBugPublic = (bugData) => api.post('/public/bugs', bugData);
export const getPublicProjects = () => api.get('/public/projects');

// User Management
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Project Management
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (projectData) => api.post('/projects', projectData);
export const updateProject = (id, projectData) => api.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Bug Management
export const getBugs = (params) => api.get('/bugs', { params });
export const getBug = (id) => api.get(`/bugs/${id}`);
export const createBug = (bugData) => api.post('/bugs', bugData);
export const updateBug = (id, bugData) => api.put(`/bugs/${id}`, bugData);
export const deleteBug = (id) => api.delete(`/bugs/${id}`);
export const assignBug = (bugId, developerId) => api.put(`/bugs/${bugId}/assign`, { assignedTo: developerId });
export const updateBugStatus = (bugId, status, progressNote) => api.put(`/bugs/${bugId}/status`, { status, progressNote });

// Statistics
export const getDashboardStats = (role) => api.get(`/stats/dashboard?role=${role}`);

export default api;
