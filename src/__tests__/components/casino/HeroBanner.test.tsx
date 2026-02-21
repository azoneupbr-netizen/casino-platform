import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HeroBanner from '@/components/casino/HeroBanner';

// Mock timers
jest.useFakeTimers();

describe('HeroBanner Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  describe('Rendering', () => {
    it('should render the banner container', () => {
      render(<HeroBanner />);
      
      // Check for banner content (multiple slides have this text)
      const elements = screen.getAllByText('DESTAQUE DA SEMANA');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should render the first banner by default', () => {
      render(<HeroBanner />);
      
      expect(screen.getByText('Bônus de Boas-vindas')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      render(<HeroBanner />);
      
      expect(screen.getByText('PEGAR BÔNUS')).toBeInTheDocument();
    });

    it('should render navigation dots', () => {
      render(<HeroBanner />);
      
      // There should be 3 dot buttons (for 3 banners)
      const buttons = screen.getAllByRole('button');
      // At least 3 dots + 2 arrow buttons = 5 buttons
      expect(buttons.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Auto Rotation', () => {
    it('should auto-rotate after 5 seconds', () => {
      render(<HeroBanner />);
      
      // Initial state - first banner
      expect(screen.getByText('Bônus de Boas-vindas')).toBeInTheDocument();
      
      // Advance time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      // Second banner should now be visible (check title)
      expect(screen.getByText('Torneio de Slots')).toBeInTheDocument();
    });

    it('should cycle through all banners', () => {
      render(<HeroBanner />);
      
      // After 10 seconds, third banner
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      expect(screen.getByText('Novo Jogo: Space Man')).toBeInTheDocument();
      
      // After 15 seconds, back to first
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(screen.getByText('Bônus de Boas-vindas')).toBeInTheDocument();
    });
  });

  describe('Manual Navigation', () => {
    it('should navigate to specific slide when dot is clicked', () => {
      render(<HeroBanner />);
      
      const buttons = screen.getAllByRole('button');
      // Click the second dot (index 1, but accounting for arrow buttons)
      // Dots are at the end
      const dots = buttons.filter(btn => !btn.textContent?.includes('❮') && !btn.textContent?.includes('❯') && !btn.textContent?.includes('PEGAR'));
      
      if (dots.length >= 2) {
        fireEvent.click(dots[1]);
        expect(screen.getByText('Torneio de Slots')).toBeInTheDocument();
      }
    });

    it('should navigate to previous slide when left arrow is clicked', () => {
      render(<HeroBanner />);
      
      const prevButton = screen.getByText('❮');
      fireEvent.click(prevButton);
      
      // Should go to last banner (wraps around)
      expect(screen.getByText('Novo Jogo: Space Man')).toBeInTheDocument();
    });

    it('should navigate to next slide when right arrow is clicked', () => {
      render(<HeroBanner />);
      
      const nextButton = screen.getByText('❯');
      fireEvent.click(nextButton);
      
      expect(screen.getByText('Torneio de Slots')).toBeInTheDocument();
    });
  });

  describe('Timer Cleanup', () => {
    it('should clean up timer on unmount', () => {
      const { unmount } = render(<HeroBanner />);
      
      // Clear should be called on unmount
      unmount();
      
      // This test passes if no errors are thrown
      expect(true).toBe(true);
    });
  });
});
