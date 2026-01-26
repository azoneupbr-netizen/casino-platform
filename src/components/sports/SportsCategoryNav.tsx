'use client';
import React from 'react';

const sports = [
  { id: 'futebol', name: 'Futebol', icon: '⚽' },
  { id: 'basquete', name: 'Basquete', icon: '🏀' },
  { id: 'tenis', name: 'Tênis', icon: '🎾' },
  { id: 'esports', name: 'eSports', icon: '🎮' },
  { id: 'volei', name: 'Vôlei', icon: '🏐' },
  { id: 'futebol-americano', name: 'Fut. Americano', icon: '🏈' },
  { id: 'beisebol', name: 'Beisebol', icon: '⚾' },
  { id: 'hoquei', name: 'Hóquei', icon: '🏒' },
  { id: 'tenis-mesa', name: 'Tênis de Mesa', icon: '🏓' },
  { id: 'polo', name: 'Pólo Aquático', icon: '🤽' },
  { id: 'handebol', name: 'Handebol', icon: '🤾' },
  { id: 'futsal', name: 'Futsal', icon: '⚽' },
  { id: 'sinuca', name: 'Sinuca', icon: '🎱' },
];

interface SportsCategoryNavProps {
  selectedSport: string;
  onSelectSport: (id: string) => void;
}

export default function SportsCategoryNav({ selectedSport, onSelectSport }: SportsCategoryNavProps) {
  return (
    <div className="w-full mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-xl">🔴</span>
        <h2 className="text-lg font-bold uppercase text-white tracking-wide">
          Esportes Ao Vivo
        </h2>
      </div>

      {/* Navigation List */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex min-w-full px-2 gap-1">
          {sports.map((sport) => {
            const isSelected = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => onSelectSport(sport.id)}
                className="group flex-1 flex flex-col items-center justify-center gap-1 py-2 min-w-[70px] transition-all duration-300 relative"
              >
                {/* Icon - Realistic Emoji, Dimmed by default */}
                <div className={`text-2xl transition-all duration-300 filter ${
                  isSelected 
                    ? 'opacity-100 grayscale-0 scale-110' 
                    : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110'
                }`}>
                  {sport.icon}
                </div>

                {/* Name - Smaller, prominent */}
                <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  isSelected 
                    ? 'text-accent-gold' 
                    : 'text-text-muted group-hover:text-white'
                }`}>
                  {sport.name}
                </span>
                
                {/* Active Indicator - Subtle glow */}
                {isSelected && (
                  <div className="absolute bottom-0 w-8 h-0.5 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
