import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SportsFeed, { Match } from '@/components/sports/SportsFeed';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    homeIcon: '⚽',
    awayIcon: '⚽',
    league: 'Brasileirão',
    time: 'AO VIVO 65\'',
    isLive: true,
    score: '2 - 1',
    odds: {
      home: 2.10,
      draw: 3.20,
      away: 3.40,
      over25: 1.85,
      under25: 1.95,
    },
  },
  {
    id: 2,
    homeTeam: 'Corinthians',
    awayTeam: 'São Paulo',
    homeIcon: '⚽',
    awayIcon: '⚽',
    league: 'Brasileirão',
    time: '16:00',
    isLive: false,
    score: null,
    odds: {
      home: 2.50,
      draw: 3.10,
      away: 2.80,
      over25: 1.90,
      under25: 1.90,
    },
  },
];

describe('SportsFeed Component', () => {
  const mockOnAddBet = jest.fn();
  const mockOnMatchSelect = jest.fn();
  const mockBets: { id: string }[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
  });

  describe('Rendering', () => {
    it('should render the feed', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('Flamengo')).toBeInTheDocument();
      });
    });

    it('should fetch matches from /sports/matches on mount', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/sports/matches');
      });
    });

    it('should display all matches', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('Flamengo')).toBeInTheDocument();
        expect(screen.getByText('Palmeiras')).toBeInTheDocument();
        expect(screen.getByText('Corinthians')).toBeInTheDocument();
        expect(screen.getByText('São Paulo')).toBeInTheDocument();
      });
    });

    it('should display odds', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('2.10')).toBeInTheDocument();
        expect(screen.getByText('3.20')).toBeInTheDocument();
      });
    });
  });

  describe('Market Tabs', () => {
    it('should display market tabs', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('Vencedor')).toBeInTheDocument();
        expect(screen.getByText(/Acima\/Abaixo/i)).toBeInTheDocument();
      });
    });
  });

  describe('Live Matches', () => {
    it('should display live indicator for live matches', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      // Live matches should display the time with special styling (red color, animate-pulse)
      await waitFor(() => {
        // The time "65'" is displayed after removing "AO VIVO " prefix
        expect(screen.getByText("65'")).toBeInTheDocument();
      });
    });

    it('should display current score for live matches', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      // The score is split into home and away scores (may appear multiple times due to odds labels)
      await waitFor(() => {
        // Check that scores are present - use getAllByText as numbers may appear in odds too
        const twos = screen.getAllByText('2');
        const ones = screen.getAllByText('1');
        expect(twos.length).toBeGreaterThan(0);
        expect(ones.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Betting', () => {
    it('should call onAddBet when odds button is clicked', async () => {
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('2.10')).toBeInTheDocument();
      });
      
      // Click on an odds button
      const oddsButton = screen.getByText('2.10').closest('button');
      if (oddsButton) {
        fireEvent.click(oddsButton);
        expect(mockOnAddBet).toHaveBeenCalled();
      }
    });
  });

  describe('Loading State', () => {
    it('should show loading state initially', () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
      
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      const loadingElements = document.querySelectorAll('.animate-pulse');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle API error gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });
  });

  describe('Empty State', () => {
    it('should handle empty matches array', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [] });
      
      render(
        <SportsFeed
          onAddBet={mockOnAddBet}
          onMatchSelect={mockOnMatchSelect}
          bets={mockBets}
          selectedSport="futebol"
        />
      );
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      expect(screen.queryByText('Flamengo')).not.toBeInTheDocument();
    });
  });
});
