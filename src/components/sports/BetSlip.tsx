'use client';
import React, { useState, useEffect } from 'react';

// SVGs para ícones "Ultra Realistas" (Estilizados)
const GameIcons = {
    aviator: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-lg">
            <path d="M4 32H16L24 12L32 32H44L60 20" stroke="#FF4500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 40H60" stroke="#FBFBFB" strokeWidth="2" strokeOpacity="0.5"/>
            <circle cx="24" cy="12" r="2" fill="white"/>
            <path d="M44 32L60 20L56 44" stroke="#FF4500" strokeWidth="4" strokeLinejoin="round"/>
        </svg>
    ),
    mines: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-lg">
            <circle cx="32" cy="36" r="16" fill="#333" stroke="#FBFBFB" strokeWidth="2"/>
            <path d="M32 20V12M32 12L28 16M32 12L36 16" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
            <path d="M32 12L40 4" stroke="#FFA500" strokeWidth="2" strokeDasharray="2 2"/>
            <circle cx="42" cy="4" r="2" fill="#FF4500"/>
        </svg>
    ),
    spacexy: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-lg">
             <path d="M12 52L52 12" stroke="#8A2BE2" strokeWidth="4" strokeLinecap="round"/>
             <path d="M40 12L52 12L52 24" stroke="#8A2BE2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M16 48L20 44" stroke="#FFF" strokeWidth="2"/>
             <circle cx="52" cy="12" r="3" fill="#FFF"/>
        </svg>
    ),
    penalty: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-lg">
            <circle cx="32" cy="32" r="18" fill="white" stroke="#333" strokeWidth="2"/>
            <path d="M32 14L37 24L48 24L40 32L43 42L32 36L21 42L24 32L16 24L27 24L32 14Z" fill="#333"/>
        </svg>
    )
};

export interface Bet {
  id: string;
  eventName: string;
  betType: string;
  odd: number;
  selection: string; // Ex: "Real Madrid"
}

interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (id: string) => void;
  onClearBets: () => void;
  className?: string;
  onHeaderClick?: () => void;
}

export default function BetSlip({ bets, onRemoveBet, onClearBets, className = '', onHeaderClick }: BetSlipProps) {
  const [activeTab, setActiveTab] = useState<'simples' | 'multipla' | 'sistema'>('simples');
  const [stake, setStake] = useState<number>(10);
  const [oddChanged, setOddChanged] = useState<string | null>(null);

  // Simulação de mudança de odd para efeito visual
  useEffect(() => {
    if (bets.length > 0) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
            setOddChanged('up');
            setTimeout(() => setOddChanged(null), 2000);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bets]);

  useEffect(() => {
    if (bets.length > 1) setActiveTab('multipla');
    else setActiveTab('simples');
  }, [bets.length]);

  return (
    <div className={`bg-secondary border border-border-custom rounded-xl overflow-hidden flex flex-col shadow-2xl transition-colors duration-300 ${className}`}>
      {/* Cabeçalho Vermelho Estilo Print */}
      <div 
        onClick={onHeaderClick}
        className={`bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-between text-white relative shadow-md z-10 ${onHeaderClick ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <span className="font-bold text-sm tracking-wider">BOLETIM DE APOSTAS</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 opacity-70 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>

        <div className="flex items-center gap-2">
            <div className="text-[10px] font-bold uppercase leading-tight text-right">
                Aposta<br/>Rápida
            </div>
            {/* Toggle Switch Simulado */}
            <div className="w-10 h-5 bg-white/30 rounded-full relative cursor-pointer border border-white/40">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#E91E63] text-[10px] font-bold">
                    ⚡
                </div>
            </div>
        </div>
      </div>

      {/* Abas */}
      <div className="bg-tertiary p-1 border-b border-border-custom">
        <div className="flex bg-black/20 rounded-lg p-1">
            {['simples', 'multipla', 'sistema'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                        activeTab === tab 
                        ? 'bg-secondary text-accent-gold shadow-sm border border-border-custom' 
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* Conteúdo - Lista de Apostas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent bg-secondary">
        {bets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center p-8">
                 <div className="mb-6 opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                 </div>
                 
                 <p className="text-text-muted text-sm font-medium mb-8">
                    Nenhuma seleção no boletim de aposta
                 </p>

                 <button className="w-full py-3 px-4 rounded border border-border-custom bg-transparent text-text-muted hover:text-white hover:border-text-muted transition-colors text-sm font-medium">
                    Introduzir código de reserva...
                 </button>
            </div>
        ) : (
            bets.map((bet) => (
                <div key={bet.id} className="bg-[#0B1622] rounded-lg border border-slate-700 p-3 relative group hover:border-slate-600 transition-all">
                    <button 
                        onClick={() => onRemoveBet(bet.id)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-500 transition-colors">
                        ✕
                    </button>
                    
                    <div className="pr-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-1 h-1 bg-[#F5A623] rounded-full"></span>
                            <span className="text-xs text-slate-400 truncate">{bet.eventName}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[#F5A623] font-bold text-sm">{bet.selection}</p>
                                <p className="text-slate-500 text-xs">{bet.betType}</p>
                            </div>
                            <div className={`font-bold text-lg transition-colors ${oddChanged === 'up' ? 'text-green-500' : 'text-white'}`}>
                                {bet.odd.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Input individual se for aba Simples */}
                    {activeTab === 'simples' && (
                        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                            <span className="text-xs text-slate-500">R$</span>
                            <input 
                                type="number" 
                                className="w-full bg-[#101D2C] rounded border border-slate-700 text-right text-white text-sm py-1 px-2 focus:border-[#F5A623] outline-none"
                                placeholder="Valor"
                            />
                        </div>
                    )}
                </div>
            ))
        )}
      </div>

      {/* Footer do Cupom - Valores e Ação */}
      {bets.length > 0 && (
        <div className="bg-primary p-4 border-t border-border-custom space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Odds Totais</span>
                <span className="text-accent-gold font-bold">
                    {activeTab === 'multipla' 
                        ? bets.reduce((acc, bet) => acc * bet.odd, 1).toFixed(2)
                        : '-'}
                </span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Retorno Potencial</span>
                <span className="text-white font-bold">R$ {(stake * bets.reduce((acc, bet) => activeTab === 'multipla' ? acc * bet.odd : acc + bet.odd, activeTab === 'multipla' ? 1 : 0)).toFixed(2)}</span>
            </div>
            <button className="w-full bg-accent-gold hover:bg-yellow-500 text-primary font-bold py-3 rounded-lg shadow-lg transition-all transform active:scale-95">
                APOSTAR
            </button>
        </div>
      )}
    </div>
  );
}
