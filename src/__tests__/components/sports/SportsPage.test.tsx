import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SportsPage from '@/components/sports/SportsPage';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// Mock child components to simplify testing
jest.mock('@/components/sports/SportsFeed', () => {
  return function MockSportsFeed({ onAddBet, onMatchSelect }: { 
    onAddBet: (bet: { match: string; selection: string; odds: number }) => void;
    onMatchSelect: (match: { id: number; homeTeam: string; awayTeam: string }) => void;
  }) {
    return (
      <div data-testid="sports-feed">
        <button 
          data-testid="add-bet-btn"
          onClick={() => onAddBet({ match: 'Team A vs Team B', selection: 'Team A', odds: 1.5 })}
        >
          Add Bet
        </button>
        <button 
          data-testid="select-match-btn"
          onClick={() => onMatchSelect({ id: 1, homeTeam: 'Team A', awayTeam: 'Team B' })}
        >
          Select Match
        </button>
      </div>
    );
  };
});

jest.mock('@/components/sports/BetSlip', () => {
  return function MockBetSlip({ bets, onRemoveBet, onClearBets }: { 
    bets: Array<{ id: string }>;
    onRemoveBet: (id: string) => void;
    onClearBets: () => void;
  }) {
    return (
      <div data-testid="bet-slip">
        <span data-testid="bet-count">{bets.length}</span>
        {bets.map(bet => (
          <button key={bet.id} data-testid={`remove-bet-${bet.id}`} onClick={() => onRemoveBet(bet.id)}>
            Remove
          </button>
        ))}
        <button data-testid="clear-bets" onClick={onClearBets}>Clear All</button>
      </div>
    );
  };
});

jest.mock('@/components/sports/HeroCarousel', () => {
  return function MockHeroCarousel() {
    return <div data-testid="hero-carousel">Hero Carousel</div>;
  };
});

jest.mock('@/components/sports/SportsCategoryNav', () => {
  return function MockSportsCategoryNav({ selectedSport, onSelectSport }: { 
    selectedSport: string;
    onSelectSport: (sport: string) => void;
  }) {
    return (
      <div data-testid="category-nav">
        <span data-testid="selected-sport">{selectedSport}</span>
        <button data-testid="select-basketball" onClick={() => onSelectSport('basketball')}>
          Basketball
        </button>
      </div>
    );
  };
});

