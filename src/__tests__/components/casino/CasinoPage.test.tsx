import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CasinoPage from '@/components/casino/CasinoPage';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => (dynamicImport: () => Promise<{ default: React.ComponentType }>) => {
  const Component = () => <div data-testid="dynamic-component">Dynamic Component</div>;
  Component.displayName = 'DynamicComponent';
  return Component;
});

// Mock HeroBanner
jest.mock('@/components/casino/HeroBanner', () => {
  return function MockHeroBanner() {
    return <div data-testid="hero-banner">Hero Banner</div>;
  };
});

const mockGames = [
  {
    id: 1,
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'Populares',
    jackpot: false,
    image: 'https://i.pinimg.com/736x/09/f2/12/09f21242c9c8a3ce01c6005a1287f576.jpg',
  },
  {
    id: 2,
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    category: 'Populares',
    jackpot: true,
    image: 'https://i.pinimg.com/736x/32/de/a2/32dea27548e62747ad6ce2854b3c7c77.jpg',
  },
  {
    id: 3,
    name: 'Starburst',
    provider: 'NetEnt',
    category: 'Clássicos',
    jackpot: false,
    image: 'https://i.ytimg.com/vi/ycRnxZfg_Mg/maxresdefault.jpg',
  },
  {
    id: 4,
    name: 'Big Bass Bonanza',
    provider: 'Pragmatic Play',
    category: 'Novos',
    jackpot: false,
    image: 'https://www.pragmaticplay.com/wp-content/uploads/2020/11/Big-Bass-Bonanza%E2%84%A2_EN_339x180_04.png',
  },
  {
    id: 5,
    name: 'Mega Moolah',
    provider: 'Microgaming',
    category: 'Jackpot',
    jackpot: true,
    image: 'https://pnimg.net/w/sitemap/0/660/bcc607fa3d.png',
  },
];

describe('CasinoPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
  });

  describe('Rendering', () => {
    it('should render the hero banner', async () => {
      render(<CasinoPage />);
      
      expect(screen.getByTestId('hero-banner')).toBeInTheDocument();
    });

    it('should fetch games on mount', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/games');
      });
    });

    it('should display games after loading', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
      });
    });

    it('should show loading state initially', () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
      
      render(<CasinoPage />);
      
      // Check for loading animation
      const loadingElements = document.querySelectorAll('.animate-pulse');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Category Filtering', () => {
    it('should display category filter buttons', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        // Use getAllByRole to find buttons, which should include category filters
        const buttons = screen.getAllByRole('button');
        const buttonTexts = buttons.map(b => b.textContent);
        
        expect(buttonTexts.some(t => t?.includes('Todos'))).toBe(true);
        expect(buttonTexts.some(t => t?.includes('Populares'))).toBe(true);
        expect(buttonTexts.some(t => t?.includes('Novos'))).toBe(true);
        expect(buttonTexts.some(t => t?.includes('Jackpot'))).toBe(true);
      });
    });

    it('should filter games by category', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
      });
      
      // Click on "Megaways" category (which has no games in mock data)
      const buttons = screen.getAllByRole('button');
      const megawaysButton = buttons.find(b => b.textContent?.includes('Megaways'));
      if (megawaysButton) {
        fireEvent.click(megawaysButton);
      }
      
      // No games in Megaways category in our mock data
      await waitFor(() => {
        expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
        expect(screen.queryByText('Mega Moolah')).not.toBeInTheDocument();
      });
    });

    it('should show all games when "Todos" is selected', async () => {
      render(<CasinoPage />);
      
      // First filter by category
      await waitFor(() => {
        fireEvent.click(screen.getByText('Jackpot'));
      });
      
      // Then select Todos
      fireEvent.click(screen.getAllByText('Todos')[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
        expect(screen.getByText('Mega Moolah')).toBeInTheDocument();
      });
    });
  });

  describe('Provider Filtering', () => {
    it('should display provider filter dropdown', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Pragmatic Play')).toBeInTheDocument();
      });
    });

    it('should filter games by provider', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
      });
      
      // Select NetEnt provider
      const netEntButton = screen.getAllByText('NetEnt');
      fireEvent.click(netEntButton[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Starburst')).toBeInTheDocument();
        expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
      });
    });
  });

  describe('Combined Filtering', () => {
    it('should filter by both category and provider', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
      });
      
      // Select "Populares" category
      fireEvent.click(screen.getByText('Populares'));
      
      // Select "Pragmatic Play" provider
      const pragmaticButtons = screen.getAllByText('Pragmatic Play');
      fireEvent.click(pragmaticButtons[0]);
      
      // Should only show Pragmatic Play games in Populares category
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
        expect(screen.getByText('Gates of Olympus')).toBeInTheDocument();
        expect(screen.queryByText('Starburst')).not.toBeInTheDocument();
        expect(screen.queryByText('Mega Moolah')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      // Should show empty state or no games
      expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
      
      consoleError.mockRestore();
    });

    it('should set games to empty array on error', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      // No games should be displayed
      expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
    });
  });

  describe('Game Display', () => {
    it('should display game images', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      });
    });

    it('should display game names', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        mockGames.forEach(game => {
          expect(screen.getByText(game.name)).toBeInTheDocument();
        });
      });
    });

    it('should display provider names on games', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        // Provider names might appear multiple times
        const pragmaticElements = screen.getAllByText(/Pragmatic Play/);
        expect(pragmaticElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Empty States', () => {
    it('should handle empty games array', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [] });
      
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      // Should not crash and should show no games
      expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
    });

    it('should show no results when filter matches nothing', async () => {
      render(<CasinoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sweet Bonanza')).toBeInTheDocument();
      });
      
      // Filter by Jackpot category
      fireEvent.click(screen.getByText('Megaways'));
      
      // No games in Megaways category in our mock data
      await waitFor(() => {
        expect(screen.queryByText('Sweet Bonanza')).not.toBeInTheDocument();
        expect(screen.queryByText('Mega Moolah')).not.toBeInTheDocument();
      });
    });
  });
});
