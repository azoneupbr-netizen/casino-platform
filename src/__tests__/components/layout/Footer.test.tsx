import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render the footer', () => {
      render(<Footer />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render brand name', () => {
      render(<Footer />);
      
      expect(screen.getByText(/ALLYK/i)).toBeInTheDocument();
    });

    it('should render copyright text with current year', () => {
      render(<Footer />);
      
      const currentYear = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<Footer />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render responsible gambling message', () => {
      render(<Footer />);
      
      // Check for 18+ or responsible gambling message
      expect(screen.getByText(/18\+/i)).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('should have terms of service link', () => {
      render(<Footer />);
      
      const tosLink = screen.getByText(/Termos/i);
      expect(tosLink).toBeInTheDocument();
    });

    it('should have privacy policy link', () => {
      render(<Footer />);
      
      const privacyLink = screen.getByText(/Privacidade/i);
      expect(privacyLink).toBeInTheDocument();
    });
  });

  describe('Sections', () => {
    it('should have multiple sections', () => {
      const { container } = render(<Footer />);
      
      const sections = container.querySelectorAll('div');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Premium Providers', () => {
    it('should render premium providers section', () => {
      render(<Footer />);
      
      expect(screen.getByText(/Provedores Premium/i)).toBeInTheDocument();
    });

    it('should display provider names', () => {
      render(<Footer />);
      
      expect(screen.getByText(/Pragmatic Play/i)).toBeInTheDocument();
      expect(screen.getByText(/Evolution/i)).toBeInTheDocument();
      expect(screen.getByText(/NetEnt/i)).toBeInTheDocument();
    });
  });

  describe('Payment Methods', () => {
    it('should display payment methods', () => {
      render(<Footer />);
      
      expect(screen.getByText(/PIX/i)).toBeInTheDocument();
      expect(screen.getByText(/Visa/i)).toBeInTheDocument();
    });
  });
});
