import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BetSlip, { Bet } from '@/components/sports/BetSlip';
import { ToastProvider } from '@/contexts/ToastContext';

// Mock api
jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn().mockResolvedValue({ data: { success: true } }),
  },
}));

const mockBets: Bet[] = [
  {
    id: 'bet-1',
    eventName: 'Team A vs Team B',
    selection: 'Team A',
    odd: 1.5,
    betType: 'Vencedor',
  },
  {
    id: 'bet-2',
    eventName: 'Team C vs Team D',
    selection: 'Draw',
    odd: 3.0,
    betType: 'Vencedor',
  },
];

const renderBetSlip = (props: Partial<React.ComponentProps<typeof BetSlip>> = {}) => {
  const defaultProps = {
    bets: [],
    onRemoveBet: jest.fn(),
    onClearBets: jest.fn(),
  };
  
  return render(
    <ToastProvider>
      <BetSlip {...defaultProps} {...props} />
    </ToastProvider>
  );
};

describe('BetSlip Component', () => {
  const mockOnRemoveBet = jest.fn();
  const mockOnClearBets = jest.fn();
  const mockOnHeaderClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the bet slip header', () => {
      renderBetSlip();
      
      expect(screen.getByText(/Cupom/i)).toBeInTheDocument();
    });

    it('should render empty state when no bets', () => {
      renderBetSlip();
      
      expect(screen.getByText(/Nenhuma seleção/i)).toBeInTheDocument();
    });

    it('should render all bets', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      expect(screen.getByText('Team A vs Team B')).toBeInTheDocument();
      expect(screen.getByText('Team C vs Team D')).toBeInTheDocument();
    });

    it('should display bet odds', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      expect(screen.getByText('1.50')).toBeInTheDocument();
      expect(screen.getByText('3.00')).toBeInTheDocument();
    });

    it('should display bet selections', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      expect(screen.getByText('Team A')).toBeInTheDocument();
      expect(screen.getByText('Draw')).toBeInTheDocument();
    });

    it('should display bet types', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      const betTypes = screen.getAllByText('Vencedor');
      expect(betTypes.length).toBe(2);
    });
  });

  describe('Tabs', () => {
    it('should render tab options', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      expect(screen.getByText(/simples/i)).toBeInTheDocument();
      expect(screen.getByText(/multipla/i)).toBeInTheDocument();
      expect(screen.getByText(/sistema/i)).toBeInTheDocument();
    });

    it('should switch tabs on click', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      const simplesTab = screen.getByText(/simples/i);
      fireEvent.click(simplesTab);
      
      // Tab should be active (visual check)
      expect(simplesTab.closest('button')).toBeInTheDocument();
    });

    it('should auto-switch to multipla when more than 1 bet', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      // With 2 bets, it should automatically switch to 'multipla'
      const multiplaTab = screen.getByText(/multipla/i);
      expect(multiplaTab.closest('button')).toHaveClass('bg-secondary');
    });
  });

  describe('Bet Actions', () => {
    it('should call onRemoveBet when remove button is clicked', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      // Find and click the remove button (✕)
      const removeButtons = screen.getAllByText('✕');
      fireEvent.click(removeButtons[0]);
      
      expect(mockOnRemoveBet).toHaveBeenCalledWith('bet-1');
    });
  });

  describe('Stake Input', () => {
    it('should render stake input in simples mode', () => {
      const singleBet: Bet[] = [{
        id: 'bet-1',
        eventName: 'Team A vs Team B',
        selection: 'Team A',
        odd: 1.5,
        betType: 'Vencedor',
      }];
      
      renderBetSlip({ bets: singleBet, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      const stakeInput = screen.getByPlaceholderText(/valor/i);
      expect(stakeInput).toBeInTheDocument();
    });

    it('should allow entering stake amount', () => {
      const singleBet: Bet[] = [{
        id: 'bet-1',
        eventName: 'Team A vs Team B',
        selection: 'Team A',
        odd: 1.5,
        betType: 'Vencedor',
      }];
      
      renderBetSlip({ bets: singleBet, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      const stakeInput = screen.getByPlaceholderText(/valor/i);
      fireEvent.change(stakeInput, { target: { value: '100' } });
      
      expect(stakeInput).toHaveValue(100);
    });
  });

  describe('Potential Return', () => {
    it('should calculate and display potential return', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      // The return should be displayed
      expect(screen.getByText(/Retorno Potencial/i)).toBeInTheDocument();
    });

    it('should display total odds for multipla', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      // Total odds = 1.5 * 3.0 = 4.50
      expect(screen.getByText('4.50')).toBeInTheDocument();
    });
  });

  describe('Header Click', () => {
    it('should call onHeaderClick when provided and header is clicked', () => {
      renderBetSlip({ 
        bets: mockBets, 
        onRemoveBet: mockOnRemoveBet, 
        onClearBets: mockOnClearBets,
        onHeaderClick: mockOnHeaderClick
      });
      
      // Find and click the header
      const header = screen.getByText(/Cupom/i).closest('div');
      if (header) {
        fireEvent.click(header);
        expect(mockOnHeaderClick).toHaveBeenCalled();
      }
    });
  });

  describe('Quick Bet Toggle', () => {
    it('should render quick bet toggle', () => {
      renderBetSlip();
      
      // Quick bet toggle shows "Aposta Rápida" split into two lines
      const quickBetText = screen.getByText(/Rápida/i);
      expect(quickBetText).toBeInTheDocument();
    });
  });

  describe('Expandable State', () => {
    it('should apply className when provided', () => {
      const { container } = renderBetSlip({ 
        bets: mockBets, 
        onRemoveBet: mockOnRemoveBet, 
        onClearBets: mockOnClearBets,
        className: 'custom-class'
      });
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('custom-class');
    });
  });

  describe('Apostar Button', () => {
    it('should render apostar button when bets exist', () => {
      renderBetSlip({ bets: mockBets, onRemoveBet: mockOnRemoveBet, onClearBets: mockOnClearBets });
      
      expect(screen.getByText('APOSTAR')).toBeInTheDocument();
    });

    it('should not render apostar button when no bets', () => {
      renderBetSlip();
      
      expect(screen.queryByText('APOSTAR')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show reserve code button when empty', () => {
      renderBetSlip();
      
      expect(screen.getByText(/código de reserva/i)).toBeInTheDocument();
    });
  });
});
