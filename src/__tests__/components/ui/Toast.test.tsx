import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '@/components/ui/Toast';

describe('Toast Component', () => {
  const defaultProps = {
    message: 'Test message',
    type: 'success' as const,
    isVisible: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render when isVisible is true', () => {
      render(<Toast {...defaultProps} />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should not render when isVisible is false', () => {
      render(<Toast {...defaultProps} isVisible={false} />);
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('should display the correct message', () => {
      render(<Toast {...defaultProps} message="Custom message" />);
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });

    it('should render close button', () => {
      render(<Toast {...defaultProps} />);
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Toast Types', () => {
    it('should render success toast with correct styles', () => {
      render(<Toast {...defaultProps} type="success" />);
      const toast = screen.getByText('Test message').closest('div');
      expect(toast).toHaveClass('border-[#ccff00]');
    });

    it('should render error toast with correct styles', () => {
      render(<Toast {...defaultProps} type="error" />);
      const toast = screen.getByText('Test message').closest('div');
      expect(toast).toHaveClass('border-red-500');
    });
  });

  describe('Auto Close', () => {
    it('should call onClose after default duration (3000ms)', () => {
      const onClose = jest.fn();
      render(<Toast {...defaultProps} onClose={onClose} />);
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose after custom duration', () => {
      const onClose = jest.fn();
      render(<Toast {...defaultProps} onClose={onClose} duration={5000} />);
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose before duration expires', () => {
      const onClose = jest.fn();
      render(<Toast {...defaultProps} onClose={onClose} duration={5000} />);
      
      act(() => {
        jest.advanceTimersByTime(4000);
      });
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Manual Close', () => {
    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<Toast {...defaultProps} onClose={onClose} />);
      
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timer Cleanup', () => {
    it('should clear timer when component unmounts', () => {
      const onClose = jest.fn();
      const { unmount } = render(<Toast {...defaultProps} onClose={onClose} />);
      
      unmount();
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      // onClose should not be called after unmount
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should clear timer when isVisible changes to false', () => {
      const onClose = jest.fn();
      const { rerender } = render(<Toast {...defaultProps} onClose={onClose} />);
      
      rerender(<Toast {...defaultProps} onClose={onClose} isVisible={false} />);
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have role="button" on close button', () => {
      render(<Toast {...defaultProps} />);
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });
});
