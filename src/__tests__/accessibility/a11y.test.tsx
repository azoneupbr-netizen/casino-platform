import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Toast from '@/components/ui/Toast';
import ThemeToggle from '@/components/ui/ThemeToggle';
import BottomNavigation from '@/components/layout/BottomNavigation';
import UserDropdown from '@/components/layout/UserDropdown';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';

expect.extend(toHaveNoViolations);

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Accessibility Tests', () => {
  describe('Toast Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Toast
          message="Test message"
          type="success"
          isVisible={true}
          onClose={jest.fn()}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations for error type', async () => {
      const { container } = render(
        <Toast
          message="Error message"
          type="error"
          isVisible={true}
          onClose={jest.fn()}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ThemeToggle Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('BottomNavigation Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<BottomNavigation />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('UserDropdown Component', () => {
    it('should have no accessibility violations', async () => {
      const mockUser = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
      };
      
      const { container } = render(
        <UserDropdown
          isOpen={true}
          user={mockUser}
          onClose={jest.fn()}
          onLogout={jest.fn()}
          onSupportClick={jest.fn()}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('Keyboard Navigation Tests', () => {
  describe('BottomNavigation', () => {
    it('should have focusable navigation links', () => {
      const { container } = render(<BottomNavigation />);
      
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('tabindex')).not.toBe('-1');
      });
    });

    it('should have focus styles on links', () => {
      const { container } = render(<BottomNavigation />);
      
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        expect(link.className).toContain('focus:');
      });
    });
  });

  describe('ThemeToggle', () => {
    it('should be keyboard accessible', () => {
      const { container } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );
      
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.getAttribute('tabindex')).not.toBe('-1');
    });
  });
});

describe('ARIA Attributes Tests', () => {
  describe('BottomNavigation', () => {
    it('should have proper aria-label on navigation', () => {
      const { container } = render(<BottomNavigation />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label');
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<BottomNavigation />);
      
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have aria-current on active link', () => {
      const { container } = render(<BottomNavigation />);
      
      const activeLink = container.querySelector('[aria-current="page"]');
      expect(activeLink).toBeInTheDocument();
    });
  });

  describe('ThemeToggle', () => {
    it('should have aria-label', () => {
      const { container } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );
      
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', 'Toggle theme');
    });
  });
});
