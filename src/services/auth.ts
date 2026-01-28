import { api } from './api';

export const authService = {
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  login: async (token: string) => {
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};
