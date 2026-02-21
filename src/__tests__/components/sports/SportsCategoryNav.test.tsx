import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SportsCategoryNav from '@/components/sports/SportsCategoryNav';

describe('SportsCategoryNav Component', () => {
  const mockOnSelectSport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the header', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      expect(screen.getByText('Esportes Ao Vivo')).toBeInTheDocument();
    });

    it('should render live indicator', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      expect(screen.getByText('🔴')).toBeInTheDocument();
    });

    it('should render all sports categories', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      expect(screen.getByText('Futebol')).toBeInTheDocument();
      expect(screen.getByText('Basquete')).toBeInTheDocument();
      expect(screen.getByText('Tênis')).toBeInTheDocument();
      expect(screen.getByText('eSports')).toBeInTheDocument();
    });

    it('should render sport icons', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      // Multiple sports may use the same icon (futebol and futsal both use ⚽)
      const soccerIcons = screen.getAllByText('⚽');
      expect(soccerIcons.length).toBeGreaterThan(0);
      expect(screen.getByText('🏀')).toBeInTheDocument();
      expect(screen.getByText('🎾')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('should highlight selected sport', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      // The selected sport name should have active styling
      const futebolButton = screen.getByText('Futebol');
      expect(futebolButton).toHaveClass('text-accent-gold');
    });

    it('should not highlight non-selected sports', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      const basqueteButton = screen.getByText('Basquete');
      expect(basqueteButton).toHaveClass('text-text-muted');
    });
  });

  describe('Click Handling', () => {
    it('should call onSelectSport when sport is clicked', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      const basqueteButton = screen.getByText('Basquete').closest('button');
      fireEvent.click(basqueteButton!);
      
      expect(mockOnSelectSport).toHaveBeenCalledWith('basquete');
    });

    it('should call onSelectSport for each sport', () => {
      render(<SportsCategoryNav selectedSport="futebol" onSelectSport={mockOnSelectSport} />);
      
      const tenisButton = screen.getByText('Tênis').closest('button');
      fireEvent.click(tenisButton!);
      expect(mockOnSelectSport).toHaveBeenCalledWith('tenis');
      
      const esportsButton = screen.getByText('eSports').closest('button');
      fireEvent.click(esportsButton!);
      expect(mockOnSelectSport).toHaveBeenCalledWith('esports');
    });
  });
});
