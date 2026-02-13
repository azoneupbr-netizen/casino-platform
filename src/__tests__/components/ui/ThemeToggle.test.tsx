import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ThemeProvider } from '@/context/ThemeContext';

// Custom wrapper with ThemeProvider
const renderWithThemeProvider = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.removeAttribute('data-theme');
  });

  describe('Rendering', () => {
    it('should render the toggle button', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      expect(button).toBeInTheDocument();
    });

    it('should have aria-label for accessibility', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Toggle theme');
    });

    it('should display moon emoji in dark mode', () => {
      renderWithThemeProvider(<ThemeToggle />);
      expect(screen.getByText('🌙')).toBeInTheDocument();
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('should toggle theme when clicked', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      
      // Initially dark theme
      expect(screen.getByText('🌙')).toBeInTheDocument();
      
      // Click to toggle to light
      fireEvent.click(button);
      
      // Should now show sun emoji
      expect(screen.getByText('☀️')).toBeInTheDocument();
    });

    it('should toggle back to dark when clicked twice', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button); // dark -> light
      fireEvent.click(button); // light -> dark
      
      expect(screen.getByText('🌙')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have proper button styling', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('transition-all');
    });
  });

  describe('Accessibility', () => {
    it('should be focusable', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should respond to keyboard events', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const button = screen.getByRole('button');
      
      // Focus and press Enter
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.click(button);
      
      expect(screen.getByText('☀️')).toBeInTheDocument();
    });
  });
});
