'use client';
import React, { useState } from 'react';
import AnimatedBanner from './AnimatedBanner';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const sportsMenu = [
    { icon: '⚽', name: 'Futebol', count: 1247 },
    { icon: '🏀', name: 'Basquete', count: 342 },
    { icon: '🎾', name: 'Tênis', count: 189 },
    { icon: '🏐', name: 'Vôlei', count: 87 },
    { icon: '🏈', name: 'Futebol Americano', count: 156 },
    { icon: '🏒', name: 'Hóquei', count: 94 },
    { icon: '🥊', name: 'Boxe/MMA', count: 45 },
    { icon: '🏎️', name: 'Automobilismo', count: 23 },
  ];

  const casinoMenu = [
    { icon: '🎰', name: 'Slots', count: 2500 },
    { icon: '🃏', name: 'Cassino ao Vivo', count: 87 },
    { icon: '🎲', name: 'Roleta', count: 34 },
    { icon: '♠️', name: 'Blackjack', count: 28 },
    { icon: '🎯', name: 'Crash Games', count: 15 },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`hidden md:block sticky top-20 h-[calc(100vh-5rem)] bg-secondary border-r border-border-custom transition-all duration-300 z-40 overflow-y-auto scrollbar-hide shrink-0 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {isExpanded && <AnimatedBanner variant="sidebar" />}

      {/* Seção de Esportes */}
      <div className="py-4">
        {isExpanded && (
          <h3 className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
            Esportes
          </h3>
        )}
        {sportsMenu.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-tertiary hover:border-l-4 hover:border-accent-primary transition-all group"
            title={!isExpanded ? item.name : ''}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform min-w-[2rem] text-center text-text-muted group-hover:text-accent-primary">
              {item.icon}
            </span>
            {isExpanded && (
              <>
                <span className="text-sm text-text-secondary group-hover:text-text-primary flex-1 whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-xs text-text-muted group-hover:text-accent-primary">
                  {item.count}
                </span>
              </>
            )}
          </a>
        ))}
      </div>

      {/* Divisor */}
      <div className="border-t border-border-custom my-2"></div>

      {/* Seção de Cassino */}
      <div className="py-4">
        {isExpanded && (
          <h3 className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
            Cassino
          </h3>
        )}
        {casinoMenu.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-tertiary hover:border-l-4 hover:border-accent-primary transition-all group"
            title={!isExpanded ? item.name : ''}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform min-w-[2rem] text-center text-text-muted group-hover:text-accent-primary">
              {item.icon}
            </span>
            {isExpanded && (
              <>
                <span className="text-sm text-text-secondary group-hover:text-text-primary flex-1 whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-xs text-text-muted group-hover:text-accent-primary">
                  {item.count}
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </aside>
  );
}