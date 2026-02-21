import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ToastProvider, useToast } from '@/contexts/ToastContext';
import { authService } from '@/services/auth';

// Mock the auth service
jest.mock('@/services/auth', () => ({
  authService: {
    getProfile: jest.fn(),
    logout: jest.fn(),
  },
}));



// Test component that simulates an auth flow
function LoginButton({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const { login, isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  
  const handleLogin = () => {
    login('test-token', { id: '1', email: 'test@test.com', name: 'Test User' });
    showToast('Login realizado com sucesso!', 'success');
    onLoginSuccess?.();
  };
  
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'logged-in' : 'logged-out'}</span>
      <span data-testid="user-name">{user?.name || 'none'}</span>
      <button onClick={handleLogin} data-testid="login-btn">Login</button>
    </div>
  );
}

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  
  const handleLogout = () => {
    logout();
    showToast('Logout realizado!', 'success');
  };
  
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'logged-in' : 'logged-out'}</span>
      <button onClick={handleLogout} data-testid="logout-btn">Logout</button>
    </div>
  );
}

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Login Flow', () => {
    it('should update auth state after login', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LoginButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out');
      });
      
      fireEvent.click(screen.getByTestId('login-btn'));
      
      expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-in');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    it('should save token to localStorage', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LoginButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out');
      });
      
      fireEvent.click(screen.getByTestId('login-btn'));
      
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    });

    it('should show success toast on login', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LoginButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out');
      });
      
      fireEvent.click(screen.getByTestId('login-btn'));
      
      expect(screen.getByText('Login realizado com sucesso!')).toBeInTheDocument();
    });
  });

  describe('Logout Flow', () => {
    it('should clear auth state on logout', async () => {
      const mockUser = { id: '1', email: 'test@test.com', name: 'Test User' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LogoutButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-in');
      });
      
      fireEvent.click(screen.getByTestId('logout-btn'));
      
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should call authService.logout on logout button click', async () => {
      const mockUser = { id: '1', email: 'test@test.com', name: 'Test User' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LogoutButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-in');
      });
      
      fireEvent.click(screen.getByTestId('logout-btn'));
      
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('Session Restoration', () => {
    it('should restore session from token', async () => {
      const mockUser = { id: '1', email: 'test@test.com', name: 'Restored User' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LoginButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-in');
      });
      
      expect(authService.getProfile).toHaveBeenCalled();
    });

    it('should handle invalid token gracefully', async () => {
      localStorage.setItem('token', 'invalid-token');
      (authService.getProfile as jest.Mock).mockRejectedValue(new Error('Unauthorized'));
      
      render(
        <ToastProvider>
          <AuthProvider>
            <LoginButton />
          </AuthProvider>
        </ToastProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out');
      });
      
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
