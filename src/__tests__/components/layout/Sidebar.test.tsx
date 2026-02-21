import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';

// Mock usePathname
const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => mockPathname(),
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  describe('Rendering', () => {
    it('should render the sidebar', () => {
      const { container } = render(<Sidebar />);
      expect(container.querySelector('aside')).toBeInTheDocument();
    });

    it('should render sports menu items', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      expect(screen.getByText('Esportes')).toBeInTheDocument();
    });

    it('should render casino menu items', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      expect(screen.getByText('Cassino')).toBeInTheDocument();
    });

    it('should render benefits link', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      expect(screen.getByText('Benefícios & Bônus')).toBeInTheDocument();
    });
  });

  describe('Expansion', () => {
    it('should expand on mouse enter', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      
      expect(aside).toHaveClass('w-16');
      fireEvent.mouseEnter(aside!);
      expect(aside).toHaveClass('w-64');
    });

    it('should collapse on mouse leave', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      
      fireEvent.mouseEnter(aside!);
      expect(aside).toHaveClass('w-64');
      
      fireEvent.mouseLeave(aside!);
      expect(aside).toHaveClass('w-16');
    });
  });

  describe('Sports Menu', () => {
    it('should display sport icons when collapsed', () => {
      render(<Sidebar />);
      expect(screen.getByText('⚽')).toBeInTheDocument();
      expect(screen.getByText('🏀')).toBeInTheDocument();
      expect(screen.getByText('🎾')).toBeInTheDocument();
    });

    it('should display sport names and counts when expanded', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      expect(screen.getByText('Futebol')).toBeInTheDocument();
      expect(screen.getByText('1247')).toBeInTheDocument();
      expect(screen.getByText('Basquete')).toBeInTheDocument();
    });

    it('should show leagues submenu on sport hover', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      // Find Futebol link and hover
      const futebolText = screen.getByText('Futebol');
      const futebolItem = futebolText.closest('div');
      fireEvent.mouseEnter(futebolItem!);
      
      expect(screen.getByText('Ligas em Destaque')).toBeInTheDocument();
      expect(screen.getByText('Brasil - Campeonato Paulista')).toBeInTheDocument();
    });

    it('should hide leagues submenu on mouse leave', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      const futebolText = screen.getByText('Futebol');
      const futebolItem = futebolText.closest('div');
      fireEvent.mouseEnter(futebolItem!);
      
      expect(screen.getByText('Ligas em Destaque')).toBeInTheDocument();
      
      fireEvent.mouseLeave(futebolItem!);
      expect(screen.queryByText('Ligas em Destaque')).not.toBeInTheDocument();
    });
  });

  describe('Casino Menu', () => {
    it('should display casino icons when collapsed', () => {
      render(<Sidebar />);
      expect(screen.getByText('🎰')).toBeInTheDocument();
      expect(screen.getByText('🃏')).toBeInTheDocument();
    });

    it('should display casino items when expanded', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      expect(screen.getByText('Slots')).toBeInTheDocument();
      expect(screen.getByText('2500')).toBeInTheDocument();
      expect(screen.getByText('Cassino ao Vivo')).toBeInTheDocument();
    });
  });

  describe('Account Page', () => {
    it('should return null when on account page', () => {
      mockPathname.mockReturnValue('/account');
      const { container } = render(<Sidebar />);
      expect(container.querySelector('aside')).not.toBeInTheDocument();
    });

    it('should return null when on account subpage', () => {
      mockPathname.mockReturnValue('/account/settings');
      const { container } = render(<Sidebar />);
      expect(container.querySelector('aside')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href for rewards link', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      const rewardsLink = screen.getByRole('link', { name: /benefícios/i });
      expect(rewardsLink).toHaveAttribute('href', '/rewards');
    });

    it('should have correct href for sports links', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      const sportsLinks = screen.getAllByRole('link', { name: /futebol|basquete|tênis/i });
      sportsLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/sports');
      });
    });

    it('should have correct href for casino links', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      const casinoLinks = screen.getAllByRole('link', { name: /slots|cassino ao vivo|roleta/i });
      casinoLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/casino');
      });
    });
  });

  describe('AnimatedBanner', () => {
    it('should show animated banner when expanded', () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector('aside');
      fireEvent.mouseEnter(aside!);
      
      // AnimatedBanner should be rendered (it's a div with specific classes)
      expect(screen.getByText('Bônus de Boas-vindas')).toBeInTheDocument();
    });
  });
});
