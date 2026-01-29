import { api } from './api';

export interface BenefitStatus {
  available: boolean;
  amount: number;
  claimed?: boolean;
  period?: string;
  availableInDays?: number;
}

export interface BenefitsResponse {
  daily: BenefitStatus;
  weekly: BenefitStatus;
  rakeback: BenefitStatus;
}

export type BenefitType = 'DAILY_CASHBACK' | 'WEEKLY_BONUS' | 'RAKEBACK';

// Dados mockados para desenvolvimento/fallback
// Função para calcular dias restantes até segunda-feira
const getDaysUntilMonday = () => {
  const today = new Date();
  const day = today.getDay(); // 0=Sun, 1=Mon, ..., 4=Thu
  // Se hoje é segunda (1), retorna 0 (disponível) ou 7?
  // A lógica do backend diz que se é o dia, está disponível.
  // Se não é, calcula dias.
  if (day === 1) return 0;
  
  const days = (1 - day + 7) % 7;
  return days === 0 ? 7 : days;
};

const MOCK_BENEFITS: BenefitsResponse = {
  daily: { available: true, amount: 12.50, claimed: false },
  weekly: { 
    available: false, 
    amount: 0, 
    period: 'mock-week',
    availableInDays: getDaysUntilMonday()
  },
  rakeback: { available: true, amount: 45.30 }
};

const getStoredMock = () => {
  if (typeof window === 'undefined') return { ...MOCK_BENEFITS };
  const stored = localStorage.getItem('benefits_mock_state');
  if (stored) {
    const parsed = JSON.parse(stored);
    // Atualiza o cálculo de dias dinamicamente mesmo se recuperar do storage
    if (parsed.weekly) {
      parsed.weekly.availableInDays = getDaysUntilMonday();
    }
    return parsed;
  }
  return { ...MOCK_BENEFITS };
};

const saveStoredMock = (state: BenefitsResponse) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('benefits_mock_state', JSON.stringify(state));
  }
};

export const benefitsService = {
  getBenefitsStatus: async () => {
    try {
      // Tenta API real primeiro
      const response = await api.get<BenefitsResponse>('/benefits/status');
      // Se sucesso, atualiza o mock local para ficar sincronizado
      saveStoredMock(response.data);
      return response.data;
    } catch (error) {
      console.warn('API Benefits não disponível, usando dados mockados com persistência local');
      return getStoredMock();
    }
  },

  claimBenefit: async (type: BenefitType) => {
    try {
      const response = await api.post(`/benefits/claim/${type}`);
      // Se sucesso, também atualiza o mock local para refletir o resgate
      const currentMock = getStoredMock();
      if (type === 'DAILY_CASHBACK') currentMock.daily.claimed = true;
      else if (type === 'WEEKLY_BONUS') currentMock.weekly.claimed = true;
      else if (type === 'RAKEBACK') currentMock.rakeback.amount = 0; // Reset rakeback
      saveStoredMock(currentMock);
      
      return response.data;
    } catch (error) {
      console.warn('API Benefits Claim não disponível, simulando sucesso com persistência');
      
      const currentMock = getStoredMock();
      if (type === 'DAILY_CASHBACK') {
        currentMock.daily = { ...currentMock.daily, available: false, amount: 0, claimed: true };
      } else if (type === 'WEEKLY_BONUS') {
        currentMock.weekly = { ...currentMock.weekly, available: false, amount: 0, claimed: true };
      } else if (type === 'RAKEBACK') {
        currentMock.rakeback = { ...currentMock.rakeback, available: false, amount: 0, claimed: true };
      }
      saveStoredMock(currentMock);

      // Simula sucesso após 1s
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, message: 'Benefício resgatado (MOCK PERSISTENTE)' }), 1000);
      });
    }
  },
};
