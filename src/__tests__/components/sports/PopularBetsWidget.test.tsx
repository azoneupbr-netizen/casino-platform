import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PopularBetsWidget from '@/components/sports/PopularBetsWidget';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockMatches = [
  {
    id: 1,
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    odds: { home: 1.85, draw: 3.50, away: 4.20 },
    homeIcon: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1280px-Manchester_City_FC_badge.svg.png',
    awayIcon: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  },
  {
    id: 2,
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    odds: { home: 2.10, draw: 3.30, away: 3.40 },
    homeIcon: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/960px-Real_Madrid_CF.svg.png',
    awayIcon: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/250px-FC_Barcelona_%28crest%29.svg.png',
  },
  {
    id: 3,
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    odds: { home: 1.55, draw: 4.00, away: 5.50 },
    homeIcon: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg',
    awayIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1280px-Borussia_Dortmund_logo.svg.png',
  },
];

describe('PopularBetsWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading skeleton when fetching data', async () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
      
      render(<PopularBetsWidget />);
      
      // Check for loading animation
      const loadingElements = document.querySelectorAll('.animate-pulse');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Data Loading', () => {
    it('should call API to fetch matches', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/sports/matches');
      });
    });

    it('should display matches after loading', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        // The component transforms data, there might be multiple instances of team names
        const bayernElements = screen.getAllByText('Bayern Munich');
        expect(bayernElements.length).toBeGreaterThan(0);
      });
    });

    it('should limit to 5 matches', async () => {
      const manyMatches = Array.from({ length: 10 }, (_, i) => ({
        ...mockMatches[0],
        id: i + 1,
        homeTeam: `TestTeam${i + 1}`,
        awayTeam: `Opponent${i + 1}`,
      }));
      (api.get as jest.Mock).mockResolvedValue({ data: manyMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        // Check that first 5 teams are rendered
        const team1Elements = screen.getAllByText('TestTeam1');
        expect(team1Elements.length).toBeGreaterThan(0);
      });
      
      // Team 6 should not be rendered (only first 5 matches)
      expect(screen.queryByText('TestTeam6')).not.toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('should display "Apostas populares" title', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        expect(screen.getByText('Apostas populares')).toBeInTheDocument();
      });
    });
  });

  describe('Match Display', () => {
    it('should display team names', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        // Check for teams from our mock data - there might be multiple instances
        const bayernElements = screen.getAllByText('Bayern Munich');
        expect(bayernElements.length).toBeGreaterThan(0);
      });
    });

    it('should display "x" separator between teams', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        const separators = screen.getAllByText('x');
        expect(separators.length).toBeGreaterThan(0);
      });
    });

    it('should display market type', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        const marketTypes = screen.getAllByText('Vencedor do encontro');
        expect(marketTypes.length).toBeGreaterThan(0);
      });
    });

    it('should display odds', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        // Bayern (1.55) is the favorite
        expect(screen.getByText('1.55')).toBeInTheDocument();
      });
    });

    it('should display team logos', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        const logos = screen.getAllByRole('img');
        expect(logos.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });

    it('should return null when no matches', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [] });
      
      const { container } = render(<PopularBetsWidget />);
      
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });

  describe('Styling', () => {
    it('should have orange header background', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
      
      render(<PopularBetsWidget />);
      
      await waitFor(() => {
        const header = screen.getByText('Apostas populares').closest('div');
        expect(header).toHaveClass('bg-[#FF4500]');
      });
    });
  });
});
