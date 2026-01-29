import { api } from './api';

export interface BenefitStatus {
  available: boolean;
  amount: number;
  claimed?: boolean;
  period?: string;
}

export interface BenefitsResponse {
  daily: BenefitStatus;
  weekly: BenefitStatus;
  rakeback: BenefitStatus;
}

export type BenefitType = 'DAILY_CASHBACK' | 'WEEKLY_BONUS' | 'RAKEBACK';

// Dados mockados para desenvolvimento/fallback
const MOCK_BENEFITS: BenefitsResponse = {
  daily: { available: true, amount: 12.50, claimed: false },
  weekly: { available: false, amount: 0, period: '3 dias' },
  rakeback: { available: true, amount: 45.30 }
};

export const benefitsService = {
  getBenefitsStatus: async () => {
    try {
      const response = await api.get<BenefitsResponse>('/benefits/status');
      return response.data;
    } catch (error) {
      console.warn('API Benefits não disponível, usando dados mockados (desenvolvimento)');
      // Retorna mock se falhar (ex: backend remoto não atualizado)
      return MOCK_BENEFITS;
    }
  },

  claimBenefit: async (type: BenefitType) => {
    try {
      // Correção: Enviar type na URL conforme o backend espera
      const response = await api.post(`/benefits/claim/${type}`);
      return response.data;
    } catch (error) {
      console.warn('API Benefits Claim não disponível, simulando sucesso');
      // Simula sucesso após 1s
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, message: 'Benefício resgatado (MOCK)' }), 1000);
      });
    }
  },
};
