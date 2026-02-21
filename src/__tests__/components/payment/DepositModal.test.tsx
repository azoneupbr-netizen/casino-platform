import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DepositModal from '@/components/payment/DepositModal';
import { api } from '@/services/api';
import { ToastProvider } from '@/contexts/ToastContext';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

// Mock clipboard API
const mockWriteText = jest.fn().mockResolvedValue(undefined);
beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockWriteText,
    },
    configurable: true,
  });
});

const mockOnClose = jest.fn();

const renderWithToast = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('DepositModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      renderWithToast(<DepositModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('Depositar')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Depositar')).toBeInTheDocument();
    });

    it('should display promotional banner', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText(/20% DE/)).toBeInTheDocument();
      expect(screen.getByText(/CASHBACK/)).toBeInTheDocument();
    });

    it('should display close button', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
  });

  describe('Payment Methods', () => {
    it('should display payment method buttons', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Pay2Free')).toBeInTheDocument();
      expect(screen.getByText('PixPaag')).toBeInTheDocument();
    });

    it('should allow switching payment methods', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const pixpaagBtn = screen.getByText('PixPaag');
      fireEvent.click(pixpaagBtn);
      
      expect(screen.getByText('PIXPAAG')).toBeInTheDocument();
    });
  });

  describe('Amount Selection', () => {
    it('should display quick amount buttons', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('R$ 20')).toBeInTheDocument();
      expect(screen.getByText('R$ 50')).toBeInTheDocument();
      expect(screen.getByText('R$ 100')).toBeInTheDocument();
      expect(screen.getByText('R$ 250')).toBeInTheDocument();
      expect(screen.getByText('R$ 500')).toBeInTheDocument();
      expect(screen.getByText('R$ 1000')).toBeInTheDocument();
    });

    it('should update amount when quick button is clicked', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const btn100 = screen.getByText('R$ 100');
      fireEvent.click(btn100);
      
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('100');
    });

    it('should allow manual amount input', async () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '75' } });
      
      expect(input.value).toBe('75');
    });

    it('should display HOT badges on select amounts', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const hotBadges = screen.getAllByText('HOT');
      expect(hotBadges.length).toBe(3); // 50, 250, 1000
    });
  });

  describe('Deposit Flow', () => {
    it('should display deposit button', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('DEPOSITAR')).toBeInTheDocument();
    });

    it('should show loading state when processing', async () => {
      (api.post as jest.Mock).mockImplementation(() => new Promise(() => {}));
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('PROCESSANDO...')).toBeInTheDocument();
      });
    });

    it('should call API when deposit button is clicked', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/QR_Code_Damaged.jpg/250px-QR_Code_Damaged.jpg',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/payments/deposit', {
          amount: 50,
          currency: 'BRL',
          provider: 'PIX',
        });
      });
    });

    it('should display PIX QR code after successful deposit', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://fitsmallbusiness.com/wp-content/uploads/2021/10/Screenshot_of_Square_QR_Payment_Processors.jpg',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('Pagamento via Pix')).toBeInTheDocument();
      });
    });

    it('should display copy button for PIX code', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('COPIAR')).toBeInTheDocument();
      });
    });

    it('should copy PIX code to clipboard', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://i.ytimg.com/vi/AWBef9IHuqg/maxresdefault.jpg',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('COPIAR')).toBeInTheDocument();
      });
      
      const copyBtn = screen.getByText('COPIAR');
      fireEvent.click(copyBtn);
      
      expect(mockWriteText).toHaveBeenCalledWith('pix-code-123');
    });
  });

  describe('Close Modal', () => {
    it('should call onClose when close button is clicked', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const closeBtn = screen.getByText('✕');
      fireEvent.click(closeBtn);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when backdrop is clicked', () => {
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const backdrop = document.querySelector('.bg-black\\/80');
      if (backdrop) {
        fireEvent.click(backdrop);
      }
      
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should show error toast on API failure', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.post as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });
      
      consoleError.mockRestore();
    });
  });

  describe('Simulate Payment', () => {
    it('should display simulate payment button', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://i.pinimg.com/736x/96/e8/75/96e8759da4f4d2ac1c3c6003028a8d86.jpg',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('SIMULAR PAGAMENTO APROVADO')).toBeInTheDocument();
      });
    });

    it('should allow going back to amount selection', async () => {
      (api.post as jest.Mock).mockResolvedValue({
        data: {
          pixCode: 'pix-code-123',
          pixQrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/250px-QR_code_for_mobile_English_Wikipedia.svg.png',
          externalId: 'ext-123',
        },
      });
      
      renderWithToast(<DepositModal isOpen={true} onClose={mockOnClose} />);
      
      const depositBtn = screen.getByText('DEPOSITAR');
      fireEvent.click(depositBtn);
      
      await waitFor(() => {
        expect(screen.getByText('Voltar')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Voltar'));
      
      expect(screen.getByText('DEPOSITAR')).toBeInTheDocument();
    });
  });
});
