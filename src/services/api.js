import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const taskAPI = {
  getTasks: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    return api.get(`/tasks?${searchParams}`);
  },
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  bulkUpdate: ({ ids, updates }) => api.patch('/tasks/bulk', { ids, updates }),
  getAnalytics: () => api.get('/tasks/analytics')
};

export default api;