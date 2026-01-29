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

export const benefitsService = {
  getBenefitsStatus: async () => {
    const response = await api.get<BenefitsResponse>('/benefits/status');
    return response.data;
  },

  claimBenefit: async (type: BenefitType) => {
    const response = await api.post('/benefits/claim', { type });
    return response.data;
  },
};
