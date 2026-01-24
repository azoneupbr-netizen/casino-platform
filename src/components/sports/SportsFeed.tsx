'use client';
import React from 'react';

export interface Match {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  score: string | null;
  isLive: boolean;
  odds: { home: number; draw: number; away: number };
  homeIcon: string;
  awayIcon: string;
}

const matches: Match[] = [
  {
    id: 1,
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    time: 'AO VIVO 45\'',
    score: '1 - 1',
    isLive: true,
    odds: { home: 2.10, draw: 3.50, away: 3.20 },
    homeIcon: '🔵',
    awayIcon: '🔴'
  },
  {
    id: 2,
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    time: '16:00',
    score: null,
    isLive: false,
    odds: { home: 1.95, draw: 3.80, away: 3.50 },
    homeIcon: '⚪',
    awayIcon: '🔵'
  },
  {
    id: 3,
    league: 'Brasileirão Série A',
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    time: '18:30',
    score: null,
    isLive: false,
    odds: { home: 2.30, draw: 3.10, away: 2.90 },
    homeIcon: '🔴',
    awayIcon: '🟢'
  },
  {
    id: 4,
    league: 'Serie A Itália',
    homeTeam: 'Juventus',
    awayTeam: 'Milan',
    time: 'AO VIVO 12\'',
    score: '0 - 0',
    isLive: true,
    odds: { home: 2.50, draw: 3.00, away: 2.80 },
    homeIcon: '🦓',
    awayIcon: '👹'
  },
  {
    id: 5,
    league: 'Champions League',
    homeTeam: 'Bayern Munich',
    awayTeam: 'PSG',
    time: '20:45',
    score: null,
    isLive: false,
    odds: { home: 1.80, draw: 4.00, away: 3.90 },
    homeIcon: '🔴',
    awayIcon: '🔵'
  }
];

import { Bet } from './BetSlip';

interface SportsFeedProps {
  onAddBet: (bet: Omit<Bet, 'id'>) => void;
  onMatchSelect: (match: Match) => void;
  bets?: Bet[];
}

export default function SportsFeed({ onAddBet, onMatchSelect, bets = [] }: SportsFeedProps) {
  
  const handleBetClick = (match: Match, selection: string, odd: number, type: string) => {
      // Verifica se já existe para evitar duplicação (opcional, ou toggle)
      const betId = `${match.id}-${selection}`;
      // Aqui simplificamos, a lógica de remover/toggle poderia ser no pai, 
      // mas vamos apenas adicionar por enquanto ou ignorar se já existe.
      
      const isSelected = bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === selection);
      
      if (!isSelected) {
          onAddBet({
              eventName: `${match.homeTeam} vs ${match.awayTeam}`,
              betType: type,
              odd: odd,
              selection: selection
          });
      }
  };

  return (
    <div className="flex-1 space-y-4">
      {/* Lista de Jogos */}
      <div className="space-y-3">
        {matches.map((match) => (
          <div 
            key={match.id}
            className="bg-secondary border border-border-custom rounded-xl p-4 hover:border-accent-primary transition-all cursor-pointer group shadow-sm"
          >
            {/* Click Area para Detalhes (Exclui botões de odds) */}
            <div onClick={() => onMatchSelect(match)}>
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-bold">{match.league}</span>
                    <span>•</span>
                    <span className={`${match.isLive ? 'text-red-500 animate-pulse font-bold' : ''}`}>
                      {match.time}
                    </span>
                  </div>
                  <div className="text-text-muted text-xs hover:text-accent-primary flex items-center gap-1">
                    <span>+152 mercados</span>
                    <span className="text-lg">›</span>
                  </div>
                </div>

                {/* Times e Placar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{match.homeIcon}</span>
                      <span className="text-text-primary font-bold group-hover:text-accent-primary transition-colors">{match.homeTeam}</span>
                      {match.isLive && <span className="ml-auto font-mono text-accent-gold font-bold">{match.score?.split(' - ')[0]}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{match.awayIcon}</span>
                      <span className="text-text-primary font-bold group-hover:text-accent-primary transition-colors">{match.awayTeam}</span>
                      {match.isLive && <span className="ml-auto font-mono text-accent-gold font-bold">{match.score?.split(' - ')[1]}</span>}
                    </div>
                  </div>
                </div>
            </div>

            {/* Odds (1x2) - Botões não propagam o clique para o card pai */}
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleBetClick(match, 'Casa', match.odds.home, 'Vencedor')}
                className={`rounded-lg p-2 text-center transition-colors group/odd ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Casa')
                    ? 'bg-accent-gold text-primary'
                    : 'bg-primary hover:bg-tertiary'
                }`}
              >
                <span className={`block text-xs mb-1 ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Casa') ? 'text-primary' : 'text-text-muted'
                }`}>1</span>
                <span className={`block font-bold ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Casa') ? 'text-primary' : 'text-accent-gold group-hover/odd:text-accent-primary'
                }`}>
                  {match.odds.home.toFixed(2)}
                </span>
              </button>

              <button 
                onClick={() => handleBetClick(match, 'Empate', match.odds.draw, 'Vencedor')}
                className={`rounded-lg p-2 text-center transition-colors group/odd ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Empate')
                    ? 'bg-accent-gold text-primary'
                    : 'bg-primary hover:bg-tertiary'
                }`}
              >
                <span className={`block text-xs mb-1 ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Empate') ? 'text-primary' : 'text-text-muted'
                }`}>X</span>
                <span className={`block font-bold ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Empate') ? 'text-primary' : 'text-accent-gold group-hover/odd:text-accent-primary'
                }`}>
                  {match.odds.draw.toFixed(2)}
                </span>
              </button>

              <button 
                onClick={() => handleBetClick(match, 'Fora', match.odds.away, 'Vencedor')}
                className={`rounded-lg p-2 text-center transition-colors group/odd ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Fora')
                    ? 'bg-accent-gold text-primary'
                    : 'bg-primary hover:bg-tertiary'
                }`}
              >
                <span className={`block text-xs mb-1 ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Fora') ? 'text-primary' : 'text-text-muted'
                }`}>2</span>
                <span className={`block font-bold ${
                  bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === 'Fora') ? 'text-primary' : 'text-accent-gold group-hover/odd:text-accent-primary'
                }`}>
                  {match.odds.away.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
