import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroCarousel from '@/components/sports/HeroCarousel';

describe('HeroCarousel Component', () => {
  describe('Feature Row', () => {
    it('should render feature items', () => {
      render(<HeroCarousel />);
      
      expect(screen.getByText('Brand oportunidades')).toBeInTheDocument();
      expect(screen.getByText('ATÉ R$20 MIL')).toBeInTheDocument();
      expect(screen.getByText('Mamão com Açúcar')).toBeInTheDocument();
    });

    it('should render feature icons', () => {
      render(<HeroCarousel />);
      
      // Check for various icons (they appear multiple times)
      const moneyIcons = screen.getAllByText('💰');
      expect(moneyIcons.length).toBeGreaterThan(0);
    });

    it('should render feature buttons', () => {
      render(<HeroCarousel />);
      
      const buttons = screen.getAllByRole('button');
      // At least 8 feature buttons + 4 carousel bet buttons
      expect(buttons.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('Main Carousel', () => {
    it('should render match cards', () => {
      render(<HeroCarousel />);
      
      // Team names are in the same h3 with br in between
      // Use getAllByText with flexible matching
      const h3Elements = document.querySelectorAll('h3');
      expect(h3Elements.length).toBeGreaterThan(0);
      
      // Check text content contains team names
      const allText = document.body.textContent || '';
      expect(allText).toContain('Manchester City');
      expect(allText).toContain('Wolverhampton');
    });

    it('should render multiple matches', () => {
      render(<HeroCarousel />);
      
      const allText = document.body.textContent || '';
      expect(allText).toContain('AFC Bournemouth');
      expect(allText).toContain('Liverpool');
      expect(allText).toContain('Villarreal CF');
      expect(allText).toContain('Real Madrid');
    });

    it('should display match times', () => {
      render(<HeroCarousel />);
      
      expect(screen.getByText('Hoje 12:00')).toBeInTheDocument();
      expect(screen.getByText('Hoje 14:30')).toBeInTheDocument();
    });

    it('should display odds', () => {
      render(<HeroCarousel />);
      
      expect(screen.getByText('2.75')).toBeInTheDocument();
      expect(screen.getByText('3.90')).toBeInTheDocument();
    });

    it('should display old odds when boosted', () => {
      render(<HeroCarousel />);
      
      // Old odds should be visible with line-through
      expect(screen.getByText('3.40')).toBeInTheDocument();
      expect(screen.getByText('2.40')).toBeInTheDocument();
    });

    it('should render apostar agora buttons', () => {
      render(<HeroCarousel />);
      
      const apostButtons = screen.getAllByText('Apostar Agora');
      expect(apostButtons.length).toBeGreaterThanOrEqual(4);
    });

    it('should display market info', () => {
      render(<HeroCarousel />);
      
      const allText = document.body.textContent || '';
      expect(allText).toContain('Resultado Final / Ambas equipes Marcam');
      expect(allText).toContain('Super Odds Turbinadas');
    });
  });
});
