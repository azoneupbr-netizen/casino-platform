import { render, screen } from '@testing-library/react';
import AnimatedBanner from '@/components/layout/AnimatedBanner';

describe('AnimatedBanner Component', () => {
  describe('Full Variant (Default)', () => {
    it('should render the banner', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should display "Aposte Agora no Cassino" for full variant', () => {
      render(<AnimatedBanner variant="full" />);
      expect(screen.getByText('Aposte Agora no Cassino')).toBeInTheDocument();
    });

    it('should render arrow icon for full variant', () => {
      const { container } = render(<AnimatedBanner variant="full" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should have full width class', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toHaveClass('w-full');
    });
  });

  describe('Sidebar Variant', () => {
    it('should display "Bônus de Boas-vindas" for sidebar variant', () => {
      render(<AnimatedBanner variant="sidebar" />);
      expect(screen.getByText('Bônus de Boas-vindas')).toBeInTheDocument();
    });

    it('should display bonus amount for sidebar variant', () => {
      render(<AnimatedBanner variant="sidebar" />);
      expect(screen.getByText('R$ 500,00 GRÁTIS')).toBeInTheDocument();
    });

    it('should not render arrow icon for sidebar variant', () => {
      const { container } = render(<AnimatedBanner variant="sidebar" />);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('should have sidebar height class', () => {
      const { container } = render(<AnimatedBanner variant="sidebar" />);
      expect(container.firstChild).toHaveClass('h-24');
    });
  });

  describe('Styling', () => {
    it('should have gradient background class', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toHaveClass('bg-gradient-to-r');
    });

    it('should have rounded corners', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('should have hover effect class', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toHaveClass('hover:scale-[1.01]');
    });

    it('should have cursor pointer', () => {
      const { container } = render(<AnimatedBanner />);
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });
  });
});
