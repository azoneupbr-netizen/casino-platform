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
        <div className="flex min-w-full px-2 gap-2">
          {sports.map((sport) => {
            const isSelected = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => onSelectSport(sport.id)}
                className={`group flex-1 flex flex-col items-center justify-center gap-2 p-3 min-w-[100px] rounded-xl transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-gray-800 to-black border border-accent-gold shadow-lg shadow-accent-gold/20'
                    : 'bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-gray-700'
                }`}
              >
                {/* Icon - Emoji for realism */}
                <div className={`text-3xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {sport.icon}
                </div>

                {/* Name - Prominent */}
                <span className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                  isSelected 
                    ? 'text-accent-gold' 
                    : 'text-gray-400 group-hover:text-white'
                }`}>
                  {sport.name}
                </span>
                
                {/* Active Indicator */}
                {isSelected && (
                  <div className="absolute -bottom-1 w-1/3 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
