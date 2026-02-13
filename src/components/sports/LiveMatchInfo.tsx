'use client';
import React from 'react';
import { Match } from './SportsFeed';

interface LiveMatchInfoProps {
  match: Match | null;
  onClose: () => void;
}

export default function LiveMatchInfo({ match, onClose }: LiveMatchInfoProps) {
  if (!match) return null;

  return (
    <div className="bg-secondary border border-border-custom rounded-xl overflow-hidden flex flex-col h-full animate-fade-in">
      {/* Header com Botão Fechar */}
      <div className="bg-primary p-3 flex items-center justify-between border-b border-border-custom">
        <div className="flex items-center gap-2">
          {match.isLive && (
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
          <h3 className="text-sm font-bold text-text-primary truncate max-w-[200px]">
            {match.homeTeam} vs {match.awayTeam}
          </h3>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-white">✕</button>
      </div>

      {/* Área de "Transmissão" (Simulada) */}
      <div className="aspect-video bg-black relative group cursor-pointer">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="text-4xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">📺</span>
            <p className="text-text-muted text-xs font-bold group-hover:text-accent-primary transition-colors">
                TRANSMISSÃO AO VIVO
            </p>
            <p className="text-text-muted text-[10px] mt-1">
                Disponível para usuários logados
            </p>
        </div>
        
        {/* Placar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 flex justify-between items-center text-white text-xs">
            <span>{match.homeTeam}</span>
            <span className="font-mono font-bold text-accent-gold">
              {match.score || '0 - 0'}
            </span>
            <span>{match.awayTeam}</span>
        </div>
      </div>

      {/* Estatísticas Rápidas - Hidden if no data */}
      {/* 
      <div className="p-3 grid grid-cols-3 gap-2 border-b border-border-custom bg-tertiary/30">
        <div className="text-center">
            <p className="text-[10px] text-text-muted">Ataques</p>
            <p className="font-bold text-text-primary text-xs">--</p>
        </div>
        <div className="text-center border-x border-border-custom">
            <p className="text-[10px] text-text-muted">Posse</p>
            <p className="font-bold text-text-primary text-xs">--</p>
        </div>
        <div className="text-center">
            <p className="text-[10px] text-text-muted">Chutes</p>
            <p className="font-bold text-text-primary text-xs">--</p>
        </div>
      </div>
      */}

      {/* Mercados Expandidos (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-border-custom">
        {/* Mercado: Vencedor */}
        {match.odds && (
        <div>
            <h4 className="text-xs font-bold text-text-muted mb-2 uppercase">Resultado Final</h4>
            <div className="grid grid-cols-3 gap-1">
                <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors">
                    <span className="block text-[10px] text-text-muted">1</span>
                    <span className="block font-bold text-accent-gold">{match.odds.home.toFixed(2)}</span>
                </button>
                <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors">
                    <span className="block text-[10px] text-text-muted">X</span>
                    <span className="block font-bold text-accent-gold">{match.odds.draw.toFixed(2)}</span>
                </button>
                <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors">
                    <span className="block text-[10px] text-text-muted">2</span>
                    <span className="block font-bold text-accent-gold">{match.odds.away.toFixed(2)}</span>
                </button>
            </div>
        </div>
        )}

        {/* Mercado: Total de Gols */}
        {match.odds?.over25 && match.odds?.under25 && (
        <div>
            <h4 className="text-xs font-bold text-text-muted mb-2 uppercase">Total de Gols (2.5)</h4>
            <div className="grid grid-cols-2 gap-1">
                <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors flex justify-between px-3">
                    <span className="text-xs text-text-secondary">Mais de</span>
                    <span className="font-bold text-accent-gold">{match.odds.over25.toFixed(2)}</span>
                </button>
                <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors flex justify-between px-3">
                    <span className="text-xs text-text-secondary">Menos de</span>
                    <span className="font-bold text-accent-gold">{match.odds.under25.toFixed(2)}</span>
                </button>
            </div>
        </div>
        )}
        
        {/* Mercado: Ambas Marcam */}
        {match.odds?.bothScoreYes && match.odds?.bothScoreNo && (
        <div>
             <h4 className="text-xs font-bold text-text-muted mb-2 uppercase">Ambos Marcam</h4>
             <div className="grid grid-cols-2 gap-1">
                 <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors flex justify-between px-3">
                     <span className="text-xs text-text-secondary">Sim</span>
                     <span className="font-bold text-accent-gold">{match.odds.bothScoreYes.toFixed(2)}</span>
                 </button>
                 <button className="bg-primary hover:bg-tertiary p-2 rounded text-center border border-border-custom transition-colors flex justify-between px-3">
                     <span className="text-xs text-text-secondary">Não</span>
                     <span className="font-bold text-accent-gold">{match.odds.bothScoreNo.toFixed(2)}</span>
                 </button>
             </div>
        </div>
        )}
      </div>
    </div>
  );
}
