'use client';
import React from 'react';

const sports = [
  { id: 'futebol', name: 'Futebol', count: 25, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )},
  { id: 'basquete', name: 'Basquete', count: 12, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.57.06-1.12.17-1.66l3.24 3.24c.38.38 1 .38 1.38 0 .39-.39.39-1.02 0-1.41L4.85 8.2c1.07-2.38 3.32-4.11 6.03-4.2v4.5c0 .55.45 1 1 1s1-.45 1-1V4c2.71.09 4.96 1.82 6.03 4.2L14 13.08c-.39.39-.39 1.02 0 1.41.38.38 1.01.38 1.39 0l3.43-3.43c.12.57.18 1.15.18 1.74 0 4.41-3.59 8-8 8z"/>
    </svg>
  )},
  { id: 'tenis', name: 'Tênis', count: 8, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42l-9-9zM12 18.17L5.83 12 12 5.83 18.17 12 12 18.17z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )},
  { id: 'volei', name: 'Vôlei', count: 5, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
  )},
  { id: 'esports', name: 'eSports', count: 42, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  )},
  { id: 'mma', name: 'MMA', count: 3, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M19.42 12.06L18 8.61l.55-1.34c.48-1.16-.06-2.49-1.22-2.97-1.16-.48-2.49.06-2.97 1.22l-.55 1.34-3.44 8.35c-.48 1.16.06 2.49 1.22 2.97 1.16.48 2.49-.06 2.97-1.22l.55-1.34 1.42-3.44c.15-.37.58-.55.95-.39.37.15.55.58.39.95l-1.42 3.44c-.48 1.16.06 2.49 1.22 2.97 1.16.48 2.49-.06 2.97-1.22l.55-1.34 3.44-8.35c.16-.39-.02-.83-.41-.99-.39-.16-.83.02-.99.41l-.23.55zM6.92 8.61l-1.42 3.44c-.16.39.02.83.41.99.39.16.83-.02.99-.41l.23-.55 1.42-3.44c.48-1.16-.06-2.49-1.22-2.97-1.16-.48-2.49.06-2.97 1.22l-.55 1.34-3.44 8.35c-.48 1.16.06 2.49 1.22 2.97 1.16.48 2.49-.06 2.97-1.22l.55-1.34 1.42-3.44c.15-.37.58-.55.95-.39.37.15.55.58.39.95L7.47 7.27l.55-1.34c.48-1.16-.06-2.49-1.22-2.97-1.16-.48-2.49.06-2.97 1.22l-.55 1.34 3.64 3.09z"/>
    </svg>
  )},
  { id: 'hoquei', name: 'Hóquei', count: 7, icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8-8 3.59-8 8z"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  )},
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <h2 className="text-lg md:text-xl font-bold uppercase text-white tracking-wide">
          Jogos de Destaque
        </h2>
      </div>

      {/* Navigation List */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide">
        {sports.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => onSelectSport(sport.id)}
              className="group flex flex-col items-center gap-2 min-w-[70px] relative"
            >
              {/* Badge Count - Dark bubble style */}
              <span className={`absolute -top-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10 transition-colors ${
                  isSelected
                  ? 'bg-secondary text-white border border-white/20'
                  : 'bg-black/40 text-text-muted border border-white/10 group-hover:bg-accent-primary group-hover:text-white'
              }`}>
                {sport.count}
              </span>

              {/* Icon Container - Circle Style */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-[0_0_15px_rgba(233,30,99,0.5)] scale-110' 
                  : 'bg-white/5 text-text-muted opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(233,30,99,0.5)]'
              }`}>
                <div className="w-7 h-7">
                    {React.cloneElement(sport.icon as React.ReactElement, { 
                        className: "w-full h-full" 
                    })}
                </div>
              </div>

              {/* Name - Below icon */}
              <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                isSelected 
                  ? 'text-accent-primary drop-shadow-[0_0_5px_rgba(233,30,99,0.3)]' 
                  : 'text-text-muted group-hover:text-white'
              }`}>
                {sport.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
