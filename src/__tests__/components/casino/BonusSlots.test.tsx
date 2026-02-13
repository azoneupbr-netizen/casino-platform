import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BonusSlots from '@/components/casino/BonusSlots';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockGames = [
  { id: 1, name: 'Slot Game 1', image: '🎰', provider: 'Provider A' },
  { id: 2, name: 'Slot Game 2', image: '💎', provider: 'Provider B' },
  { id: 3, name: 'Slot Game 3', image: '🍒', provider: 'Provider C' },
  { id: 4, name: 'Slot Game 4', image: '💰', provider: 'Provider A' },
  { id: 5, name: 'Slot Game 5', image: '⭐', provider: 'Provider B' },
  { id: 6, name: 'Slot Game 6', image: '🌙', provider: 'Provider C' },
];

describe('BonusSlots Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading skeleton when fetching data', async () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
      
      render(<BonusSlots />);
      
      // Check for loading animation class
      const container = document.querySelector('.animate-pulse');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Data Loading', () => {
    it('should call API to fetch games', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/games');
      });
    });

    it('should display games after loading', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(screen.getByText('Slot Game 1')).toBeInTheDocument();
        expect(screen.getByText('Slot Game 2')).toBeInTheDocument();
      });
    });

    it('should limit games to 12 items', async () => {
      const manyGames = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Game ${i + 1}`,
        image: '🎰',
        provider: 'Provider',
      }));
      (api.get as jest.Mock).mockResolvedValue({ data: manyGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.getByText('Game 12')).toBeInTheDocument();
        expect(screen.queryByText('Game 13')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });
  });

  describe('Header', () => {
    it('should display the title "Slots de Bônus"', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(screen.getByText('Slots de Bônus')).toBeInTheDocument();
      });
    });

    it('should display count button', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(screen.getByText('6')).toBeInTheDocument();
      });
    });
  });

  describe('Game Grid', () => {
    it('should render games in a grid', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        const gridContainer = document.querySelector('.grid');
        expect(gridContainer).toBeInTheDocument();
      });
    });

    it('should display game images (emoji fallback)', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        expect(screen.getByText('🎰')).toBeInTheDocument();
        expect(screen.getByText('💎')).toBeInTheDocument();
      });
    });

    it('should display play buttons', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        const playButtons = screen.getAllByText('▶');
        expect(playButtons.length).toBeGreaterThan(0);
      });
    });

    it('should display default slot emoji when no image', async () => {
      const gamesWithoutImages = [{ id: 1, name: 'No Image Game', image: '' }];
      (api.get as jest.Mock).mockResolvedValue({ data: gamesWithoutImages });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        // When image is empty, it should show the default '🎰' emoji
        expect(screen.getByText('🎰')).toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    it('should have responsive grid classes', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<BonusSlots />);
      
      await waitFor(() => {
        const grid = document.querySelector('.grid');
        expect(grid).toHaveClass('grid-cols-2');
        expect(grid).toHaveClass('sm:grid-cols-3');
        expect(grid).toHaveClass('md:grid-cols-4');
        expect(grid).toHaveClass('lg:grid-cols-6');
      });
    });
  });
});
