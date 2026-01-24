'use client';
import React, { useState } from 'react';
import SportsFeed, { Match } from './SportsFeed';
import BetSlip, { Bet } from './BetSlip';
import SportsCategoryNav from './SportsCategoryNav';
import MiniGamesSidebar from './MiniGamesSidebar';
import LiveMatchInfo from './LiveMatchInfo';

import HeroCarousel from './HeroCarousel';
import AnimatedBanner from '../layout/AnimatedBanner';

export default function SportsPage() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [rightSidebarMode, setRightSidebarMode] = useState<'betslip' | 'matchInfo'>('betslip');
  const [selectedSport, setSelectedSport] = useState('futebol');
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  const handleAddBet = (bet: Omit<Bet, 'id'>) => {
    const newBet = { ...bet, id: Math.random().toString(36).substr(2, 9) };
    setBets([...bets, newBet]);
    if (rightSidebarMode !== 'betslip') {
        // Opcional: Voltar para o betslip ao adicionar aposta?
        // setRightSidebarMode('betslip');
    }
  };

  const handleRemoveBet = (id: string) => {
    setBets(bets.filter((b) => b.id !== id));
  };

  const handleClearBets = () => {
    setBets([]);
  };

  const handleMatchSelect = (match: Match) => {
      setSelectedMatch(match);
      setRightSidebarMode('matchInfo');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-primary text-text-primary">
      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden min-w-0">
        <HeroCarousel />
        <SportsCategoryNav selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        <AnimatedBanner />
        <SportsFeed onAddBet={handleAddBet} onMatchSelect={handleMatchSelect} bets={bets} />
      </main>

      {/* Sidebar Direita (Cupom / Detalhes / Mini Games) */}
      <aside className="hidden lg:flex flex-col w-80 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-l border-border-custom bg-secondary p-4 gap-4 z-30 shrink-0">
        
        {/* Renderização Condicional da Sidebar Direita */}
        {rightSidebarMode === 'matchInfo' && selectedMatch ? (
            <>
                {/* Botão para voltar ao Cupom */}
                <button 
                    onClick={() => setRightSidebarMode('betslip')}
                    className="flex items-center gap-2 text-text-secondary hover:text-accent-gold transition-colors text-sm font-bold mb-2"
                >
                    ← Voltar para Cupom
                </button>

                <div className="bg-secondary rounded-lg overflow-hidden border border-border-custom shadow-lg">
                     <LiveMatchInfo match={selectedMatch} onClose={() => setRightSidebarMode('betslip')} />
                </div>
                
                {/* Mini Games aparecem abaixo dos detalhes da partida */}
                <MiniGamesSidebar />
            </>
        ) : (
            // Modo Cupom (Padrão)
            <BetSlip 
                bets={bets} 
                onRemoveBet={handleRemoveBet} 
                onClearBets={handleClearBets} 
                className="h-[calc(100vh-120px)] sticky top-24"
            />
        )}

      </aside>

      {/* Mobile BetSlip Toggle (Sliding Bottom Sheet) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isBetSlipOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.8rem)]'}`}>
        <div className="h-[75vh] shadow-[0_-4px_30px_rgba(0,0,0,0.8)]">
            <BetSlip 
                bets={bets} 
                onRemoveBet={handleRemoveBet} 
                onClearBets={handleClearBets}
                className="h-full rounded-b-none border-x-0 border-b-0"
                onHeaderClick={() => setIsBetSlipOpen(!isBetSlipOpen)}
                isOpen={isBetSlipOpen}
            />
        </div>
      </div>
    </div>
  );
}