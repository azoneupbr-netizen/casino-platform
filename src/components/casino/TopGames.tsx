import React, { useRef } from 'react';

const topGames = [
  { id: 1, name: 'Fortune Tiger', provider: 'PG Soft', image: '🐯' },
  { id: 2, name: 'Fortune Rabbit', provider: 'PG Soft', image: '🐰' },
  { id: 3, name: 'Yo Dragon', provider: 'PopOK', image: '🐉' },
  { id: 4, name: 'Fortune Dragon', provider: 'PG Soft', image: '🐲' },
  { id: 5, name: 'Roleta Brasil', provider: 'Evolution', image: '🎡' },
  { id: 6, name: 'Aviator', provider: 'Spribe', image: '✈️' },
  { id: 7, name: 'Mines', provider: 'Spribe', image: '💣' },
  { id: 8, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '🍭' },
  { id: 9, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: '🏛️' },
  { id: 10, name: 'Big Bass Bonanza', provider: 'Pragmatic Play', image: '🐟' },
];

export default function TopGames() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-accent-gold">🔥</span> Top 10 Jogos
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-tertiary flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          >
            ❮
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-tertiary flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          >
            ❯
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {topGames.map((game, index) => (
          <div key={game.id} className="relative min-w-[160px] md:min-w-[180px] pt-4 pl-4 snap-start">
            {/* Large Number Background */}
            <span 
              className="absolute -left-2 top-0 text-[120px] font-black leading-none z-0 select-none pointer-events-none"
              style={{
                WebkitTextStroke: '2px #334155',
                color: 'transparent',
                opacity: 0.5
              }}
            >
              {index + 1}
            </span>

            {/* Game Card */}
            <div className="relative z-10 bg-secondary rounded-xl overflow-hidden border border-border-custom hover:border-accent-gold transition-all cursor-pointer hover:scale-105 hover:shadow-xl group w-full aspect-[3/4]">
               {/* Image Placeholder */}
               <div className="absolute inset-0 bg-tertiary flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {game.image}
               </div>
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

               {/* Content */}
               <div className="absolute bottom-0 left-0 right-0 p-3">
                 <h3 className="text-white font-bold text-sm leading-tight mb-1">{game.name}</h3>
                 <p className="text-[10px] text-accent-gold font-medium">{game.provider}</p>
               </div>

               {/* Play Button Overlay */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-primary text-lg ml-1">▶</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
