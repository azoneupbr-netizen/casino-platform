import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LongTermBetsWidget from '@/components/sports/LongTermBetsWidget';
import { api } from '@/services/api';

jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('LongTermBetsWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should return null while loading', () => {
      (api.get as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
      
      const { container } = render(<LongTermBetsWidget />);
      
      expect(container.firstChild).toBeNull();
    });
  });

  describe('With Data', () => {
    const mockMatches = [
      { league: 'Premier League' },
      { league: 'La Liga' },
      { league: 'Serie A' },
      { league: 'Premier League' }, // Duplicate
      { league: 'Bundesliga' },
    ];

    beforeEach(() => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockMatches });
    });

    it('should render header', async () => {
      render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        expect(screen.getByText('Ligas Disponíveis')).toBeInTheDocument();
      });
    });

    it('should display unique leagues', async () => {
      render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        expect(screen.getByText('Premier League')).toBeInTheDocument();
        expect(screen.getByText('La Liga')).toBeInTheDocument();
        expect(screen.getByText('Serie A')).toBeInTheDocument();
        expect(screen.getByText('Bundesliga')).toBeInTheDocument();
      });
    });

    it('should render trophy icons for leagues', async () => {
      render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        const trophies = screen.getAllByText('🏆');
        expect(trophies.length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  describe('Empty Data', () => {
    it('should return null when no leagues', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [] });
      
      const { container } = render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API error gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      const { container } = render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
      
      consoleError.mockRestore();
    });
  });

  describe('API Call', () => {
    it('should call correct API endpoint', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [{ league: 'Test League' }] });
      
      render(<LongTermBetsWidget />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/sports/matches');
      });
    });
  });
});
