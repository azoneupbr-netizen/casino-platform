import { benefitsService, BenefitsResponse, BenefitType } from '@/services/benefits';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockBenefitsResponse: BenefitsResponse = {
  daily: { available: true, amount: 12.50, claimed: false },
  weekly: { 
    available: true, 
    amount: 50.00, 
    period: 'week-1',
    availableInDays: 0,
  },
  rakeback: { available: true, amount: 45.30 },
};

describe('Benefits Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getBenefitsStatus', () => {
    it('should fetch benefits status from API', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockBenefitsResponse });
      
      const result = await benefitsService.getBenefitsStatus();
      
      expect(api.get).toHaveBeenCalledWith('/benefits/status');
      expect(result).toEqual(mockBenefitsResponse);
    });

    it('should save to localStorage on successful API call', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockBenefitsResponse });
      
      await benefitsService.getBenefitsStatus();
      
      const stored = localStorage.getItem('benefits_mock_state');
      expect(stored).not.toBeNull();
    });

    it('should return mock data when API fails', async () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      const result = await benefitsService.getBenefitsStatus();
      
      expect(result).toBeDefined();
      expect(result.daily).toBeDefined();
      expect(result.weekly).toBeDefined();
      expect(result.rakeback).toBeDefined();
      
      consoleWarn.mockRestore();
    });

    it('should return stored mock data if available', async () => {
      const storedData: BenefitsResponse = {
        daily: { available: false, amount: 0, claimed: true },
        weekly: { available: false, amount: 0, availableInDays: 5 },
        rakeback: { available: true, amount: 100 },
      };
      localStorage.setItem('benefits_mock_state', JSON.stringify(storedData));
      
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      const result = await benefitsService.getBenefitsStatus();
      
      expect(result.daily.claimed).toBe(true);
      expect(result.rakeback.amount).toBe(100);
      
      consoleWarn.mockRestore();
    });
  });

  describe('claimBenefit', () => {
    it('should claim daily cashback via API', async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
      
      await benefitsService.claimBenefit('DAILY_CASHBACK');
      
      expect(api.post).toHaveBeenCalledWith('/benefits/claim/DAILY_CASHBACK');
    });

    it('should claim weekly bonus via API', async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
      
      await benefitsService.claimBenefit('WEEKLY_BONUS');
      
      expect(api.post).toHaveBeenCalledWith('/benefits/claim/WEEKLY_BONUS');
    });

    it('should claim rakeback via API', async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
      
      await benefitsService.claimBenefit('RAKEBACK');
      
      expect(api.post).toHaveBeenCalledWith('/benefits/claim/RAKEBACK');
    });

    it('should update local storage after claiming benefit', async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
      
      // First, set up initial state
      const initialState: BenefitsResponse = {
        daily: { available: true, amount: 12.50, claimed: false },
        weekly: { available: true, amount: 50, availableInDays: 0 },
        rakeback: { available: true, amount: 45.30 },
      };
      localStorage.setItem('benefits_mock_state', JSON.stringify(initialState));
      
      await benefitsService.claimBenefit('DAILY_CASHBACK');
      
      const stored = JSON.parse(localStorage.getItem('benefits_mock_state') || '{}');
      expect(stored.daily.claimed).toBe(true);
    });

    it('should simulate success when API fails', async () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (api.post as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      const result = await benefitsService.claimBenefit('DAILY_CASHBACK');
      
      expect(result).toEqual({
        success: true,
        message: 'Benefício resgatado (MOCK PERSISTENTE)',
      });
      
      consoleWarn.mockRestore();
    }, 10000);

    it('should update local mock state on claim failure', async () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (api.post as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      // Set initial state
      const initialState: BenefitsResponse = {
        daily: { available: true, amount: 12.50, claimed: false },
        weekly: { available: true, amount: 50, availableInDays: 0 },
        rakeback: { available: true, amount: 45.30 },
      };
      localStorage.setItem('benefits_mock_state', JSON.stringify(initialState));
      
      await benefitsService.claimBenefit('WEEKLY_BONUS');
      
      const stored = JSON.parse(localStorage.getItem('benefits_mock_state') || '{}');
      expect(stored.weekly.claimed).toBe(true);
      expect(stored.weekly.available).toBe(false);
      
      consoleWarn.mockRestore();
    }, 10000);
  });
});
