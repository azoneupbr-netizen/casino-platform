'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroBanner from './HeroBanner';
import { api } from '../../services/api';

// --- OTIMIZAÇÃO MOBILE: LAZY LOADING ---
// Carrega componentes pesados apenas quando necessário para reduzir o bundle inicial.
// O 'ssr: false' indica que não precisamos renderizar isso no servidor inicialmente, melhorando o TTFB.
const TopGames = dynamic(() => import('./TopGames'), {
  loading: () => (
    <div className="w-full mb-12">
      <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-6"></div>
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[160px] aspect-[3/4] bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
        ))}
      </div>
    </div>
  ),
  ssr: false 
});

const BonusSlots = dynamic(() => import('./BonusSlots'), {
  loading: () => <div className="h-64 w-full bg-white/5 animate-pulse rounded-xl mb-12" />,
  ssr: false
});

interface Game {
  id: number;
  name: string;
  provider: string;
  category: string;
  jackpot: boolean;
  image: string;
}

export default function CasinoPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProvider, setSelectedProvider] = useState('Todos');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Todos', 'Populares', 'Novos', 'Jackpot', 'Megaways', 'Clássicos'];
  
  const providers = [
    'Todos',
    'Pragmatic Play',
    'Evolution',
    'NetEnt',
    'Play\'n GO',
    'Microgaming',
    'Hacksaw Gaming',
    'Relax Gaming',
    'Push Gaming',
  ];

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await api.get('/games'); 
      setGames(res.data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'Todos' || game.category === selectedCategory;
    const matchesProvider = selectedProvider === 'Todos' || game.provider === selectedProvider;
    return matchesCategory && matchesProvider;
  });

  return (
    <div className="w-full px-4 pb-8 pt-4 md:pt-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Rotativo */}
        <HeroBanner />

        {/* Top Games - Carregado via Lazy Loading */}
        <div className="mb-8 min-h-[300px]">
            <TopGames />
        </div>

        {/* Header Section */}
        <div className="mb-6 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">🎰 Cassino</h1>
          <p className="text-sm md:text-base text-text-secondary">Mais de 2.500 jogos dos melhores provedores do mundo</p>
        </div>

        {/* --- OTIMIZAÇÃO MOBILE: FILTROS COM SCROLL HORIZONTAL --- */}
        {/* Em vez de quebrar linhas (wrap), usamos scroll horizontal para economizar espaço vertical */}
        
        {/* Filtros - Categorias */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
             <h3 className="text-sm font-bold text-text-muted uppercase">Categorias</h3>
             <span className="text-xs text-text-muted md:hidden">Deslize →</span>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-accent-gold text-primary shadow-lg shadow-accent-gold/20'
                    : 'bg-secondary text-text-secondary hover:bg-tertiary border border-border-custom'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros - Provedores */}
        <div className="mb-8">
           <div className="flex items-center justify-between mb-3">
             <h3 className="text-sm font-bold text-text-muted uppercase">Provedores</h3>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x">
            {providers.map((prov) => (
              <button
                key={prov}
                onClick={() => setSelectedProvider(prov)}
                className={`whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                  selectedProvider === prov
                    ? 'bg-accent-gold text-primary shadow-lg shadow-accent-gold/20'
                    : 'bg-secondary text-text-secondary hover:bg-tertiary border border-border-custom'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Jogos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {loading ? (
             Array.from({ length: 10 }).map((_, i) => (
               <div key={i} className="aspect-[3/4] bg-white/5 rounded-xl animate-pulse border border-white/5" />
             ))
          ) : filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div 
                key={game.id} 
                className="group relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden border border-border-custom hover:border-accent-gold transition-all active:scale-95 md:hover:scale-105 md:hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
                
                <Image 
                  src={game.image || '/placeholder-game.png'} 
                  alt={game.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />

                <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
                  {game.jackpot && (
                    <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-bold rounded uppercase shadow-lg">
                      Jackpot
                    </span>
                  )}
                  {game.category === 'Novos' && (
                    <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded uppercase shadow-lg">
                      Novo
                    </span>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 z-20 translate-y-1 group-hover:translate-y-0 transition-transform">
                  <p className="text-xs text-text-muted mb-0.5 truncate">{game.provider}</p>
                  <h3 className="text-sm font-bold text-white truncate leading-tight">{game.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-text-muted">
              <p className="text-lg">Nenhum jogo encontrado.</p>
              <button 
                onClick={() => { setSelectedCategory('Todos'); setSelectedProvider('Todos'); }}
                className="mt-4 text-accent-gold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
