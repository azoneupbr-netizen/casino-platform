'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedBanner from './AnimatedBanner';

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const [hoveredSport, setHoveredSport] = useState<string | null>(null);

  const sportsMenu = [
    { 
      icon: '⚽', 
      name: 'Futebol', 
      count: 1247,
      leagues: [
        { name: 'Brasil - Campeonato Paulista', icon: '🇧🇷' },
        { name: 'Brasil - Campeonato Carioca', icon: '🇧🇷' },
        { name: 'Liga dos Campeões', icon: '🇪🇺' },
        { name: 'Inglaterra - Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        { name: 'Espanha - La Liga', icon: '🇪🇸' },
        { name: 'Alemanha - Bundesliga', icon: '🇩🇪' },
        { name: 'Itália - Série A', icon: '🇮🇹' },
      ]
    },
    { 
      icon: '🏀', 
      name: 'Basquete', 
      count: 342,
      leagues: [
        { name: 'NBA', icon: '🇺🇸' },
        { name: 'NBB', icon: '🇧🇷' },
        { name: 'EuroLeague', icon: '🇪🇺' },
      ]
    },
    { 
      icon: '🎾', 
      name: 'Tênis', 
      count: 189,
      leagues: [
        { name: 'ATP Tour', icon: '🎾' },
        { name: 'WTA Tour', icon: '🎾' },
        { name: 'Australian Open', icon: '🇦🇺' },
      ]
    },
    { 
      icon: '🏐', 
      name: 'Vôlei', 
      count: 87,
      leagues: [
        { name: 'Superliga Masculina', icon: '🇧🇷' },
        { name: 'Superliga Feminina', icon: '🇧🇷' },
        { name: 'Liga das Nações', icon: '🌍' },
      ]
    },
    { 
      icon: '🏈', 
      name: 'Futebol Americano', 
      count: 156,
      leagues: [
        { name: 'NFL', icon: '🇺🇸' },
        { name: 'NCAA', icon: '🇺🇸' },
      ]
    },
    { 
      icon: '🏒', 
      name: 'Hóquei', 
      count: 94,
      leagues: [
        { name: 'NHL', icon: '🇺🇸' },
      ]
    },
    { 
      icon: '🥊', 
      name: 'Boxe/MMA', 
      count: 45,
      leagues: [
        { name: 'UFC', icon: '🥊' },
        { name: 'Bellator', icon: '🥊' },
      ]
    },
    { 
      icon: '🏎️', 
      name: 'Automobilismo', 
      count: 23,
      leagues: [
        { name: 'Fórmula 1', icon: '🏎️' },
        { name: 'Stock Car', icon: '🇧🇷' },
      ]
    },
  ];

  const casinoMenu = [
    { icon: '🎰', name: 'Slots', count: 2500 },
    { icon: '🃏', name: 'Cassino ao Vivo', count: 87 },
    { icon: '🎲', name: 'Roleta', count: 34 },
    { icon: '♠️', name: 'Blackjack', count: 28 },
    { icon: '🎯', name: 'Crash Games', count: 15 },
  ];

  if (pathname?.startsWith('/account')) {
    return null;
  }

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

      {/* Seção de Recompensas */}
      <div className="py-2 mb-2">
         <Link
            href="/rewards"
            className="flex items-center gap-3 px-4 py-3 bg-accent-primary/5 hover:bg-accent-primary/10 border-l-4 border-transparent hover:border-accent-primary transition-all group"
            title={!isExpanded ? 'Benefícios' : ''}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform min-w-[2rem] text-center text-accent-primary">
              🎁
            </span>
            {isExpanded && (
              <span className="text-sm font-bold text-accent-primary flex-1 whitespace-nowrap">
                Benefícios & Bônus
              </span>
            )}
          </Link>
      </div>

      <div className="border-t border-border-custom my-2"></div>

      {/* Seção de Esportes */}
      <div className="py-4">
        {isExpanded && (
          <h3 className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
            Esportes
          </h3>
        )}
        {sportsMenu.map((item, index) => (
          <div 
            key={index}
            onMouseEnter={() => setHoveredSport(item.name)}
            onMouseLeave={() => setHoveredSport(null)}
          >
            <Link
              href="/sports"
              className={`flex items-center gap-3 px-4 py-3 hover:bg-tertiary hover:border-l-4 hover:border-accent-primary transition-all group ${
                hoveredSport === item.name ? 'bg-tertiary border-l-4 border-accent-primary' : ''
              }`}
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
            </Link>
            
            {/* Submenu de Ligas em Destaque */}
            {isExpanded && hoveredSport === item.name && item.leagues && (
              <div className="bg-[#15171e] animate-fade-in border-l border-gray-800 ml-4 mb-2">
                <div className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                  <span className="w-1 h-4 bg-[#ccff00] rounded-full"></span>
                  Ligas em Destaque
                </div>
                {item.leagues.map((league, idx) => (
                  <Link
                    key={idx}
                    href={`/sports?league=${encodeURIComponent(league.name)}`}
                    className="flex items-center gap-3 px-6 py-2 hover:bg-white/5 transition-colors text-sm text-gray-400 hover:text-white"
                  >
                    <span className="text-lg">{league.icon}</span>
                    <span className="truncate">{league.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
          <Link
            key={index}
            href="/casino"
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
          </Link>
        ))}
      </div>
    </aside>
  );
}