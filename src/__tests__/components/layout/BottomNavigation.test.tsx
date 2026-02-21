import React from 'react';
import { render, screen } from '@testing-library/react';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Mock usePathname
const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('BottomNavigation Component', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the navigation container', () => {
      render(<BottomNavigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render all navigation items', () => {
      render(<BottomNavigation />);
      
      expect(screen.getByText('Cassino')).toBeInTheDocument();
      expect(screen.getByText('Esportes')).toBeInTheDocument();
      expect(screen.getByText('Ao Vivo')).toBeInTheDocument();
      expect(screen.getByText('Promo')).toBeInTheDocument();
      expect(screen.getByText('Conta')).toBeInTheDocument();
    });

    it('should render navigation icons', () => {
      render(<BottomNavigation />);
      
      expect(screen.getByText('🎰')).toBeInTheDocument();
      expect(screen.getByText('⚽')).toBeInTheDocument();
      expect(screen.getByText('🎥')).toBeInTheDocument();
      expect(screen.getByText('🎁')).toBeInTheDocument();
      expect(screen.getByText('👤')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct hrefs', () => {
      render(<BottomNavigation />);
      
      const cassinoLink = screen.getByRole('link', { name: /ir para cassino/i });
      const esportesLink = screen.getByRole('link', { name: /ir para esportes/i });
      const promoLink = screen.getByRole('link', { name: /ver promoções/i });
      const contaLink = screen.getByRole('link', { name: /minha conta/i });
      
      expect(cassinoLink).toHaveAttribute('href', '/');
      expect(esportesLink).toHaveAttribute('href', '/sports');
      expect(promoLink).toHaveAttribute('href', '/promotions');
      expect(contaLink).toHaveAttribute('href', '/account');
    });
  });

  describe('Active State', () => {
    it('should highlight Casino when on home page', () => {
      mockPathname.mockReturnValue('/');
      render(<BottomNavigation />);
      
      const cassinoLink = screen.getByRole('link', { name: /ir para cassino/i });
      expect(cassinoLink).toHaveClass('text-[#ff4d00]');
      expect(cassinoLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight Sports when on sports page', () => {
      mockPathname.mockReturnValue('/sports');
      render(<BottomNavigation />);
      
      const esportesLink = screen.getByRole('link', { name: /ir para esportes/i });
      expect(esportesLink).toHaveClass('text-[#ff4d00]');
      expect(esportesLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight Promotions when on promotions page', () => {
      mockPathname.mockReturnValue('/promotions');
      render(<BottomNavigation />);
      
      const promoLink = screen.getByRole('link', { name: /ver promoções/i });
      expect(promoLink).toHaveClass('text-[#ff4d00]');
    });

    it('should highlight Account when on account page', () => {
      mockPathname.mockReturnValue('/account');
      render(<BottomNavigation />);
      
      const contaLink = screen.getByRole('link', { name: /minha conta/i });
      expect(contaLink).toHaveClass('text-[#ff4d00]');
    });

    it('should not highlight inactive items', () => {
      mockPathname.mockReturnValue('/');
      render(<BottomNavigation />);
      
      const esportesLink = screen.getByRole('link', { name: /ir para esportes/i });
      expect(esportesLink).toHaveClass('text-gray-400');
      expect(esportesLink).not.toHaveAttribute('aria-current');
    });
  });

  describe('Accessibility', () => {
    it('should have proper navigation role', () => {
      render(<BottomNavigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Menu de navegação móvel');
    });

    it('should have aria-labels on all links', () => {
      render(<BottomNavigation />);
      
      expect(screen.getByRole('link', { name: /ir para cassino/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /ir para esportes/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /ir para jogos ao vivo/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /ver promoções/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /minha conta/i })).toBeInTheDocument();
    });

    it('should have aria-hidden on icons', () => {
      render(<BottomNavigation />);
      
      const icons = screen.getAllByText(/[🎰⚽🎥🎁👤]/);
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have focus styles', () => {
      render(<BottomNavigation />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('focus:outline-none');
        expect(link).toHaveClass('focus:ring-2');
      });
    });
  });

  describe('Styling', () => {
    it('should be hidden on medium and larger screens', () => {
      render(<BottomNavigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('md:hidden');
    });

    it('should be fixed at the bottom', () => {
      render(<BottomNavigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed');
      expect(nav).toHaveClass('bottom-0');
    });

    it('should have proper z-index', () => {
      render(<BottomNavigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('z-[9999]');
    });
  });
});
