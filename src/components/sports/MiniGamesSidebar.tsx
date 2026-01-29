'use client';
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Game {
  id: number;
  name: string;
  image: string;
}

export default function MiniGamesSidebar() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get('/games');
        setGames(res.data.slice(0, 4));
      } catch (error) {
        console.error('Erro ao buscar mini games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading || games.length === 0) return null;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Banner Principal - Estilo "Escolha seus jogos" */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 border border-white/10 p-4 shadow-lg group cursor-pointer">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/20 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">
            ESCOLHA SEUS <br />
            <span className="text-accent-gold">JOGOS FAVORITOS</span>
          </h3>
          <button className="mt-3 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-2">
            JOGAR AGORA <span>→</span>
          </button>
        </div>
        
        {/* Imagem da personagem (simulada) */}
        <div className="absolute bottom-0 right-0 w-20 h-24 text-6xl opacity-90 group-hover:scale-110 transition-transform origin-bottom-right">
          🧙‍♀️
        </div>
      </div>

      {/* Grid de Mini Games */}
      <div className="bg-secondary border border-border-custom rounded-xl p-3">
        <h4 className="text-xs font-bold text-text-muted uppercase mb-3 flex items-center gap-2">
          🔥 Mini Games Populares
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {games.map((game) => (
            <button 
              key={game.id}
              className="relative aspect-square bg-primary rounded-lg border border-border-custom hover:border-accent-primary transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {game.image && game.image.startsWith('http') ? (
                   <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                ) : (
                   game.image || '🎮'
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-[1px] p-1 text-center">
                <span className="text-[10px] font-bold text-white block truncate">{game.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Secundário (Ex: App) */}
      <div className="bg-gradient-to-r from-accent-primary to-purple-600 rounded-xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition-all">
        <div>
          <p className="text-xs font-bold opacity-80">BAIXE O APP</p>
          <p className="font-bold text-sm">Jogue onde quiser 📱</p>
        </div>
        <div className="text-2xl animate-bounce">⬇️</div>
      </div>
    </div>
  );
}
