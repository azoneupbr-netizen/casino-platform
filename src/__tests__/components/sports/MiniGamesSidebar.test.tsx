import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MiniGamesSidebar from '@/components/sports/MiniGamesSidebar';
import { api } from '@/services/api';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockGames = [
  {
    id: 1,
    name: 'Aviator',
    image: 'https://i.pinimg.com/474x/bf/bf/31/bfbf3167df9c97ee75e3303726068433.jpg',
  },
  {
    id: 2,
    name: 'Mines',
    image: 'https://i.ytimg.com/vi/2RPzHu_VYxo/sddefault.jpg',
  },
  {
    id: 3,
    name: 'Plinko',
    image: 'https://i.ytimg.com/vi/1t1mZ_T4CwY/mqdefault.jpg',
  },
  {
    id: 4,
    name: 'Crash',
    image: 'https://pbs.twimg.com/media/CyyCqPJVIAAZFOf.png',
  },
];

describe('MiniGamesSidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: mockGames });
  });

  describe('Rendering', () => {
    it('should render the sidebar content after loading', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(screen.getByText(/Mini Games/i)).toBeInTheDocument();
      });
    });

    it('should fetch games on mount from /games endpoint', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/games');
      });
    });

    it('should display games after loading', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(screen.getByText('Aviator')).toBeInTheDocument();
        expect(screen.getByText('Mines')).toBeInTheDocument();
        expect(screen.getByText('Plinko')).toBeInTheDocument();
      });
    });

    it('should display game images', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      });
    });

    it('should render choose your games header', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(screen.getByText(/ESCOLHA SEUS/i)).toBeInTheDocument();
        expect(screen.getByText(/JOGOS FAVORITOS/i)).toBeInTheDocument();
      });
    });

    it('should render play now button', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(screen.getByText(/JOGAR AGORA/i)).toBeInTheDocument();
      });
    });

    it('should render download app section', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(screen.getByText(/BAIXE O APP/i)).toBeInTheDocument();
        expect(screen.getByText(/Jogue onde quiser/i)).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should return null while loading', () => {
      (api.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
      
      const { container } = render(<MiniGamesSidebar />);
      
      // Component returns null while loading
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle API error gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      const { container } = render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      // Component should still render null when there's an error (games array empty)
      expect(container.firstChild).toBeNull();
      consoleError.mockRestore();
    });
  });

  describe('Empty State', () => {
    it('should return null when games array is empty', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [] });
      
      const { container } = render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalled();
      });
      
      // Component returns null when no games
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Game Buttons', () => {
    it('should render game buttons', async () => {
      render(<MiniGamesSidebar />);
      
      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        // Should have at least 4 game buttons + JOGAR AGORA button
        expect(buttons.length).toBeGreaterThanOrEqual(4);
      });
    });
  });
});
