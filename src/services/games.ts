import { api } from './api';

export interface Game {
  id: number;
  name: string;
  provider: string;
  image: string;
}

export const gamesService = {
  /**
   * Get top/featured games
   */
  getTopGames: async (): Promise<Game[]> => {
    try {
      const response = await api.get<Game[]>('/games/top');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch games from API, using fallback');
      // Fallback data if API fails
      return [
        { id: 1, name: 'Sweet Bonanza', provider: 'Pragmatic', image: '🍬' },
        { id: 2, name: 'Aviator', provider: 'Spribe', image: '✈️' },
        { id: 3, name: 'Fortune Tiger', provider: 'PG Soft', image: '🐯' },
        { id: 4, name: 'Roleta', provider: 'Evolution', image: '🎡' },
        { id: 5, name: 'Blackjack', provider: 'Evolution', image: '🂡' },
        { id: 6, name: 'Gates of Olympus', provider: 'Pragmatic', image: '⚡' },
        { id: 7, name: 'Book of Dead', provider: "Play'n GO", image: '📖' },
        { id: 8, name: 'Big Bass Bonanza', provider: 'Pragmatic', image: '🐟' },
        { id: 9, name: 'Sugar Rush', provider: 'Pragmatic', image: '🍭' },
        { id: 10, name: 'Jogo do Tigre', provider: 'PG Soft', image: '🐅' },
      ];
    }
  },
};
