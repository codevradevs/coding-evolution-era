import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminRefreshToken')
      localStorage.removeItem('adminUser')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const adminApi = {
  login:   (email, password) => api.post('/auth/login', { email, password }),
  refresh: (refreshToken)    => api.post('/auth/refresh', { refreshToken }),

  // Users (via /api/users)
  getUsers:       (params = {}) => api.get('/users', { params }),
  getUserStats:   ()            => api.get('/users/stats'),
  updateUserRole: (id, role)    => api.patch(`/users/${id}/role`, { role }),
  deleteUser:     (id)          => api.delete(`/users/${id}`),

  // All admin CRUD via /api/admin
  // Blogs
  getBlogs:    (params = {}) => api.get('/admin/blogs',    { params }),
  createBlog:  (data)        => api.post('/admin/blogs',   data),
  updateBlog:  (id, data)    => api.put(`/admin/blogs/${id}`, data),
  deleteBlog:  (id)          => api.delete(`/admin/blogs/${id}`),

  // Challenges
  getChallenges:    (params = {}) => api.get('/admin/challenges',    { params }),
  createChallenge:  (data)        => api.post('/admin/challenges',   data),
  updateChallenge:  (id, data)    => api.put(`/admin/challenges/${id}`, data),
  deleteChallenge:  (id)          => api.delete(`/admin/challenges/${id}`),

  // Tips
  getTips:    (params = {}) => api.get('/admin/tips',    { params }),
  createTip:  (data)        => api.post('/admin/tips',   data),
  updateTip:  (id, data)    => api.put(`/admin/tips/${id}`, data),
  deleteTip:  (id)          => api.delete(`/admin/tips/${id}`),

  // Products
  getProducts:    (params = {}) => api.get('/admin/products',    { params }),
  createProduct:  (data)        => api.post('/admin/products',   data),
  updateProduct:  (id, data)    => api.put(`/admin/products/${id}`, data),
  deleteProduct:  (id)          => api.delete(`/admin/products/${id}`),

  // Certificates
  getCertificates:    (params = {}) => api.get('/admin/certificates',    { params }),
  createCertificate:  (data)        => api.post('/admin/certificates',   data),
  updateCertificate:  (id, data)    => api.put(`/admin/certificates/${id}`, data),
  deleteCertificate:  (id)          => api.delete(`/admin/certificates/${id}`),

  // Service Quotes
  getQuotes:    (params = {}) => api.get('/admin/quotes',    { params }),
  updateQuote:  (id, data)    => api.put(`/admin/quotes/${id}`, data),
  deleteQuote:  (id)          => api.delete(`/admin/quotes/${id}`),

  // Submissions
  getSubmissions:    (params = {}) => api.get('/admin/submissions', { params }),
  deleteSubmission:  (id)          => api.delete(`/admin/submissions/${id}`),

  // Vault Notes
  getVaultNotes:    (params = {}) => api.get('/admin/vault',    { params }),
  deleteVaultNote:  (id)          => api.delete(`/admin/vault/${id}`),

  // Tracker Items
  getTrackerItems:    (params = {}) => api.get('/admin/tracker',    { params }),
  deleteTrackerItem:  (id)          => api.delete(`/admin/tracker/${id}`),

  // Network Profiles
  getNetworkProfiles:    (params = {}) => api.get('/admin/network',    { params }),
  deleteNetworkProfile:  (id)          => api.delete(`/admin/network/${id}`),

  // User Profiles
  getUserProfiles:    (params = {}) => api.get('/admin/userprofiles',    { params }),
  updateUserProfile:  (id, data)    => api.put(`/admin/userprofiles/${id}`, data),

  // Rankings
  getRankings:    (params = {}) => api.get('/admin/rankings',    { params }),
  updateRanking:  (id, data)    => api.put(`/admin/rankings/${id}`, data),
  deleteRanking:  (id)          => api.delete(`/admin/rankings/${id}`),

  // Contacts
  getContacts:    (params = {}) => api.get('/admin/contacts',    { params }),
  deleteContact:  (id)          => api.delete(`/admin/contacts/${id}`),

  // Projects
  getProjects:    (params = {}) => api.get('/admin/projects',    { params }),
  getProject:     (id)          => api.get(`/admin/projects/${id}`),
  createProject:  (data)        => api.post('/admin/projects',   data),
  updateProject:  (id, data)    => api.put(`/admin/projects/${id}`, data),
  deleteProject:  (id)          => api.delete(`/admin/projects/${id}`),

  // Blog categories (public)
  getBlogCategories: () => api.get('/blogs/categories'),
}

export default api
