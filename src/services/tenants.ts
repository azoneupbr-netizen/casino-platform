import { api } from './api';

export interface TenantConfig {
  name: string;
  domain?: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
  };
  pwa: {
    short_name: string;
    name: string;
    icons: string[];
    start_url: string;
    display: string;
    theme_color: string;
    background_color: string;
  };
  plan?: {
    name?: string;
    features?: Record<string, boolean>;
  };
}

export interface TenantStats {
  totalUsers?: number;
  totalDeposits?: number;
  totalWithdrawals?: number;
  activeGames?: number;
}

export const tenantsService = {
  /**
   * Get public tenant configuration by domain
   * @param domain The tenant domain (e.g., 'localhost', 'casino.example.com')
   */
  getPublicConfig: async (domain: string): Promise<TenantConfig> => {
    const response = await api.get<TenantConfig>(`/public/tenants/${domain}/config`);
    return response.data;
  },

  /**
   * Get tenant stats (requires authentication)
   */
  getStats: async (): Promise<TenantStats> => {
    const response = await api.get<TenantStats>('/tenants/stats');
    return response.data;
  },

  /**
   * Get list of available plans
   */
  getPlans: async () => {
    const response = await api.get('/tenants/plans');
    return response.data;
  },

  /**
   * Get current domain from window location
   */
  getCurrentDomain: (): string => {
    if (typeof window === 'undefined') return 'localhost';
    return window.location.hostname;
  },
};
