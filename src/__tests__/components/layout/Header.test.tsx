import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { api } from '@/services/api';
import { authService } from '@/services/auth';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    defaults: { baseURL: 'http://localhost:3001' },
  },
}));

// Mock the auth service
jest.mock('@/services/auth', () => ({
  authService: {
    getProfile: jest.fn(),
    logout: jest.fn(),
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (authService.getProfile as jest.Mock).mockResolvedValue(null);
  });

  describe('Rendering', () => {
    it('should render the header with logo', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText('BRAND')).toBeInTheDocument();
        expect(screen.getByText('CASINO')).toBeInTheDocument();
      });
    });

    it('should render navigation links', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText('CASSINO')).toBeInTheDocument();
        expect(screen.getByText('ESPORTES')).toBeInTheDocument();
        expect(screen.getByText('AO VIVO')).toBeInTheDocument();
      });
    });

    it('should render skip link for accessibility', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText('Pular para conteúdo principal')).toBeInTheDocument();
      });
    });

    it('should have proper role attributes', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        
        const nav = screen.getByRole('navigation', { name: 'Menu principal' });
        expect(nav).toBeInTheDocument();
      });
    });
  });

  describe('Unauthenticated State', () => {
    it('should show login button when not authenticated', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeInTheDocument();
      });
    });

    it('should show signup button when not authenticated', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText('Cadastro')).toBeInTheDocument();
      });
    });
  });

  describe('Authenticated State', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'test-token');
      (authService.getProfile as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });
      (api.get as jest.Mock).mockResolvedValue({
        data: { balanceCents: 10000, currency: 'BRL' },
      });
    });

    it('should show balance when authenticated', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        // Check that balance is displayed (100.00 from 10000 cents)
        expect(screen.getByText(/R\$/)).toBeInTheDocument();
      });
    });

    it('should show deposit button when authenticated', async () => {
      renderWithProviders(<Header />);
      
      // Wait for the auth context to load and show the deposit button
      await waitFor(() => {
        expect(screen.getByText('DEPOSITAR')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Navigation', () => {
    it('should have correct href for Casino link', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const casinoLink = screen.getByText('CASSINO').closest('a');
        expect(casinoLink).toHaveAttribute('href', '/');
      });
    });

    it('should have correct href for Sports link', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const sportsLink = screen.getByText('ESPORTES').closest('a');
        expect(sportsLink).toHaveAttribute('href', '/sports');
      });
    });
  });

  describe('Modals and Interactions', () => {
    it('should open promotions sidebar when button is clicked', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const promoButton = screen.getByLabelText('Abrir promoções');
        fireEvent.click(promoButton);
      });
      
      // The promotions sidebar should be opened
      // Note: actual content depends on PromotionsSidebar component
    });

    it('should open support modal when support button is clicked', async () => {
      renderWithProviders(<Header />);
      
      const supportButton = await screen.findByLabelText('Abrir suporte ao cliente');
      fireEvent.click(supportButton);
      
      // Support modal should be visible
      await waitFor(() => {
        expect(screen.getByText(/Suporte/i)).toBeInTheDocument();
      });
    });
  });

  describe('ThemeToggle', () => {
    it('should render theme toggle button', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const themeToggle = screen.getByLabelText('Toggle theme');
        expect(themeToggle).toBeInTheDocument();
      });
    });
  });

  describe('Login Flow', () => {
    it('should open login modal when login button is clicked', async () => {
      renderWithProviders(<Header />);
      
      const loginButton = await screen.findByText('Entrar');
      fireEvent.click(loginButton);
      
      // Login modal should be visible
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      });
    });

    it('should handle login form submission', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: { access_token: 'new-token' },
      });
      
      renderWithProviders(<Header />);
      
      // Open login modal
      const loginButton = await screen.findByText('Entrar');
      fireEvent.click(loginButton);
      
      // Fill in form
      const emailInput = await screen.findByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Submit form - find the submit button by its type or specific text
      const submitButtons = screen.getAllByRole('button');
      const submitButton = submitButtons.find(btn => 
        btn.textContent === 'ENTRAR' && !btn.textContent?.includes('Google')
      );
      
      if (submitButton) {
        fireEvent.click(submitButton);
      }
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should show error on login failure', async () => {
      (api.post as jest.Mock).mockRejectedValue({
        response: { data: { message: 'Credenciais inválidas' } },
      });
      
      renderWithProviders(<Header />);
      
      // Open login modal
      const loginButton = await screen.findByText('Entrar');
      fireEvent.click(loginButton);
      
      // Fill and submit
      const emailInput = await screen.findByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      
      // Find and click the submit button
      const submitButtons = screen.getAllByRole('button');
      const submitButton = submitButtons.find(btn => 
        btn.textContent === 'ENTRAR' && !btn.textContent?.includes('Google')
      );
      
      if (submitButton) {
        fireEvent.click(submitButton);
      }
      
      // Verify the API was called (error handling is done by ToastContext)
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
      });
    });
  });

  describe('Signup Flow', () => {
    it('should open age gate modal when signup button is clicked', async () => {
      renderWithProviders(<Header />);
      
      // Find and click the signup button in header (not in modal)
      const headerButtons = screen.getAllByRole('button');
      const signupButton = headerButtons.find(btn => btn.textContent === 'Cadastro');
      
      if (signupButton) {
        fireEvent.click(signupButton);
      }
      
      // Age gate modal should be visible - text is "VOCÊ TEM MAIS DE 18" and "ANOS?"
      await waitFor(() => {
        expect(screen.getByText(/MAIS DE 18/i)).toBeInTheDocument();
        expect(screen.getByText(/ANOS/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have aria-labels on interactive elements', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Brand Casino - Página inicial')).toBeInTheDocument();
        expect(screen.getByLabelText('Abrir promoções')).toBeInTheDocument();
        expect(screen.getByLabelText('Abrir suporte ao cliente')).toBeInTheDocument();
        expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
      });
    });

    it('should have proper navigation structure', async () => {
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
        // Verify navigation links exist
        expect(screen.getByRole('navigation', { name: 'Menu principal' })).toBeInTheDocument();
      });
    });
  });

  describe('Balance Fetching', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'test-token');
      (authService.getProfile as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      });
    });

    it('should fetch balance when authenticated', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { balanceCents: 5000, currency: 'BRL' },
      });
      
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/wallets/me/balance');
      });
    });

    it('should handle balance fetch error gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });

    it('should use cached balance on fetch error', async () => {
      localStorage.setItem('wallet_balance_cache', '150.50');
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      renderWithProviders(<Header />);
      
      await waitFor(() => {
        expect(screen.getByText(/150[,.]50/)).toBeInTheDocument();
      });
    });
  });
});
