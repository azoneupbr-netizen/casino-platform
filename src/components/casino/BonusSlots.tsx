import React from 'react';

const bonusSlots = [
  { id: 1, name: 'Búfalo da Fortuna', image: '🐂' },
  { id: 2, name: 'Charles Raider & The Book of Origins', image: '📖' },
  { id: 3, name: 'J Mania 3 Buffalo', image: '🐃' },
  { id: 4, name: 'Big Bass Bonanza 1000', image: '🐟' },
  { id: 5, name: 'Jewelling Diamonds', image: '💎' },
  { id: 6, name: 'Gates of Olympus', image: '⚡' },
  { id: 7, name: 'Gummy Giga Match', image: '🍬' },
  { id: 8, name: 'Go High Gallina', image: '🐔' },
  { id: 9, name: 'Gates of Olympus Super Scatter', image: '🏛️' },
  { id: 10, name: '4 Pots Riches: Hold and Win', image: '🍀' },
  { id: 11, name: 'Stampede Rush Trident', image: '🔱' },
  { id: 12, name: 'Big Bass Boxing Bonus Round', image: '🥊' },
];

export default function BonusSlots() {
  return (
    <div className="w-full mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Slots de Bônus
        </h2>
        <button className="bg-[#2A2E3E] hover:bg-[#3A4155] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1">
          1358 <span className="text-[10px]">❯</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {bonusSlots.map((game) => (
          <div key={game.id} className="group cursor-pointer">
            {/* Card Image Container */}
            <div className="relative aspect-video bg-[#1A1C24] rounded-xl overflow-hidden border border-transparent group-hover:border-accent-primary transition-all duration-300">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-4xl bg-[#13151b] group-hover:scale-110 transition-transform duration-500">
                {game.image}
              </div>

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 hover:bg-accent-primary hover:border-accent-primary transition-all duration-300">
                  <span className="text-white text-sm ml-0.5">▶</span>
                </div>
              </div>
            </div>

            {/* Game Title */}
            <div className="mt-2">
              <h3 className="text-gray-400 text-[11px] font-medium leading-tight group-hover:text-white transition-colors line-clamp-2">
                {game.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
