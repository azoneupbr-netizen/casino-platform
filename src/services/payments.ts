import { api } from './api';

export interface DepositRequest {
  amount: number; // Amount in cents
  currency?: string;
  provider?: string;
}

export interface DepositResponse {
  id: string;
  status: string;
  amountCents: number;
  pixCode: string;
  pixQrCode?: string;
  externalId?: string;
  provider: string;
}

export interface WithdrawRequest {
  amount: number; // Amount in cents
  pixKey: string;
  pixKeyType?: 'CPF' | 'EMAIL' | 'PHONE' | 'RANDOM';
  provider?: string;
}

export interface WithdrawResponse {
  id: string;
  status: string;
  amountCents: number;
}

export const paymentsService = {
  /**
   * Create a PIX deposit
   * Uses the /payments/deposit endpoint for PIX QR code generation
   */
  createDeposit: async (data: DepositRequest): Promise<DepositResponse> => {
    const response = await api.post<DepositResponse>('/payments/deposit', {
      amount: data.amount,
      currency: data.currency || 'BRL',
      provider: data.provider || 'PIX',
    });
    return response.data;
  },

  /**
   * Create a withdrawal request
   * Uses the /transactions/withdraw endpoint
   */
  createWithdraw: async (data: WithdrawRequest): Promise<WithdrawResponse> => {
    const response = await api.post<WithdrawResponse>('/transactions/withdraw', {
      amount: data.amount,
      provider: data.provider || 'pix',
      pixKey: data.pixKey,
    });
    return response.data;
  },

  /**
   * Manually confirm a deposit (for testing purposes)
   * In production, this is handled by webhooks
   */
  confirmDeposit: async (externalId: string): Promise<any> => {
    const response = await api.post(`/payments/test/confirm/${externalId}`);
    return response.data;
  },
};
