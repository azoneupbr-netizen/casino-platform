import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountPage from '@/components/account/AccountPage';
import { ToastProvider } from '@/contexts/ToastContext';
import { api } from '@/services/api';
import { authService } from '@/services/auth';

// Mock the api module
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the auth service
jest.mock('@/services/auth', () => ({
  authService: {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    updatePassword: jest.fn(),
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  phone: '11999999999',
};

describe('AccountPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    localStorage.setItem('token', 'test-token');
    // Mock the api.get call for fetching user data
    (api.get as jest.Mock).mockResolvedValue({ data: mockUser });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render the account page title', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Minha Conta')).toBeInTheDocument();
      });
    });

    it('should render profile section', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        // Multiple "Dados Pessoais" exist (tab + heading)
        const elements = screen.getAllByText('Dados Pessoais');
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('should render security section', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
    });

    it('should fetch user profile on mount', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/auth/me');
      });
    });
  });

  describe('Profile Form', () => {
    it('should display user name', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        const nameInput = screen.getByDisplayValue('Test User');
        expect(nameInput).toBeInTheDocument();
      });
    });

    it('should display user phone', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        const phoneInput = screen.getByDisplayValue('11999999999');
        expect(phoneInput).toBeInTheDocument();
      });
    });

    it('should allow editing name', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(nameInput).toHaveValue('New Name');
    });

    it('should allow editing phone', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('11999999999')).toBeInTheDocument();
      });
      
      const phoneInput = screen.getByDisplayValue('11999999999');
      fireEvent.change(phoneInput, { target: { value: '11888888888' } });
      expect(phoneInput).toHaveValue('11888888888');
    });

    it('should submit profile update', async () => {
      (authService.updateProfile as jest.Mock).mockResolvedValue({ success: true });
      
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });
      
      const saveButton = screen.getByText('Salvar Alterações');
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(authService.updateProfile).toHaveBeenCalled();
      });
    });

    it('should handle profile update error', async () => {
      (authService.updateProfile as jest.Mock).mockRejectedValue(
        new Error('Update failed')
      );
      
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      });
      
      const saveButton = screen.getByText('Salvar Alterações');
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(authService.updateProfile).toHaveBeenCalled();
      });
    });
  });

  describe('Security Form', () => {
    it('should have password fields', async () => {
      renderWithProviders(<AccountPage />);
      
      // Click security tab
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      await waitFor(() => {
        expect(screen.getByText('Alterar Senha')).toBeInTheDocument();
      });
    });

    it('should allow entering current password', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      await waitFor(() => {
        expect(screen.getByText('Alterar Senha')).toBeInTheDocument();
      });
      
      // Check that the form labels are there
      expect(screen.getByText('Senha Atual')).toBeInTheDocument();
      expect(screen.getByText('Nova Senha')).toBeInTheDocument();
      expect(screen.getByText('Confirmar Nova Senha')).toBeInTheDocument();
    });

    it('should submit password change', async () => {
      (authService.updatePassword as jest.Mock).mockResolvedValue({ success: true });
      
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      await waitFor(() => {
        expect(screen.getByText('Alterar Senha')).toBeInTheDocument();
      });
      
      // Find password inputs by label text
      const labels = ['Senha Atual', 'Nova Senha', 'Confirmar Nova Senha'];
      const inputs = document.querySelectorAll('input[type="password"]');
      
      if (inputs.length >= 3) {
        fireEvent.change(inputs[0], { target: { value: 'oldpassword' } });
        fireEvent.change(inputs[1], { target: { value: 'newpassword123' } });
        fireEvent.change(inputs[2], { target: { value: 'newpassword123' } });
      }
      
      const changeButton = screen.getByRole('button', { name: /Atualizar Senha/i });
      fireEvent.click(changeButton);
      
      await waitFor(() => {
        expect(authService.updatePassword).toHaveBeenCalled();
      });
    });

    it('should handle password change error', async () => {
      (authService.updatePassword as jest.Mock).mockRejectedValue(
        new Error('Password change failed')
      );
      
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      await waitFor(() => {
        expect(screen.getByText('Alterar Senha')).toBeInTheDocument();
      });
      
      // Find password inputs
      const inputs = document.querySelectorAll('input[type="password"]');
      
      if (inputs.length >= 3) {
        fireEvent.change(inputs[0], { target: { value: 'oldpassword' } });
        fireEvent.change(inputs[1], { target: { value: 'newpassword123' } });
        fireEvent.change(inputs[2], { target: { value: 'newpassword123' } });
      }
      
      const changeButton = screen.getByRole('button', { name: /Atualizar Senha/i });
      fireEvent.click(changeButton);
      
      await waitFor(() => {
        expect(authService.updatePassword).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle profile fetch error', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/auth/me');
      });
      
      consoleError.mockRestore();
    });
  });

  describe('Tabs Navigation', () => {
    it('should switch to security tab', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      await waitFor(() => {
        expect(screen.getByText('Alterar Senha')).toBeInTheDocument();
      });
    });

    it('should switch back to profile tab', async () => {
      renderWithProviders(<AccountPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Segurança')).toBeInTheDocument();
      });
      
      const securityTab = screen.getByText('Segurança');
      fireEvent.click(securityTab);
      
      // The profile tab is labeled "Dados Pessoais" in the sidebar
      const profileTabs = screen.getAllByText('Dados Pessoais');
      // Click on the tab button (first occurrence is in sidebar)
      fireEvent.click(profileTabs[0]);
      
      await waitFor(() => {
        // The content area should show "Dados Pessoais" heading
        const headings = screen.getAllByText('Dados Pessoais');
        expect(headings.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('No Token', () => {
    it('should redirect when no token', async () => {
      localStorage.clear();
      
      renderWithProviders(<AccountPage />);
      
      // Component should attempt to redirect
      // We're just verifying it doesn't crash
    });
  });
});
