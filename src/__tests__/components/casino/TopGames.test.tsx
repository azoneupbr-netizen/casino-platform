import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TopGames from '@/components/casino/TopGames';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockGames = [
  { id: 1, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '🍬' },
  { id: 2, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: '⚡' },
  { id: 3, name: 'Big Bass Bonanza', provider: 'Pragmatic Play', image: '🐟' },
  { id: 4, name: 'Sugar Rush', provider: 'Pragmatic Play', image: '🍰' },
  { id: 5, name: 'Starlight Princess', provider: 'Pragmatic Play', image: '🌟' },
];

describe('TopGames Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading skeleton when fetching data', async () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
      
      render(<TopGames />);
      
      // Check for loading state (animated skeleton)
      const loadingElements = screen.getAllByText('');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Data Loading', () => {
    it('should call API to fetch top games', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/games/top');
      });
    });

    it('should display games after loading', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
        expect(screen.getByText('Gates of Olympus')).toBeInTheDocument();
      });
    });

    it('should display game providers', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        const providerElements = screen.getAllByText('Pragmatic Play');
        expect(providerElements.length).toBeGreaterThan(0);
      });
    });

    it('should display numbered rankings', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });

    it('should display empty state on error', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<TopGames />);
      
      await waitFor(() => {
        // Component should still render without crashing
        expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
      });
    });
  });

  describe('Header', () => {
    it('should display the title "Top 10 Jogos"', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('Top 10 Jogos')).toBeInTheDocument();
      });
    });

    it('should display fire emoji icon', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('🔥')).toBeInTheDocument();
      });
    });
  });

  describe('Scroll Navigation', () => {
    beforeEach(() => {
      // Mock scrollBy on Element prototype
      Element.prototype.scrollBy = jest.fn();
    });

    it('should render scroll buttons', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('❮')).toBeInTheDocument();
        expect(screen.getByText('❯')).toBeInTheDocument();
      });
    });

    it('should handle scroll left click', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('❮')).toBeInTheDocument();
      });
      
      const scrollLeftBtn = screen.getByText('❮');
      fireEvent.click(scrollLeftBtn);
      
      expect(Element.prototype.scrollBy).toHaveBeenCalled();
    });

    it('should handle scroll right click', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        expect(screen.getByText('❯')).toBeInTheDocument();
      });
      
      const scrollRightBtn = screen.getByText('❯');
      fireEvent.click(scrollRightBtn);
      
      expect(Element.prototype.scrollBy).toHaveBeenCalled();
    });
  });

  describe('Game Cards', () => {
    it('should render game cards with images', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        // Check for emoji images
        expect(screen.getByText('🍬')).toBeInTheDocument();
        expect(screen.getByText('⚡')).toBeInTheDocument();
      });
    });

    it('should display play button on hover (visual check)', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
      
      render(<TopGames />);
      
      await waitFor(() => {
        // Play button icon
        const playButtons = screen.getAllByText('▶');
        expect(playButtons.length).toBeGreaterThan(0);
      });
    });
  });
});
