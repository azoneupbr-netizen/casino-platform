import { authService } from '@/services/auth';
import { api } from '@/services/api';

// Mock the api module
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getProfile', () => {
    it('should call api.get with /auth/me', async () => {
      const mockUser = { id: '1', email: 'test@test.com', name: 'Test User' };
      (api.get as jest.Mock).mockResolvedValue({ data: mockUser });

      const result = await authService.getProfile();

      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });

    it('should propagate errors', async () => {
      const error = new Error('Unauthorized');
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(authService.getProfile()).rejects.toThrow('Unauthorized');
    });
  });

  describe('updateProfile', () => {
    it('should call api.put with /auth/me and data', async () => {
      const updateData = { name: 'New Name', phone: '123456789' };
      const mockResponse = { ...updateData, id: '1', email: 'test@test.com' };
      (api.put as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await authService.updateProfile(updateData);

      expect(api.put).toHaveBeenCalledWith('/auth/me', updateData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle partial updates', async () => {
      const updateData = { name: 'New Name' };
      (api.put as jest.Mock).mockResolvedValue({ data: updateData });

      await authService.updateProfile(updateData);

      expect(api.put).toHaveBeenCalledWith('/auth/me', updateData);
    });
  });

  describe('updatePassword', () => {
    it('should call api.put with /auth/me/password and data', async () => {
      const passwordData = { currentPassword: 'old123', newPassword: 'new123' };
      (api.put as jest.Mock).mockResolvedValue({ data: { success: true } });

      const result = await authService.updatePassword(passwordData);

      expect(api.put).toHaveBeenCalledWith('/auth/me/password', passwordData);
      expect(result).toEqual({ success: true });
    });

    it('should handle password update without current password', async () => {
      const passwordData = { newPassword: 'new123' };
      (api.put as jest.Mock).mockResolvedValue({ data: { success: true } });

      await authService.updatePassword(passwordData);

      expect(api.put).toHaveBeenCalledWith('/auth/me/password', passwordData);
    });
  });

  describe('login', () => {
    it('should save token to localStorage', async () => {
      await authService.login('test-token');

      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('token', 'existing-token');

      authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
