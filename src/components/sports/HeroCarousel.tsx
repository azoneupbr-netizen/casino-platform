'use client';
import React from 'react';

const carouselItems = [
  {
    id: 1,
    homeTeam: 'Manchester City',
    awayTeam: 'Wolverhampton',
    time: 'Hoje 12:00',
    market: 'Resultado Final / Ambas equipes Marcam',
    selection: 'Manchester City / Sim',
    odd: 2.75,
    bgGradient: 'from-red-600 to-red-900',
    image: '/images/match1.jpg' // Placeholder
  },
  {
    id: 2,
    homeTeam: 'AFC Bournemouth',
    awayTeam: 'Liverpool',
    time: 'Hoje 14:30',
    market: 'Super Odds Turbinadas',
    selection: 'Resultado Final: Liverpool & Ambas equipes Marcam: Sim',
    odd: 3.90,
    oldOdd: 3.40,
    bgGradient: 'from-orange-600 to-red-800',
    image: '/images/match2.jpg'
  },
  {
    id: 3,
    homeTeam: 'Villarreal CF',
    awayTeam: 'Real Madrid',
    time: 'Hoje 17:00',
    market: 'Super Odds Turbinadas',
    selection: 'Resultado Final: Real Madrid & Marcar em qualquer momento: Kylian Mbappe',
    odd: 3.00,
    oldOdd: 2.40,
    bgGradient: 'from-orange-500 to-orange-800',
    image: '/images/match3.jpg'
  },
  {
    id: 4,
    homeTeam: 'Bayern de Munique',
    awayTeam: 'Augsburg',
    time: 'Hoje 11:30',
    market: 'Ambas equipes Marcam e Total de gols',
    selection: 'Sim e Mais de 2.5',
    odd: 1.98,
    bgGradient: 'from-red-500 to-red-800',
    image: '/images/match4.jpg'
  }
];

const featureItems = [
  { id: 1, title: 'Betano no BBB', subtitle: 'Patrocinadora da casa mais vigiada', icon: '👁️', color: 'bg-black' },
  { id: 2, title: 'ATÉ R$20 MIL', subtitle: 'Cashback em dinheiro!', icon: '💰', color: 'bg-orange-600' },
  { id: 3, title: 'Mamão com Açúcar', subtitle: 'A melhor odd do mercado', icon: '🍈', color: 'bg-orange-500' },
  { id: 4, title: 'Mamão com Pimenta', subtitle: 'A melhor odd picante', icon: '🌶️', color: 'bg-red-600' },
  { id: 5, title: 'R$100 mil em fichas', subtitle: 'Torneio exclusivo', icon: '🎰', color: 'bg-purple-600' },
  { id: 6, title: 'Rodadas grátis a todos', subtitle: 'Promoção diária', icon: '🎁', color: 'bg-orange-400' },
  { id: 7, title: 'R$250 mil em prêmios!', subtitle: 'Sorteio semanal', icon: '🏆', color: 'bg-yellow-600' },
  { id: 8, title: 'Criar Aposta Turbinada', subtitle: 'Crie sua aposta personalizada', icon: '⚡', color: 'bg-gray-800' },
];

export default function HeroCarousel() {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Feature Row */}
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
        {featureItems.map((item) => (
          <button 
            key={item.id}
            className={`min-w-[140px] h-[80px] rounded-xl p-3 flex flex-col justify-between relative overflow-hidden ${item.color} text-white shadow-md hover:brightness-110 transition-all group shrink-0`}
          >
            <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-opacity text-3xl transform translate-x-1 -translate-y-1">
              {item.icon}
            </div>
            
            <div className="relative z-10">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
              <div className="text-[10px] font-bold leading-tight line-clamp-2">{item.title}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Carousel */}
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
        {carouselItems.map((item) => (
          <div 
            key={item.id}
            className={`min-w-[300px] md:min-w-[400px] h-[200px] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${item.bgGradient} text-white shadow-lg snap-start shrink-0 hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Background Pattern/Image Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold opacity-90 mb-2">
                <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">📊</span>
                <span>{item.time}</span>
              </div>
              
              <h3 className="text-xl font-bold leading-tight mb-4">
                {item.homeTeam} <br />
                {item.awayTeam}
              </h3>
              
              <div className="text-xs opacity-90 mb-1 line-clamp-1">{item.market}</div>
            </div>

            <div className="relative z-10 bg-white rounded-lg p-2 flex items-center justify-between text-black">
              <div className="flex-1 pr-2">
                <span className="text-xs font-bold line-clamp-1 block mb-1">{item.selection}</span>
                <button className="w-full bg-accent-primary text-white text-xs font-bold py-1 px-2 rounded hover:bg-opacity-90 transition-colors uppercase">
                  Apostar Agora
                </button>
              </div>
              <div className="flex items-center gap-2">
                {item.oldOdd && (
                  <span className="text-xs text-gray-400 line-through decoration-red-500">{item.oldOdd.toFixed(2)}</span>
                )}
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded">{item.odd.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
