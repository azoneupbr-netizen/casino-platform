import { api } from './api';

export interface WalletBalance {
  walletId: string;
  balanceCents: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW';
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
  amountCents: number;
  currency: string;
  provider: string;
  pixCode?: string;
  pixQrCode?: string;
  externalId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepositResponse {
  id: string;
  status: string;
  amountCents: number;
  pixCode: string;
  pixQrCode?: string;
}

export interface WithdrawResponse {
  id: string;
  status: string;
  amountCents: number;
}

export const walletService = {
  /**
   * Get or create user wallet
   */
  getOrCreateWallet: async () => {
    const response = await api.post('/wallets/me');
    return response.data;
  },

  /**
   * Get current wallet balance
   */
  getBalance: async (): Promise<WalletBalance> => {
    const response = await api.get<WalletBalance>('/wallets/me/balance');
    return response.data;
  },

  /**
   * Create a deposit transaction
   * @param amountCents Amount in cents (e.g., R$50.00 = 5000)
   * @param provider Payment provider (e.g., 'pix')
   */
  createDeposit: async (amountCents: number, provider: string = 'pix'): Promise<DepositResponse> => {
    const response = await api.post<DepositResponse>('/transactions/deposit', {
      amount: amountCents,
      provider,
    });
    return response.data;
  },

  /**
   * Create a withdrawal transaction
   * @param amountCents Amount in cents
   * @param provider Payment provider
   * @param pixKey User's PIX key for receiving the withdrawal
   */
  createWithdraw: async (amountCents: number, provider: string = 'pix', pixKey: string): Promise<WithdrawResponse> => {
    const response = await api.post<WithdrawResponse>('/transactions/withdraw', {
      amount: amountCents,
      provider,
      pixKey,
    });
    return response.data;
  },

  /**
   * Format balance from cents to BRL currency string
   */
  formatBalance: (balanceCents: number): string => {
    return (balanceCents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  },

  /**
   * Convert BRL amount to cents
   */
  toCents: (amount: number): number => {
    return Math.round(amount * 100);
  },

  /**
   * Convert cents to BRL amount
   */
  fromCents: (cents: number): number => {
    return cents / 100;
  },
};
