import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LiveMatchInfo from '@/components/sports/LiveMatchInfo';

const mockMatch = {
  id: 1,
  homeTeam: 'Team Home',
  awayTeam: 'Team Away',
  league: 'Test League',
  time: '45\'',
  score: '2 - 1',
  isLive: true,
  odds: {
    home: 1.85,
    draw: 3.50,
    away: 4.20,
    over25: 1.75,
    under25: 2.10,
    bothScoreYes: 1.90,
    bothScoreNo: 1.95,
  },
  homeIcon: 'https://c8.alamy.com/comp/2D38P39/team-community-figures-in-house-line-style-icon-vector-illustration-design-2D38P39.jpg',
  awayIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg/1280px-Football_in_Bloomington%2C_Indiana%2C_1995.jpg',
};

const mockMatchWithoutOdds = {
  id: 2,
  homeTeam: 'Team A',
  awayTeam: 'Team B',
  league: 'Another League',
  time: '0\'',
  score: null,
  isLive: false,
  odds: null,
  homeIcon: 'https://www.shutterstock.com/image-vector/30-streaming-sport-line-icons-260nw-2662981043.jpg',
  awayIcon: 'https://www.shutterstock.com/image-vector/scoreboard-home-away-score-vector-260nw-2680922341.jpg',
};

describe('LiveMatchInfo Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should return null when match is null', () => {
      const { container } = render(<LiveMatchInfo match={null} onClose={mockOnClose} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render match header with team names', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      expect(screen.getByText('Team Home vs Team Away')).toBeInTheDocument();
    });

    it('should render close button', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('should show live indicator when match is live', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      // Live indicator has animate-pulse class
      const liveIndicator = document.querySelector('.animate-pulse');
      expect(liveIndicator).toBeInTheDocument();
    });

    it('should not show live indicator when match is not live', () => {
      render(<LiveMatchInfo match={mockMatchWithoutOdds} onClose={mockOnClose} />);
      
      const liveIndicator = document.querySelector('.animate-pulse');
      expect(liveIndicator).not.toBeInTheDocument();
    });
  });

  describe('Score Display', () => {
    it('should display match score', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      expect(screen.getByText('2 - 1')).toBeInTheDocument();
    });

    it('should display default score when no score provided', () => {
      render(<LiveMatchInfo match={mockMatchWithoutOdds} onClose={mockOnClose} />);
      
      expect(screen.getByText('0 - 0')).toBeInTheDocument();
    });

    it('should display team names in score area', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      // Team names appear multiple times
      const homeTeamElements = screen.getAllByText('Team Home');
      const awayTeamElements = screen.getAllByText('Team Away');
      
      expect(homeTeamElements.length).toBeGreaterThan(0);
      expect(awayTeamElements.length).toBeGreaterThan(0);
    });
  });

  describe('Live Stream Placeholder', () => {
    it('should display live stream placeholder', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      expect(screen.getByText('TRANSMISSÃO AO VIVO')).toBeInTheDocument();
    });

    it('should show login message for stream', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      expect(screen.getByText('Disponível para usuários logados')).toBeInTheDocument();
    });
  });

  describe('Betting Markets', () => {
    describe('Match Result', () => {
      it('should display resultado final market when odds exist', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('Resultado Final')).toBeInTheDocument();
      });

      it('should display home odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('1.85')).toBeInTheDocument();
      });

      it('should display draw odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('3.50')).toBeInTheDocument();
      });

      it('should display away odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('4.20')).toBeInTheDocument();
      });

      it('should display 1, X, 2 labels', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('X')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
      });
    });

    describe('Total Goals Market', () => {
      it('should display total goals market when over/under odds exist', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('Total de Gols (2.5)')).toBeInTheDocument();
      });

      it('should display over 2.5 odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('1.75')).toBeInTheDocument();
        expect(screen.getByText('Mais de')).toBeInTheDocument();
      });

      it('should display under 2.5 odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('2.10')).toBeInTheDocument();
        expect(screen.getByText('Menos de')).toBeInTheDocument();
      });
    });

    describe('Both Teams Score Market', () => {
      it('should display both teams score market when odds exist', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('Ambos Marcam')).toBeInTheDocument();
      });

      it('should display yes odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('1.90')).toBeInTheDocument();
        expect(screen.getByText('Sim')).toBeInTheDocument();
      });

      it('should display no odds', () => {
        render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getByText('1.95')).toBeInTheDocument();
        expect(screen.getByText('Não')).toBeInTheDocument();
      });
    });

    describe('Markets without Odds', () => {
      it('should not display markets when odds are null', () => {
        render(<LiveMatchInfo match={mockMatchWithoutOdds} onClose={mockOnClose} />);
        
        expect(screen.queryByText('Resultado Final')).not.toBeInTheDocument();
        expect(screen.queryByText('Total de Gols (2.5)')).not.toBeInTheDocument();
        expect(screen.queryByText('Ambos Marcam')).not.toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      fireEvent.click(screen.getByText('✕'));
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have clickable odds buttons', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      const oddsButtons = screen.getAllByRole('button');
      // Exclude close button, should have odds buttons
      expect(oddsButtons.length).toBeGreaterThan(1);
    });
  });

  describe('Styling', () => {
    it('should have animate-fade-in class', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      const container = document.querySelector('.animate-fade-in');
      expect(container).toBeInTheDocument();
    });

    it('should have scrollable area for markets', () => {
      render(<LiveMatchInfo match={mockMatch} onClose={mockOnClose} />);
      
      const scrollableArea = document.querySelector('.overflow-y-auto');
      expect(scrollableArea).toBeInTheDocument();
    });
  });
});
