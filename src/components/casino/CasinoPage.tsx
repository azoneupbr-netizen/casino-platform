'use client';
import React, { useState } from 'react';
import HeroBanner from './HeroBanner';

export default function CasinoPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProvider, setSelectedProvider] = useState('Todos');

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

  const games = [
    { id: 1, name: 'Gates of Olympus', provider: 'Pragmatic Play', category: 'Populares', jackpot: false, image: '🏛️' },
    { id: 2, name: 'Sweet Bonanza', provider: 'Pragmatic Play', category: 'Populares', jackpot: false, image: '🍭' },
    { id: 3, name: 'Book of Dead', provider: 'Play\'n GO', category: 'Clássicos', jackpot: false, image: '📖' },
    { id: 4, name: 'Starburst', provider: 'NetEnt', category: 'Clássicos', jackpot: false, image: '💎' },
    { id: 5, name: 'Mega Moolah', provider: 'Microgaming', category: 'Jackpot', jackpot: true, image: '🦁' },
    { id: 6, name: 'Gonzo\'s Quest', provider: 'NetEnt', category: 'Populares', jackpot: false, image: '🗿' },
    { id: 7, name: 'Wanted Dead or Wild', provider: 'Hacksaw Gaming', category: 'Novos', jackpot: false, image: '🤠' },
    { id: 8, name: 'The Dog House', provider: 'Pragmatic Play', category: 'Populares', jackpot: false, image: '🐕' },
    { id: 9, name: 'Money Train 3', provider: 'Relax Gaming', category: 'Novos', jackpot: false, image: '🚂' },
    { id: 10, name: 'Razor Shark', provider: 'Push Gaming', category: 'Populares', jackpot: false, image: '🦈' },
    { id: 11, name: 'Big Bass Bonanza', provider: 'Pragmatic Play', category: 'Populares', jackpot: false, image: '🎣' },
    { id: 12, name: 'Fruit Party', provider: 'Pragmatic Play', category: 'Novos', jackpot: false, image: '🍎' },
    { id: 13, name: 'Divine Fortune', provider: 'NetEnt', category: 'Jackpot', jackpot: true, image: '🏺' },
    { id: 14, name: 'Wolf Gold', provider: 'Pragmatic Play', category: 'Clássicos', jackpot: false, image: '🐺' },
    { id: 15, name: 'Reactoonz', provider: 'Play\'n GO', category: 'Populares', jackpot: false, image: '👾' },
    { id: 16, name: 'Fire Joker', provider: 'Play\'n GO', category: 'Clássicos', jackpot: false, image: '🃏' },
  ];

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