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
  odds: { 
    home: number; 
    draw: number; 
    away: number;
    // Novos mercados
    over25?: number;
    under25?: number;
    bothScoreYes?: number;
    bothScoreNo?: number;
    doubleChance1X?: number;
    doubleChanceX2?: number;
    doubleChance12?: number;
  };
  homeIcon: string;
  awayIcon: string;
}

const matches: Match[] = [
  {
    id: 1,
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    time: "AO VIVO 45'",
    score: '1 - 1',
    isLive: true,
    odds: { 
        home: 2.10, draw: 3.50, away: 3.20,
        over25: 1.65, under25: 2.10,
        bothScoreYes: 1.50, bothScoreNo: 2.40,
        doubleChance1X: 1.30, doubleChanceX2: 1.55, doubleChance12: 1.25
    },
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
    odds: { 
        home: 1.95, draw: 3.80, away: 3.50,
        over25: 1.70, under25: 2.05,
        bothScoreYes: 1.60, bothScoreNo: 2.20,
        doubleChance1X: 1.25, doubleChanceX2: 1.60, doubleChance12: 1.22
    },
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
    odds: { 
        home: 2.30, draw: 3.10, away: 2.90,
        over25: 2.00, under25: 1.75,
        bothScoreYes: 1.80, bothScoreNo: 1.90,
        doubleChance1X: 1.35, doubleChanceX2: 1.50, doubleChance12: 1.30
    },
    homeIcon: '🔴',
    awayIcon: '🟢'
  },
  {
    id: 4,
    league: 'Serie A Itália',
    homeTeam: 'Juventus',
    awayTeam: 'Milan',
    time: "AO VIVO 12'",
    score: '0 - 0',
    isLive: true,
    odds: { 
        home: 2.50, draw: 3.00, away: 2.80,
        over25: 2.20, under25: 1.60,
        bothScoreYes: 1.95, bothScoreNo: 1.75,
        doubleChance1X: 1.40, doubleChanceX2: 1.45, doubleChance12: 1.35
    },
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
    odds: { 
        home: 1.80, draw: 4.00, away: 3.90,
        over25: 1.45, under25: 2.60,
        bothScoreYes: 1.40, bothScoreNo: 2.70,
        doubleChance1X: 1.18, doubleChanceX2: 1.80, doubleChance12: 1.20
    },
    homeIcon: '🔴',
    awayIcon: '🔵'
  },
  {
    id: 6,
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    time: "AO VIVO Q3",
    score: '89 - 88',
    isLive: true,
    odds: { 
        home: 1.85, draw: 12.0, away: 1.95,
        over25: 1.90, under25: 1.90,
        bothScoreYes: 1.05, bothScoreNo: 8.00,
        doubleChance1X: 1.0, doubleChanceX2: 1.0, doubleChance12: 1.0
    },
    homeIcon: '🏀',
    awayIcon: '🌉'
  },
  {
    id: 7,
    league: 'Tênis ATP',
    homeTeam: 'Alcaraz',
    awayTeam: 'Djokovic',
    time: "AO VIVO Set 2",
    score: '1 - 0 (4-3)',
    isLive: true,
    odds: { 
        home: 1.70, draw: 0, away: 2.10,
        over25: 1.85, under25: 1.95,
        bothScoreYes: 0, bothScoreNo: 0,
        doubleChance1X: 0, doubleChanceX2: 0, doubleChance12: 0
    },
    homeIcon: '🇪🇸',
    awayIcon: '🇷🇸'
  },
  {
    id: 8,
    league: 'CS2 Major',
    homeTeam: 'Furia',
    awayTeam: 'NaVi',
    time: "AO VIVO Map 1",
    score: '11 - 9',
    isLive: true,
    odds: { 
        home: 2.20, draw: 0, away: 1.60,
        over25: 1.80, under25: 1.90,
        bothScoreYes: 0, bothScoreNo: 0,
        doubleChance1X: 0, doubleChanceX2: 0, doubleChance12: 0
    },
    homeIcon: '🇧🇷',
    awayIcon: '🇺🇦'
  }
];

