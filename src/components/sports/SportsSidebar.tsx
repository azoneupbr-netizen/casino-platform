'use client';
import React, { useState } from 'react';

interface SportsSidebarProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
}

export default function SportsSidebar({ selectedSport, onSelectSport }: SportsSidebarProps) {
  const sports = [
    { name: 'Todos', count: 2500, icon: '🌐', leagues: [], live: 0 },
    { 
      name: 'Futebol', 
      count: 1240, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ), 
      leagues: ['Brasileirão', 'Premier League', 'La Liga', 'Bundesliga', 'Champions League'], 
      live: 999 
    },
    { 
      name: 'Basquete', 
      count: 345, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M5.6 5.6C8 9 13 10 16 10s5-1.3 6.4-3.6"></path>
          <path d="M2.5 10c2.5 0 6.5 1.5 8 5s2 6.5 1.5 9"></path>
        </svg>
      ), 
      leagues: ['NBA', 'NBB', 'EuroLeague'], 
      live: 768 
    },
    { 
      name: 'eSports', 
      count: 89, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <path d="M6 12h4"></path>
          <path d="M8 10v4"></path>
          <circle cx="16" cy="12" r="1"></circle>
        </svg>
      ), 
      leagues: ['CS:GO', 'LoL', 'Dota 2'], 
      live: 161 
    },
    { 
      name: 'Tênis', 
      count: 120, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ), 
      leagues: ['ATP', 'WTA', 'Challenger'], 
      live: 91 
    },
    { 
      name: 'Vôlei', 
      count: 56, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ), 
      leagues: ['Superliga', 'Liga das Nações'], 
      live: 259 
    },
    { 
      name: 'MMA', 
      count: 15, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"></path>
          <path d="M16 16v4"></path>
          <path d="M16 12v-2"></path>
        </svg>
      ), 
      leagues: ['UFC', 'Bellator'], 
      live: 24 
    },
    { 
      name: 'Futebol Americano', 
      count: 32, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c5.5 0 10 2.5 10 8s-4.5 8-10 8S2 15.5 2 10s4.5-8 10-8z"></path>
          <path d="M12 2v16"></path>
          <path d="M7 6l10 10"></path>
          <path d="M17 6L7 16"></path>
        </svg>
      ), 
      leagues: ['NFL', 'NCAA'], 
      live: 20 
    },
    { 
      name: 'Futsal', 
      count: 22, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ), 
      leagues: [], 
      live: 0 
    },
    { 
      name: 'Hóquei', 
      count: 354, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16"></path>
          <path d="M10 22V6a4 4 0 0 1 4-4"></path>
          <path d="M10 10h6"></path>
        </svg>
      ), 
      leagues: ['NHL'], 
      live: 0 
    },
    { 
      name: 'Beisebol', 
      count: 100, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 8a6 6 0 0 0 8 8"></path>
          <path d="M8 16a6 6 0 0 0 8-8"></path>
        </svg>
      ), 
      leagues: ['MLB'], 
      live: 0 
    },
  ];

  return (
    <div className="w-full min-h-full flex flex-col bg-secondary pb-4">
      {/* Busca */}
      <div className="p-4 pb-2">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Buscar ligas..." 
            className="w-full bg-primary border border-border-custom rounded-lg py-2.5 pl-9 pr-4 text-sm text-text-primary placeholder-text-muted focus:border-accent-gold outline-none transition-all shadow-sm group-hover:border-text-secondary"
          />
          <span className="absolute left-3 top-2.5 text-text-muted group-hover:text-text-secondary transition-colors">🔍</span>
        </div>
      </div>

      {/* Lista de Esportes */}
      <div className="flex-1 px-2 space-y-0.5">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 mt-2 px-3">
          Principais Esportes
        </h3>
        
        {sports.map((sport) => (
          <div key={sport.name}>
            <button
              onClick={() => onSelectSport(sport.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all group border border-transparent ${
                selectedSport === sport.name 
                  ? 'bg-tertiary border-border-custom shadow-sm' 
                  : 'hover:bg-tertiary/50 hover:pl-4'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg transition-transform ${selectedSport === sport.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {sport.icon}
                </span>
                <span className={`text-sm font-medium ${selectedSport === sport.name ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                  {sport.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {sport.live > 0 && (
                  <div className="flex items-center gap-1 bg-red-600/10 border border-red-600/20 px-1.5 py-0.5 rounded text-[9px] font-bold text-red-500 animate-pulse">
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                    AO VIVO
                  </div>
                )}
                <span className={`text-xs ${selectedSport === sport.name ? 'text-accent-gold' : 'text-text-muted'}`}>
                  {sport.live > 0 ? sport.live : sport.count}
                </span>
              </div>
            </button>

            {/* Sub-menu de Ligas (Expansão) */}
            {selectedSport === sport.name && sport.leagues.length > 0 && (
              <div className="ml-4 pl-4 border-l border-border-custom/50 my-1 space-y-0.5">
                {sport.leagues.map((league) => (
                  <button 
                    key={league}
                    className="w-full text-left text-xs text-text-secondary hover:text-accent-gold py-1.5 px-2 rounded hover:bg-white/5 transition-all flex items-center justify-between group/league"
                  >
                    {league}
                    <span className="opacity-0 group-hover/league:opacity-100 text-accent-gold text-[10px] translate-x-[-5px] group-hover/league:translate-x-0 transition-all">➜</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Banner Promocional (Estilo Betano) */}
      <div className="mx-3 mt-6 mb-2">
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg p-4 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-orange-500/20 transition-all hover:scale-[1.02]">
          {/* Efeito de brilho */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
          
          <p className="font-extrabold text-sm uppercase tracking-wide drop-shadow-md mb-1">
            Bônus de<br/>Boas-vindas
          </p>
          <p className="text-xs font-medium text-white/90 mb-3 leading-tight">
            100% até R$ 500<br/>no primeiro depósito!
          </p>
          <button className="bg-black/90 text-accent-gold text-xs font-bold px-4 py-2 rounded uppercase tracking-wider w-full hover:bg-black transition-colors shadow-md border border-accent-gold/20">
            PEGAR BÔNUS
          </button>
        </div>
      </div>
    </div>
  );
}