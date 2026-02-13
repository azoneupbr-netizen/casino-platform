import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth';

// Mock the auth service
jest.mock('@/services/auth', () => ({
  authService: {
    getProfile: jest.fn(),
    logout: jest.fn(),
  },
}));



// Test component that uses the auth context
function TestComponent() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="loading">{loading.toString()}</span>
      <span data-testid="authenticated">{isAuthenticated.toString()}</span>
      <span data-testid="user-email">{user?.email || 'no-user'}</span>
      <button onClick={() => login('test-token', { id: '1', email: 'test@test.com' })} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    window.location.href = '';
  });

  describe('AuthProvider', () => {
    it('should render children correctly', () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <AuthProvider>
          <div data-testid="child">Child Content</div>
        </AuthProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should initialize loading state correctly', async () => {
      // Delay the profile resolution to observe loading state
      (authService.getProfile as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(null), 100))
      );
      localStorage.setItem('token', 'test-token');
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      // Loading should eventually become false
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      }, { timeout: 500 });
    });

    it('should set loading to false after initialization', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
    });

    it('should fetch user profile if token exists', async () => {
      const mockUser = { id: '1', email: 'test@test.com', name: 'Test User' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
      });
      expect(authService.getProfile).toHaveBeenCalled();
    });

    it('should handle profile fetch error and remove token', async () => {
      localStorage.setItem('token', 'invalid-token');
      (authService.getProfile as jest.Mock).mockRejectedValue(new Error('Unauthorized'));
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
      
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should not fetch profile if no token exists', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
      
      expect(authService.getProfile).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should save token and set user on login', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
      
      act(() => {
        screen.getByTestId('login-btn').click();
      });
      
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
    });

    it('should set isAuthenticated to true after login', async () => {
      (authService.getProfile as jest.Mock).mockResolvedValue(null);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
      
      act(() => {
        screen.getByTestId('login-btn').click();
      });
      
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
  });

  describe('logout', () => {
    it('should clear user and call authService.logout', async () => {
      const mockUser = { id: '1', email: 'test@test.com' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
      });
      
      act(() => {
        screen.getByTestId('logout-btn').click();
      });
      
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should set user to null on logout', async () => {
      const mockUser = { id: '1', email: 'test@test.com' };
      localStorage.setItem('token', 'existing-token');
      (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
      });
      
      act(() => {
        screen.getByTestId('logout-btn').click();
      });
      
      // Logout should call authService.logout
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
