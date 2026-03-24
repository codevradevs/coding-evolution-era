import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return Promise.reject(error);

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

export const vaultApi = {
  getNotes: () => api.get('/vault'),
  createNote: (data) => api.post('/vault', data),
  updateNote: (id, data) => api.put(`/vault/${id}`, data),
  deleteNote: (id) => api.delete(`/vault/${id}`),
};

export const challengeApi = {
  getChallenges: () => api.get('/challenges'),
  getChallenge: (id) => api.get(`/challenges/${id}`),
  submitChallenge: (id, data) => api.post(`/challenges/${id}/submit`, data),
  getUserSubmissions: () => api.get('/challenges/user/submissions'),
};

export const trackerApi = {
  getItems: () => api.get('/tracker'),
  createItem: (data) => api.post('/tracker', data),
  updateItem: (id, data) => api.put(`/tracker/${id}`, data),
  deleteItem: (id) => api.delete(`/tracker/${id}`),
};

export const networkApi = {
  getProfiles: () => api.get('/network/profiles'),
  getMyProfile: () => api.get('/network/profile'),
  updateProfile: (data) => api.post('/network/profile', data),
};

export const contactApi = {
  sendMessage: (data) => api.post('/contact', data),
};

export const servicesApi = {
  getServices: () => api.get('/services'),
  submitQuote: (data) => api.post('/services/quote', data),
};

export const profileApi = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  ping: (minutes) => api.post('/profile/ping', { minutes }),
};

export const certificatesApi = {
  getMine: () => api.get('/certificates'),
  award: (data) => api.post('/certificates/award', data),
  getAll: () => api.get('/certificates/all'),
  revoke: (id) => api.delete(`/certificates/${id}`),
};

export const rankingsApi = {
  get: (sort = 'xp', limit = 50) => api.get(`/rankings?sort=${sort}&limit=${limit}`),
  getMe: () => api.get('/rankings/me'),
};

export default api;
