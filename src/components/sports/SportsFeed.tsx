'use client';
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export interface Match {
  id: number;
  league: string;
  sport?: string; // Field might be present in API
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

import { Bet } from './BetSlip';

interface SportsFeedProps {
  onAddBet: (bet: Omit<Bet, 'id'>) => void;
  onMatchSelect: (match: Match) => void;
  bets?: Bet[];
  selectedSport?: string;
}

export default function SportsFeed({ onAddBet, onMatchSelect, bets = [], selectedSport = 'futebol' }: SportsFeedProps) {
  const [selectedMarket, setSelectedMarket] = useState('winner'); // winner, overUnder, bothScore, doubleChance
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, [selectedSport]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      // Ajuste o endpoint para a rota correta da API
      const res = await api.get('/sports/matches');
      let data = res.data;
      
      // Filter by sport if available in data
      if (selectedSport && selectedSport !== 'todos') {
          // Normalize sport names for comparison if needed
          data = data.filter((m: Match) => {
              if (!m.sport) return true; // If no sport field, show it (or hide it?) - safer to show for now
              return m.sport.toLowerCase() === selectedSport.toLowerCase();
          });
      }
      
      setMatches(data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      // Mantém lista vazia se falhar
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBetClick = (match: Match, selection: string, odd: number, type: string) => {
      const isSelected = bets.some(b => b.eventName === `${match.homeTeam} vs ${match.awayTeam}` && b.selection === selection);
      
      if (!isSelected) {
          onAddBet({
              matchId: match.id,
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
        {loading ? (
            // Skeleton Loader
            [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-3 flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-8 bg-white/5 rounded"></div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="h-4 bg-white/5 rounded w-1/3"></div>
                        <div className="h-4 bg-white/5 rounded w-1/4"></div>
                    </div>
                    <div className="w-1/3 h-8 bg-white/5 rounded"></div>
                </div>
            ))
        ) : matches.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
                Nenhum jogo disponível no momento.
            </div>
        ) : (
            matches.map((match) => (
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
        )))}
      </div>

      {/* Seção Múltiplas Populares */}
      {matches.length >= 6 && (
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
                      <h3 className="font-bold text-white">Tripla do Dia</h3>
                      <span className="bg-accent-gold text-primary text-xs font-bold px-2 py-1 rounded">+10%</span>
                  </div>
                   <div className="p-3 flex-1 flex flex-col gap-3">
                      {matches.slice(0, 3).map((match, i) => (
                          <div key={i} className="flex justify-between items-center bg-primary/50 p-2 rounded border border-white/5">
                               <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                      <span className="font-bold text-sm text-white">{match.homeTeam}</span>
                                  </div>
                                  <span className="text-xs text-text-muted">Vencedor</span>
                                  <span className="text-[10px] text-text-muted">{match.homeTeam} - {match.awayTeam}</span>
                              </div>
                              <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm min-w-[50px] text-center">
                                  {match.odds.home.toFixed(2)}
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="p-3 mt-auto border-t border-border-custom">
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                          ADICIONAR AO CUPOM
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
                      {matches.slice(3, 6).map((match, i) => (
                          <div key={i} className="flex justify-between items-center bg-primary/50 p-2 rounded border border-white/5">
                               <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                      <span className="font-bold text-sm text-white">{match.awayTeam}</span>
                                  </div>
                                  <span className="text-xs text-text-muted">Vencedor</span>
                                  <span className="text-[10px] text-text-muted">{match.homeTeam} - {match.awayTeam}</span>
                              </div>
                              <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm min-w-[50px] text-center">
                                  {match.odds.away.toFixed(2)}
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="p-3 mt-auto border-t border-border-custom">
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                          ADICIONAR AO CUPOM
                      </button>
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
