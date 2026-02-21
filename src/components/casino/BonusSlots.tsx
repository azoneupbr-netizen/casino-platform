import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '../../services/api';

interface Game {
  id: number;
  name: string;
  image: string;
  provider?: string;
}

export default function BonusSlots() {
  const [bonusSlots, setBonusSlots] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBonusSlots();
  }, []);

  const fetchBonusSlots = async () => {
    try {
      // Fetching games - ideally this would be a specific endpoint like '/games/bonus'
      // For now we'll fetch all games and take the first 12, or filter if possible
      const res = await api.get('/games');
      // Taking first 12 for the slots display
      setBonusSlots(res.data.slice(0, 12));
    } catch (error) {
      console.error('Erro ao buscar slots de bônus:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full mb-12 animate-pulse">
        <div className="h-8 bg-white/10 w-48 mb-6 rounded"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-video bg-white/5 rounded-xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Slots de Bônus
        </h2>
        <button className="bg-[#2A2E3E] hover:bg-[#3A4155] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1">
          {bonusSlots.length} <span className="text-[10px]">❯</span>
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
                {game.image && game.image.startsWith('http') ? (
                  <Image src={game.image} alt={game.name} fill className="object-cover" unoptimized />
                ) : (
                  game.image || '🎰'
                )}
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
