import { api } from './api';

export const authService = {
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  updateProfile: async (data: { name?: string; phone?: string }) => {
    const response = await api.put('/auth/me', data);
    return response.data;
  },
  updatePassword: async (data: { currentPassword?: string; newPassword: string }) => {
    const response = await api.put('/auth/me/password', data);
    return response.data;
  },
  login: async (token: string) => {
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};
