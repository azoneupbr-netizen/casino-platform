import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantumAI from '@/components/sports/QuantumAI';

describe('QuantumAI Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<QuantumAI />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render the header', () => {
      render(<QuantumAI />);
      expect(screen.getByText('Quantum AI')).toBeInTheDocument();
    });

    it('should render assistant subtitle', () => {
      render(<QuantumAI />);
      expect(screen.getByText('Assistente Inteligente PRO')).toBeInTheDocument();
    });

    it('should render brain emoji icon', () => {
      render(<QuantumAI />);
      expect(screen.getByText('🧠')).toBeInTheDocument();
    });
  });

  describe('Hover Interaction', () => {
    it('should expand content on hover', () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      expect(screen.getByPlaceholderText('Pergunte ao Quantum AI...')).toBeInTheDocument();
    });

    it('should collapse content on mouse leave', () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      fireEvent.mouseLeave(mainDiv);
      
      // Content should collapse but input might still be in DOM with opacity-0
      const contentDiv = container.querySelector('.opacity-0');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should show description text on hover', () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      expect(screen.getByText(/O assistente Quantum analisa milhares de dados/)).toBeInTheDocument();
    });
  });

  describe('Suggestions', () => {
    it('should display suggestion buttons on hover', () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      expect(screen.getByText('Melhor aposta Flamengo?')).toBeInTheDocument();
      expect(screen.getByText('Value bets hoje?')).toBeInTheDocument();
      expect(screen.getByText('Análise Lakers vs Warriors')).toBeInTheDocument();
    });

    it('should fill input when suggestion is clicked', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const suggestionBtn = screen.getByText('Melhor aposta Flamengo?');
      fireEvent.click(suggestionBtn);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...') as HTMLInputElement;
      expect(input.value).toBe('Melhor aposta Flamengo?');
    });
  });

  describe('Input and Ask Functionality', () => {
    it('should allow typing in the input', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      await user.type(input, 'Test query');
      
      expect(input).toHaveValue('Test query');
    });

    it('should disable ask button when input is empty', () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const buttons = container.querySelectorAll('button');
      const askButton = Array.from(buttons).find(btn => btn.querySelector('svg'));
      
      expect(askButton).toBeDisabled();
    });

    it('should show loading spinner when asking', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'Melhor aposta?' } });
      
      const buttons = container.querySelectorAll('button');
      const askButton = Array.from(buttons).find(btn => btn.querySelector('svg'));
      
      await act(async () => {
        fireEvent.click(askButton!);
      });
      
      // Check for spinner
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should handle Enter key to submit', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'Test query' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      // Should show loading
      await waitFor(() => {
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
    });
  });

  describe('Response Generation', () => {
    it('should show Flamengo response for Flamengo query', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'flamengo' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      expect(screen.getByText(/Flamengo venceu 6 vezes/)).toBeInTheDocument();
    });

    it('should show ROI response for ROI query', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'roi' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      expect(screen.getByText(/oportunidades com ROI projetado/)).toBeInTheDocument();
    });

    it('should show default response for other queries', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'other query' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      expect(screen.getByText(/Analisando base de dados/)).toBeInTheDocument();
    });

    it('should show "Nova consulta" button after response', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      expect(screen.getByText('Nova consulta')).toBeInTheDocument();
    });

    it('should reset to initial state when "Nova consulta" is clicked', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      const newQueryBtn = screen.getByText('Nova consulta');
      fireEvent.click(newQueryBtn);
      
      // Should show suggestions again
      expect(screen.getByText('Melhor aposta Flamengo?')).toBeInTheDocument();
    });

    it('should show real-time analysis label in response', async () => {
      const { container } = render(<QuantumAI />);
      const mainDiv = container.firstChild as HTMLElement;
      
      fireEvent.mouseEnter(mainDiv);
      
      const input = screen.getByPlaceholderText('Pergunte ao Quantum AI...');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      expect(screen.getByText('Análise em Tempo Real')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have gradient background', () => {
      const { container } = render(<QuantumAI />);
      expect(container.firstChild).toHaveClass('bg-gradient-to-b');
    });

    it('should have border', () => {
      const { container } = render(<QuantumAI />);
      expect(container.firstChild).toHaveClass('border');
    });

    it('should have rounded corners', () => {
      const { container } = render(<QuantumAI />);
      expect(container.firstChild).toHaveClass('rounded-xl');
    });
  });
});