import { Bet } from './BetSlip';

interface SportsFeedProps {
  onAddBet: (bet: Omit<Bet, 'id'>) => void;
  onMatchSelect: (match: Match) => void;
  bets?: Bet[];
}

export default function SportsFeed({ onAddBet, onMatchSelect, bets = [] }: SportsFeedProps) {
  const [selectedMarket, setSelectedMarket] = React.useState('winner'); // winner, overUnder, bothScore, doubleChance

  const handleBetClick = (match: Match, selection: string, odd: number, type: string) => {
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
    <div className="flex-1">
      {/* Seletor de Mercados - Estilo Tabs */}
      <div className="flex gap-6 mb-2 border-b border-border-custom px-2 overflow-x-auto scrollbar-hide">
        {['Vencedor', 'Acima/Abaixo', 'Ambos Marcam', 'Chance Dupla'].map((market) => {
          const marketKey = market === 'Vencedor' ? 'winner' : 
                            market === 'Acima/Abaixo' ? 'overUnder' :
                            market === 'Ambos Marcam' ? 'bothScore' : 'doubleChance';
          const isActive = selectedMarket === marketKey;
          return (
            <button
              key={market}
              onClick={() => setSelectedMarket(marketKey)}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
                  isActive
                  ? 'text-accent-gold' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {market}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold rounded-t-full"></span>
              )}
            </button>
          )
        })}
      </div>

      {/* Lista de Jogos - Estilo Compacto/Linha */}
      <div className="bg-secondary rounded-xl border border-border-custom divide-y divide-border-custom overflow-hidden">
        {matches.map((match) => (
          <div 
            key={match.id}
            className="flex flex-col md:flex-row md:items-center p-3 hover:bg-white/5 transition-colors gap-4"
          >
            {/* Informações da Partida (Esquerda) */}
            <div 
                className="flex items-center gap-4 flex-1 cursor-pointer min-w-0"
                onClick={() => onMatchSelect(match)}
            >
                {/* Tempo */}
                <div className="flex flex-col items-center justify-center w-12 text-xs shrink-0">
                   <span className={`${match.isLive ? 'text-red-500 font-bold animate-pulse' : 'text-text-muted'}`}>
                     {match.time.replace('AO VIVO ', '')}
                   </span>
                   {!match.isLive && <span className="text-[10px] text-text-muted">Hoje</span>}
                </div>
                
                {/* Times */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                   <div className="flex items-center gap-2">
                      <span className="text-sm shrink-0">{match.homeIcon}</span>
                      <span className="text-sm font-medium text-text-primary truncate">{match.homeTeam}</span>
                      {match.isLive && <span className="ml-auto text-xs font-mono text-accent-gold">{match.score?.split(' - ')[0]}</span>}
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-sm shrink-0">{match.awayIcon}</span>
                      <span className="text-sm font-medium text-text-primary truncate">{match.awayTeam}</span>
                      {match.isLive && <span className="ml-auto text-xs font-mono text-accent-gold">{match.score?.split(' - ')[1]}</span>}
                   </div>
                </div>
            </div>

            {/* Odds (Direita) */}
            <div className="flex items-center gap-2 md:w-auto w-full overflow-x-auto scrollbar-hide">
                {selectedMarket === 'winner' && (
                    <div className="flex gap-2 w-full md:w-auto">
                        {[
                            { label: '1', val: match.odds.home, sel: 'Casa' },
                            { label: 'X', val: match.odds.draw, sel: 'Empate' },
                            { label: '2', val: match.odds.away, sel: 'Fora' }
                        ].map((item) => (
                            <button 
                                key={item.sel}
                                onClick={() => handleBetClick(match, item.sel, item.val, 'Vencedor')}
                                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors min-w-[80px] text-sm border ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'bg-accent-gold text-primary border-accent-gold'
                                    : 'bg-primary border-transparent hover:border-gray-600 text-text-muted hover:text-text-primary'
                                }`}
                            >
                                <span className="mr-2">{item.label}</span>
                                <span className={`font-bold ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'text-primary'
                                    : 'text-accent-gold'
                                }`}>{item.val.toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                )}

                {selectedMarket === 'overUnder' && (
                    <div className="flex gap-2 w-full md:w-auto">
                        {[
                            { label: 'Over 2.5', val: match.odds.over25 || 1.5, sel: 'Acima 2.5' },
                            { label: 'Under 2.5', val: match.odds.under25 || 2.5, sel: 'Abaixo 2.5' }
                        ].map((item) => (
                            <button 
                                key={item.sel}
                                onClick={() => handleBetClick(match, item.sel, item.val, 'Gols')}
                                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors min-w-[100px] text-sm border ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'bg-accent-gold text-primary border-accent-gold'
                                    : 'bg-primary border-transparent hover:border-gray-600 text-text-muted hover:text-text-primary'
                                }`}
                            >
                                <span className="mr-2 text-xs">{item.label}</span>
                                <span className={`font-bold ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'text-primary'
                                    : 'text-accent-gold'
                                }`}>{item.val.toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                )}

                {selectedMarket === 'bothScore' && (
                    <div className="flex gap-2 w-full md:w-auto">
                        {[
                            { label: 'Sim', val: match.odds.bothScoreYes || 1.9, sel: 'Sim' },
                            { label: 'Não', val: match.odds.bothScoreNo || 1.9, sel: 'Não' }
                        ].map((item) => (
                            <button 
                                key={item.sel}
                                onClick={() => handleBetClick(match, item.sel, item.val, 'Ambos Marcam')}
                                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors min-w-[80px] text-sm border ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'bg-accent-gold text-primary border-accent-gold'
                                    : 'bg-primary border-transparent hover:border-gray-600 text-text-muted hover:text-text-primary'
                                }`}
                            >
                                <span className="mr-2">{item.label}</span>
                                <span className={`font-bold ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'text-primary'
                                    : 'text-accent-gold'
                                }`}>{item.val.toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                )}

                {selectedMarket === 'doubleChance' && (
                    <div className="flex gap-2 w-full md:w-auto">
                        {[
                            { label: '1X', val: match.odds.doubleChance1X || 1.2, sel: '1X' },
                            { label: '12', val: match.odds.doubleChance12 || 1.2, sel: '12' },
                            { label: 'X2', val: match.odds.doubleChanceX2 || 1.2, sel: 'X2' }
                        ].map((item) => (
                            <button 
                                key={item.sel}
                                onClick={() => handleBetClick(match, item.sel, item.val, 'Chance Dupla')}
                                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors min-w-[70px] text-sm border ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'bg-accent-gold text-primary border-accent-gold'
                                    : 'bg-primary border-transparent hover:border-gray-600 text-text-muted hover:text-text-primary'
                                }`}
                            >
                                <span className="mr-2">{item.label}</span>
                                <span className={`font-bold ${
                                    bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === item.sel)
                                    ? 'text-primary'
                                    : 'text-accent-gold'
                                }`}>{item.val.toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Botão de Estatísticas */}
                <button className="p-2 text-text-muted hover:text-white transition-colors ml-2 hidden md:block">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                   </svg>
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção Múltiplas Populares */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
           </svg>
           <h2 className="text-lg font-bold uppercase text-white tracking-wide">MÚLTIPLAS POPULARES</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="bg-secondary rounded-xl border border-border-custom overflow-hidden flex flex-col">
                <div className="bg-[#1a1d26] p-3 flex justify-between items-center border-b border-border-custom">
                    <h3 className="font-bold text-white">Acumuladores Populares</h3>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">34.26</span>
                </div>
                <div className="p-3 flex-1 flex flex-col gap-3">
                    {[
                        { team: 'Flamengo', market: 'Resultado Final', odds: 2.32, info: 'Fluminense - Flamengo' },
                        { team: 'Corinthians', market: 'Resultado Final', odds: 1.83, info: 'Velo Clube SP - Corinthians' },
                        { team: 'Cruzeiro', market: 'Resultado Final', odds: 2.65, info: 'Atlético-MG - Cruzeiro' },
                        { team: 'Grêmio Novorizontino', market: 'Resultado Final', odds: 1.62, info: 'Grêmio - Botafogo-SP' },
                        { team: 'Vasco da Gama', market: 'Resultado Final', odds: 1.88, info: 'Boavista-RJ - Vasco' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-primary/50 p-2 rounded border border-white/5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                    <span className="font-bold text-sm text-white">{item.team}</span>
                                </div>
                                <span className="text-xs text-text-muted">{item.market}</span>
                                <span className="text-[10px] text-text-muted">{item.info}</span>
                            </div>
                            <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm min-w-[50px] text-center">
                                {item.odds}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 mt-auto border-t border-border-custom">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                        ADICIONAR AO CUPOM <span className="text-accent-gold">» 34.26</span>
                    </button>
                </div>
            </div>

            {/* Column 2 */}
            <div className="bg-secondary rounded-xl border border-border-custom overflow-hidden flex flex-col">
                <div className="bg-[#1a1d26] p-3 flex justify-between items-center border-b border-border-custom">
                    <h3 className="font-bold text-white">Bônus Acumulador</h3>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">+15%</span>
                </div>
                 <div className="p-3 flex-1 flex flex-col gap-3">
                    {[
                        { team: 'SC Braga', market: 'Resultado Final', odds: 1.45, info: 'SC Braga - Alverca' },
                        { team: 'Boca Juniors', market: 'Resultado Final', odds: 1.62, info: 'Boca Juniors - Dep. Riestra' },
                        { team: 'Al-Nassr FC', market: 'Resultado Final', odds: 1.31, info: 'Al-Nassr FC - Al-Taawoun' },
                        { team: 'Argentinos Jrs', market: 'Resultado Final', odds: 1.45, info: 'Argentinos Jrs - Sarmiento' },
                        { team: 'CA Tigre', market: 'Resultado Final', odds: 2.10, info: 'CA Tigre - Estudiantes' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-primary/50 p-2 rounded border border-white/5">
                             <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <span className="font-bold text-sm text-white">{item.team}</span>
                                </div>
                                <span className="text-xs text-text-muted">{item.market}</span>
                                <span className="text-[10px] text-text-muted">{item.info}</span>
                            </div>
                            <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm min-w-[50px] text-center">
                                {item.odds}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 mt-auto border-t border-border-custom">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                        ADICIONAR AO CUPOM <span className="text-accent-gold">» 9.37</span>
                    </button>
                </div>
            </div>

            {/* Column 3 */}
            <div className="bg-secondary rounded-xl border border-border-custom overflow-hidden flex flex-col">
                <div className="bg-[#1a1d26] p-3 flex justify-between items-center border-b border-border-custom">
                    <h3 className="font-bold text-white">Seleções em Alta</h3>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">12.31</span>
                </div>
                 <div className="p-3 flex-1 flex flex-col gap-3">
                    {[
                        { team: 'SC Braga', market: 'Resultado Final', odds: 1.45, info: 'SC Braga - Alverca' },
                        { team: 'Juventude-RS', market: 'Resultado Final', odds: 1.38, info: 'Juventude - Monsoon FC' },
                        { team: 'Sim', market: 'Ambos Marcam', odds: 2.05, info: 'Internacional - Grêmio' },
                        { team: 'Sim', market: 'Ambos Marcam', odds: 2.07, info: 'Santa Cruz - Náutico' },
                        { team: 'Chapecoense', market: 'Resultado Final', odds: 1.45, info: 'Chapecoense - Joinville' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-primary/50 p-2 rounded border border-white/5">
                             <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="font-bold text-sm text-white">{item.team}</span>
                                </div>
                                <span className="text-xs text-text-muted">{item.market}</span>
                                <span className="text-[10px] text-text-muted">{item.info}</span>
                            </div>
                            <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm min-w-[50px] text-center">
                                {item.odds}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 mt-auto border-t border-border-custom">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                        ADICIONAR AO CUPOM <span className="text-accent-gold">» 12.31</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
