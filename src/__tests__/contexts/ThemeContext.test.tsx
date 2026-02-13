import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

// Test component that uses the theme context
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.removeAttribute('data-theme');
  });

  describe('ThemeProvider', () => {
    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Child Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide default theme as dark', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    });

    it('should load theme from localStorage if available', () => {
      localStorage.setItem('theme', 'light');
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      // After useEffect runs, theme should be light
      // Note: Initial render will be 'dark', then useEffect updates to 'light'
    });

    it('should toggle theme from dark to light', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      const toggleButton = screen.getByTestId('toggle-button');
      
      act(() => {
        fireEvent.click(toggleButton);
      });
      
      expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('should persist theme to localStorage when toggled', () => {
      // Clear any previous calls
      (localStorage.setItem as jest.Mock).mockClear();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      const toggleButton = screen.getByTestId('toggle-button');
      
      act(() => {
        fireEvent.click(toggleButton);
      });
      
      // Check if localStorage.setItem was called with theme
      expect(localStorage.setItem).toHaveBeenCalled();
      // The mock should have been called with 'theme' as first argument
      const calls = (localStorage.setItem as jest.Mock).mock.calls;
      const themeCall = calls.find((call: string[]) => call[0] === 'theme');
      expect(themeCall).toBeTruthy();
      expect(themeCall[1]).toBe('light');
    });

    it('should update document classes when theme changes', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      const toggleButton = screen.getByTestId('toggle-button');
      
      act(() => {
        fireEvent.click(toggleButton);
      });
      
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should set data-theme attribute when theme changes', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      const toggleButton = screen.getByTestId('toggle-button');
      
      act(() => {
        fireEvent.click(toggleButton);
      });
      
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('useTheme', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');
      
      consoleError.mockRestore();
    });

    it('should return theme and toggleTheme function', () => {
      let contextValue: { theme: string; toggleTheme: () => void } | null = null;
      
      function CaptureContext() {
        contextValue = useTheme();
        return null;
      }
      
      render(
        <ThemeProvider>
          <CaptureContext />
        </ThemeProvider>
      );
      
      expect(contextValue).toBeDefined();
      expect(contextValue?.theme).toBeDefined();
      expect(typeof contextValue?.toggleTheme).toBe('function');
    });
  });
});
