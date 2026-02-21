import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SupportModal from '@/components/layout/SupportModal';

describe('SupportModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <SupportModal isOpen={false} onClose={mockOnClose} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
      const { container } = render(
        <SupportModal isOpen={true} onClose={mockOnClose} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render header with title', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Suporte ao Vivo')).toBeInTheDocument();
    });

    it('should render response time indicator', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Tempo de resposta: ~2 min')).toBeInTheDocument();
    });

    it('should render headphones emoji', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('🎧')).toBeInTheDocument();
    });

    it('should render initial welcome message', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Olá! Como posso ajudar você hoje?')).toBeInTheDocument();
    });

    it('should render message input', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    });

    it('should render send button', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('➤')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button', { name: '' });
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when header is clicked', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const header = screen.getByText('Suporte ao Vivo').closest('div');
      const headerParent = header?.parentElement;
      fireEvent.click(headerParent!);
      
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Message Input', () => {
    it('should allow typing in the input', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      await user.type(input, 'Hello');
      
      expect(input).toHaveValue('Hello');
    });

    it('should disable send button when input is empty', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const sendButton = screen.getByText('➤');
      expect(sendButton).toBeDisabled();
    });

    it('should enable send button when input has text', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      const sendButton = screen.getByText('➤');
      expect(sendButton).not.toBeDisabled();
    });

    it('should not submit empty messages', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const form = screen.getByPlaceholderText('Digite sua mensagem...').closest('form');
      fireEvent.submit(form!);
      
      // Should still only have the initial message
      const messages = screen.getAllByText(/./);
      expect(screen.getByText('Olá! Como posso ajudar você hoje?')).toBeInTheDocument();
    });
  });

  describe('Message Sending', () => {
    it('should send message when form is submitted', async () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      fireEvent.change(input, { target: { value: 'Test message' } });
      
      const form = input.closest('form');
      await act(async () => {
        fireEvent.submit(form!);
      });
      
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should clear input after sending message', async () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Test message' } });
      
      const form = input.closest('form');
      await act(async () => {
        fireEvent.submit(form!);
      });
      
      expect(input.value).toBe('');
    });

    it('should show user message with correct styling', async () => {
      const { container } = render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      fireEvent.change(input, { target: { value: 'Test message' } });
      
      const form = input.closest('form');
      await act(async () => {
        fireEvent.submit(form!);
      });
      
      const userMessage = screen.getByText('Test message').closest('div');
      expect(userMessage).toHaveClass('bg-[#ccff00]');
    });

    it('should receive automated response after sending message', async () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      fireEvent.change(input, { target: { value: 'Test message' } });
      
      const form = input.closest('form');
      await act(async () => {
        fireEvent.submit(form!);
      });
      
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(screen.getByText(/Obrigado pelo contato/)).toBeInTheDocument();
    });

    it('should show timestamp on messages', async () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const timestamps = screen.getAllByText('Agora');
      expect(timestamps.length).toBeGreaterThan(0);
    });
  });

  describe('Styling', () => {
    it('should have fixed positioning', () => {
      const { container } = render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(container.firstChild).toHaveClass('fixed');
    });

    it('should have high z-index', () => {
      const { container } = render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      expect(container.firstChild).toHaveClass('z-[2000]');
    });

    it('should have animation classes', () => {
      const { container } = render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      const modal = container.querySelector('.animate-in');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have focusable input', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText('Digite sua mensagem...');
      input.focus();
      
      expect(document.activeElement).toBe(input);
    });

    it('should have accessible submit button', () => {
      render(<SupportModal isOpen={true} onClose={mockOnClose} />);
      
      const sendButton = screen.getByText('➤');
      expect(sendButton).toHaveAttribute('type', 'submit');
    });
  });
});
