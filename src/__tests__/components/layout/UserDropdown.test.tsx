import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDropdown from '@/components/layout/UserDropdown';

const mockUser = {
  id: 'user-12345678',
  name: 'John Doe',
  email: 'john@example.com',
};

const mockOnClose = jest.fn();
const mockOnLogout = jest.fn();
const mockOnSupportClick = jest.fn();

const defaultProps = {
  isOpen: true,
  user: mockUser,
  onClose: mockOnClose,
  onLogout: mockOnLogout,
  onSupportClick: mockOnSupportClick,
};

describe('UserDropdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(<UserDropdown {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display user name', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display user ID (truncated)', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText(/user-123/)).toBeInTheDocument();
    });

    it('should display user avatar', () => {
      render(<UserDropdown {...defaultProps} />);
      const avatar = screen.getByAltText('Avatar do usuário');
      expect(avatar).toBeInTheDocument();
    });

    it('should display VIP progress section', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('MEMBRO BRAND')).toBeInTheDocument();
    });

    it('should handle user without name (show email prefix)', () => {
      const userWithoutName = { id: 'user-123', email: 'john@example.com' };
      render(<UserDropdown {...defaultProps} user={userWithoutName} />);
      expect(screen.getByText('john')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should render Minha Conta link', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Minha Conta')).toBeInTheDocument();
    });

    it('should render Carteira link', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Carteira')).toBeInTheDocument();
    });

    it('should render Apostas link', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Apostas')).toBeInTheDocument();
    });

    it('should render Prêmios e Recompensas link', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Prêmios e Recompensas')).toBeInTheDocument();
    });

    it('should render Notificações link', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Notificações')).toBeInTheDocument();
    });

    it('should have correct hrefs', () => {
      render(<UserDropdown {...defaultProps} />);
      
      const contaLink = screen.getByText('Minha Conta').closest('a');
      const carteiraLink = screen.getByText('Carteira').closest('a');
      const apostasLink = screen.getByText('Apostas').closest('a');
      const rewardsLink = screen.getByText('Prêmios e Recompensas').closest('a');
      
      expect(contaLink).toHaveAttribute('href', '/account');
      expect(carteiraLink).toHaveAttribute('href', '/wallet');
      expect(apostasLink).toHaveAttribute('href', '/bets');
      expect(rewardsLink).toHaveAttribute('href', '/rewards');
    });
  });

  describe('Support Button', () => {
    it('should render support button', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Suporte ao vivo')).toBeInTheDocument();
    });

    it('should call onSupportClick and onClose when support is clicked', () => {
      render(<UserDropdown {...defaultProps} />);
      const supportButton = screen.getByText('Suporte ao vivo');
      fireEvent.click(supportButton);
      expect(mockOnSupportClick).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Logout', () => {
    it('should render logout button', () => {
      render(<UserDropdown {...defaultProps} />);
      expect(screen.getByText('Sair')).toBeInTheDocument();
    });

    it('should call onLogout when logout is clicked', () => {
      render(<UserDropdown {...defaultProps} />);
      const logoutButton = screen.getByText('Sair');
      fireEvent.click(logoutButton);
      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Close on Outside Click', () => {
    it('should call onClose when clicking outside', () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <UserDropdown {...defaultProps} />
        </div>
      );
      
      fireEvent.mouseDown(screen.getByTestId('outside'));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not call onClose when clicking inside', () => {
      render(<UserDropdown {...defaultProps} />);
      
      fireEvent.mouseDown(screen.getByText('John Doe'));
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
