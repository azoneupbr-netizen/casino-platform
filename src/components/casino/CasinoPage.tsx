'use client';
import React, { useState, useEffect } from 'react';
import HeroBanner from './HeroBanner';
import TopGames from './TopGames';
import BonusSlots from './BonusSlots';
import { api } from '../../services/api';

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
      const res = await api.get('/games'); // Ajuste o endpoint conforme necessário
      setGames(res.data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      // Fallback para array vazio
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
    <div className="w-full px-4 pb-16 pt-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Rotativo */}
        <HeroBanner />

        {/* Header - Título e Subtítulo Restaurados */}
        <div className="mb-6 mt-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">🎰 Cassino</h1>
          <p className="text-text-secondary">Mais de 2.500 jogos dos melhores provedores do mundo</p>
        </div>

        {/* Filtros - Categorias */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text-muted uppercase mb-3">Categorias</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent-gold text-primary'
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
          <h3 className="text-sm font-bold text-text-muted uppercase mb-3">Provedores</h3>
          <div className="flex flex-wrap gap-2">
            {providers.map((prov) => (
              <button
                key={prov}
                onClick={() => setSelectedProvider(prov)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedProvider === prov
                    ? 'bg-accent-gold text-primary'
                    : 'bg-secondary text-text-secondary hover:bg-tertiary border border-border-custom'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* Top 10 Jogos */}
        <TopGames />

        {/* Bonus Slots Section */}
        <BonusSlots />

        {/* Título Slots */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-accent-primary text-xl">📍</span>
          <h2 className="text-2xl font-bold text-text-primary">Slots</h2>
        </div>

        {/* Grid de Jogos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group relative bg-secondary rounded-xl overflow-hidden border border-border-custom hover:border-accent-gold transition-all cursor-pointer hover:scale-105 hover:shadow-2xl"
            >
              {/* Jackpot Badge */}
              {game.jackpot && (
                <div className="absolute top-2 right-2 bg-accent-gold text-primary px-2 py-1 rounded text-xs font-bold z-10">
                  JACKPOT
                </div>
              )}

              {/* Imagem do Jogo (Placeholder com emoji) */}
              <div className="aspect-square bg-tertiary flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {game.image}
              </div>

              {/* Info do Jogo */}
              <div className="p-3">
                <h4 className="text-text-primary font-bold text-sm mb-1 truncate group-hover:text-accent-gold transition-colors">
                  {game.name}
                </h4>
                <p className="text-text-muted text-xs truncate">{game.provider}</p>
              </div>

              {/* Overlay ao Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button className="bg-accent-gold hover:bg-yellow-400 text-primary font-bold px-6 py-2 rounded-lg transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                  JOGAR
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem se não houver resultados */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">Nenhum jogo encontrado com esses filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSelectedProvider('Todos');
              }}
              className="mt-4 text-accent-gold hover:text-text-primary font-bold transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}