jest.mock('@/components/sports/LiveMatchInfo', () => {
  return function MockLiveMatchInfo({ match, onClose }: { 
    match: { homeTeam: string; awayTeam: string };
    onClose: () => void;
  }) {
    return (
      <div data-testid="live-match-info">
        <span>{match.homeTeam} vs {match.awayTeam}</span>
        <button data-testid="close-match-info" onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/components/sports/MiniGamesSidebar', () => {
  return function MockMiniGamesSidebar() {
    return <div data-testid="mini-games">Mini Games</div>;
  };
});

jest.mock('@/components/sports/PopularBetsWidget', () => {
  return function MockPopularBetsWidget() {
    return <div data-testid="popular-bets">Popular Bets</div>;
  };
});

jest.mock('@/components/sports/LongTermBetsWidget', () => {
  return function MockLongTermBetsWidget() {
    return <div data-testid="long-term-bets">Long Term Bets</div>;
  };
});

jest.mock('@/components/sports/OddsSettingsWidget', () => {
  return function MockOddsSettingsWidget() {
    return <div data-testid="odds-settings">Odds Settings</div>;
  };
});

jest.mock('@/components/sports/QuantumAI', () => {
  return function MockQuantumAI() {
    return <div data-testid="quantum-ai">Quantum AI</div>;
  };
});

jest.mock('@/components/layout/AnimatedBanner', () => {
  return function MockAnimatedBanner() {
    return <div data-testid="animated-banner">Animated Banner</div>;
  };
});

describe('SportsPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.matchMedia to simulate large screen (lg breakpoint)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('min-width'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Rendering', () => {
    it('should render the main page structure', () => {
      render(<SportsPage />);
      
      expect(screen.getByTestId('sports-feed')).toBeInTheDocument();
      expect(screen.getByTestId('hero-carousel')).toBeInTheDocument();
      expect(screen.getByTestId('category-nav')).toBeInTheDocument();
      expect(screen.getByTestId('animated-banner')).toBeInTheDocument();
    });

    it('should render bet slip by default', () => {
      render(<SportsPage />);
      
      // There are two bet slips: desktop and mobile
      const betSlips = screen.getAllByTestId('bet-slip');
      expect(betSlips.length).toBeGreaterThan(0);
    });

    it('should render popular bets widget', () => {
      render(<SportsPage />);
      
      expect(screen.getByTestId('popular-bets')).toBeInTheDocument();
    });

    it('should render long term bets widget', () => {
      render(<SportsPage />);
      
      expect(screen.getByTestId('long-term-bets')).toBeInTheDocument();
    });
  });

  describe('Sport Category Selection', () => {
    it('should start with futebol selected', () => {
      render(<SportsPage />);
      
      expect(screen.getByTestId('selected-sport')).toHaveTextContent('futebol');
    });

    it('should update selected sport when category is changed', () => {
      render(<SportsPage />);
      
      fireEvent.click(screen.getByTestId('select-basketball'));
      
      expect(screen.getByTestId('selected-sport')).toHaveTextContent('basketball');
    });
  });

  describe('Bet Management', () => {
    it('should start with zero bets', () => {
      render(<SportsPage />);
      
      // Both desktop and mobile bet slips should show 0 bets
      const betCounts = screen.getAllByTestId('bet-count');
      betCounts.forEach(count => {
        expect(count).toHaveTextContent('0');
      });
    });

    it('should add bet when add bet button is clicked', () => {
      render(<SportsPage />);
      
      fireEvent.click(screen.getByTestId('add-bet-btn'));
      
      // All bet slips should reflect the new bet count
      const betCounts = screen.getAllByTestId('bet-count');
      betCounts.forEach(count => {
        expect(count).toHaveTextContent('1');
      });
    });

    it('should remove bet when remove button is clicked', () => {
      render(<SportsPage />);
      
      // Add a bet first
      fireEvent.click(screen.getByTestId('add-bet-btn'));
      const betCounts = screen.getAllByTestId('bet-count');
      betCounts.forEach(count => {
        expect(count).toHaveTextContent('1');
      });
      
      // Find and click the first remove button
      const removeButtons = screen.getAllByText('Remove');
      fireEvent.click(removeButtons[0]);
      
      const updatedBetCounts = screen.getAllByTestId('bet-count');
      updatedBetCounts.forEach(count => {
        expect(count).toHaveTextContent('0');
      });
    });

    it('should clear all bets when clear button is clicked', () => {
      render(<SportsPage />);
      
      // Add multiple bets
      fireEvent.click(screen.getByTestId('add-bet-btn'));
      fireEvent.click(screen.getByTestId('add-bet-btn'));
      
      const betCounts = screen.getAllByTestId('bet-count');
      betCounts.forEach(count => {
        expect(count).toHaveTextContent('2');
      });
      
      // Clear all - click the first clear button
      const clearButtons = screen.getAllByTestId('clear-bets');
      fireEvent.click(clearButtons[0]);
      
      const updatedBetCounts = screen.getAllByTestId('bet-count');
      updatedBetCounts.forEach(count => {
        expect(count).toHaveTextContent('0');
      });
    });
  });

  describe('Match Selection', () => {
    it('should show match info when a match is selected', () => {
      render(<SportsPage />);
      
      fireEvent.click(screen.getByTestId('select-match-btn'));
      
      expect(screen.getByTestId('live-match-info')).toBeInTheDocument();
      expect(screen.getByText('Team A vs Team B')).toBeInTheDocument();
    });

    it('should show mini games when match is selected', () => {
      render(<SportsPage />);
      
      fireEvent.click(screen.getByTestId('select-match-btn'));
      
      expect(screen.getByTestId('mini-games')).toBeInTheDocument();
    });

    it('should show back to betslip button when match is selected', () => {
      render(<SportsPage />);
      
      fireEvent.click(screen.getByTestId('select-match-btn'));
      
      expect(screen.getByText('← Voltar para Cupom')).toBeInTheDocument();
    });

    it('should return to betslip mode when back button is clicked', () => {
      render(<SportsPage />);
      
      // Select a match
      fireEvent.click(screen.getByTestId('select-match-btn'));
      expect(screen.getByTestId('live-match-info')).toBeInTheDocument();
      
      // Click back button
      fireEvent.click(screen.getByText('← Voltar para Cupom'));
      
      // There should be bet slips (desktop and/or mobile)
      const betSlips = screen.getAllByTestId('bet-slip');
      expect(betSlips.length).toBeGreaterThan(0);
      expect(screen.queryByTestId('live-match-info')).not.toBeInTheDocument();
    });

    it('should return to betslip when close button in match info is clicked', () => {
      render(<SportsPage />);
      
      // Select a match
      fireEvent.click(screen.getByTestId('select-match-btn'));
      
      // Close match info
      fireEvent.click(screen.getByTestId('close-match-info'));
      
      // There should be bet slips visible
      const betSlips = screen.getAllByTestId('bet-slip');
      expect(betSlips.length).toBeGreaterThan(0);
    });
  });

  describe('Sidebar Modes', () => {
    it('should show odds settings in betslip mode', () => {
      render(<SportsPage />);
      
      expect(screen.getByTestId('odds-settings')).toBeInTheDocument();
    });

    it('should hide odds settings in match info mode', () => {
      render(<SportsPage />);
      
      // Select a match to switch to match info mode
      fireEvent.click(screen.getByTestId('select-match-btn'));
      
      // Odds settings should not be visible in match info mode
      expect(screen.queryByTestId('odds-settings')).not.toBeInTheDocument();
    });
  });
});
