import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Test component that displays theme info
function ThemeDisplay() {
  const { theme } = useTheme();
  return <span data-testid="theme-display">{theme}</span>;
}

describe('Theme Flow Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.removeAttribute('data-theme');
  });

  describe('Theme Toggle Integration', () => {
    it('should toggle theme and update display', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
          <ThemeDisplay />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
      
      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      
      act(() => {
        fireEvent.click(toggleBtn);
      });
      
      expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    });

    it('should persist theme preference', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
          <ThemeDisplay />
        </ThemeProvider>
      );
      
      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      
      act(() => {
        fireEvent.click(toggleBtn);
      });
      
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should update document classes', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
          <ThemeDisplay />
        </ThemeProvider>
      );
      
      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      
      act(() => {
        fireEvent.click(toggleBtn);
      });
      
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should display correct icon for theme', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );
      
      // Initially dark theme - moon icon
      expect(screen.getByText('🌙')).toBeInTheDocument();
      
      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      
      act(() => {
        fireEvent.click(toggleBtn);
      });
      
      // After toggle - sun icon
      expect(screen.getByText('☀️')).toBeInTheDocument();
    });
  });

  describe('Multiple Components Sharing Theme', () => {
    it('should sync theme across multiple components', () => {
      function MultiThemeDisplay() {
        return (
          <>
            <ThemeDisplay />
            <div data-testid="theme-display-2">
              <ThemeDisplay />
            </div>
          </>
        );
      }
      
      render(
        <ThemeProvider>
          <ThemeToggle />
          <MultiThemeDisplay />
        </ThemeProvider>
      );
      
      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      
      act(() => {
        fireEvent.click(toggleBtn);
      });
      
      const displays = screen.getAllByTestId('theme-display');
      displays.forEach(display => {
        expect(display).toHaveTextContent('light');
      });
    });
  });
});
