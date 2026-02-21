import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBanner from '@/components/layout/TopBanner';

describe('TopBanner Component', () => {
  describe('Rendering', () => {
    it('should render the banner', () => {
      render(<TopBanner />);
      
      const downloadElements = screen.getAllByText(/download/i);
      expect(downloadElements.length).toBeGreaterThan(0);
    });

    it('should display mobile icon', () => {
      render(<TopBanner />);
      
      expect(screen.getByText('📱')).toBeInTheDocument();
    });

    it('should display download button', () => {
      render(<TopBanner />);
      
      const downloadButton = screen.getByRole('button', { name: /download/i });
      expect(downloadButton).toBeInTheDocument();
    });

    it('should display close button', () => {
      render(<TopBanner />);
      
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('should display promotional message', () => {
      render(<TopBanner />);
      
      // Check for any of the text versions (desktop or mobile)
      expect(screen.getByText(/Baixe nosso App!/i)).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should hide banner when close button is clicked', () => {
      render(<TopBanner />);
      
      // Banner should be visible initially
      expect(screen.getByText('📱')).toBeInTheDocument();
      
      // Click close button
      const closeButton = screen.getByText('✕').closest('button');
      fireEvent.click(closeButton!);
      
      // Banner should be hidden
      expect(screen.queryByText('📱')).not.toBeInTheDocument();
    });

    it('should not render download button after closing', () => {
      render(<TopBanner />);
      
      const closeButton = screen.getByText('✕').closest('button');
      fireEvent.click(closeButton!);
      
      expect(screen.queryByRole('button', { name: /download/i })).not.toBeInTheDocument();
    });
  });
});
