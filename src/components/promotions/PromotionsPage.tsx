'use client';
import React, { useState } from 'react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  bonus: string;
  type: 'welcome' | 'cashback' | 'freespins' | 'reload' | 'exclusive';
  category: 'all' | 'casino' | 'sports' | 'exclusive';
  expiresIn: number;
  code?: string;
  minDeposit?: number;
  maxBonus?: number;
  image: string;
  featured: boolean;
}

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [promotions] = useState<Promotion[]>([
    {
      id: 1,
      title: 'Bônus de Boas-vindas',
      description: 'Receba 100% de bônus no seu primeiro depósito',
      bonus: '100%',
      type: 'welcome',
      category: 'casino',
      expiresIn: 72,
      code: 'WELCOME100',
      minDeposit: 50,
      maxBonus: 500,
      image: '🎰',
      featured: true,
    },
    {
      id: 2,
      title: 'Cashback Semanal',
      description: 'Recupere até 20% das suas perdas toda semana',
      bonus: '20%',
      type: 'cashback',
      category: 'all',
      expiresIn: 168,
      code: 'CASHBACK20',
      image: '💰',
      featured: true,
    },
    {
      id: 3,
      title: '50 Free Spins',
      description: 'Gire grátis em nossos slots mais populares',
      bonus: '50 Spins',
      type: 'freespins',
      category: 'casino',
      expiresIn: 48,
      code: 'FREESPINS50',
      image: '🎡',
      featured: false,
    },
    {
      id: 4,
      title: 'Bônus de Recarga',
      description: 'Faça um novo depósito e ganhe 50% extra',
      bonus: '50%',
      type: 'reload',
      category: 'casino',
      expiresIn: 120,
      code: 'RELOAD50',
      minDeposit: 100,
      image: '💳',
      featured: false,
    },
    {
      id: 5,
      title: 'Aposta Grátis Esportes',
      description: 'R$ 50 em apostas grátis para novos usuários',
      bonus: 'R$ 50',
      type: 'exclusive',
      category: 'sports',
      expiresIn: 96,
      code: 'SPORTS50',
      image: '⚽',
      featured: true,
    },
    {
      id: 6,
      title: 'Programa Allyk VIP',
      description: 'Acesso a promoções exclusivas e suporte prioritário',
      bonus: 'Vários',
      type: 'exclusive',
      category: 'exclusive',
      expiresIn: 720,
      image: '👑',
      featured: true,
    },
    {
      id: 7,
      title: 'Bônus de Aniversário',
      description: 'Ganhe um bônus especial no seu mês de aniversário',
      bonus: '100 R$',
      type: 'exclusive',
      category: 'all',
      expiresIn: 240,
      code: 'BIRTHDAY100',
      image: '🎂',
      featured: false,
    },
    {
      id: 8,
      title: 'Torneio de Slots',
      description: 'Compita com outros jogadores e ganhe prêmios',
      bonus: 'Prêmios',
      type: 'freespins',
      category: 'casino',
      expiresIn: 72,
      image: '🏆',
      featured: false,
    },
  ]);

  const filteredPromotions = selectedCategory === 'all'
    ? promotions
    : promotions.filter(p => p.category === selectedCategory || p.category === 'all');

  const featuredPromotions = filteredPromotions.filter(p => p.featured);

  const formatTimeRemaining = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1622] pt-24 pb-16 px-4 ml-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">🎁 Promoções</h1>
        <p className="text-slate-400">Aproveite as melhores ofertas e bônus exclusivos</p>
      </div>

      {featuredPromotions.length > 0 && (
        <div className="mb-12">
          <div className="relative bg-gradient-to-r from-[#F5A623] to-[#D4881C] rounded-2xl overflow-hidden p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 opacity-10 text-9xl">
              {featuredPromotions[0].image}
            </div>
            <div className="relative z-10">
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                DESTAQUE
              </span>
              <h2 className="text-4xl font-bold mb-2">{featuredPromotions[0].title}</h2>
              <p className="text-lg mb-4 opacity-90">{featuredPromotions[0].description}</p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm opacity-75">Bônus</p>
                  <p className="text-5xl font-bold">{featuredPromotions[0].bonus}</p>
                </div>
                {featuredPromotions[0].code && (
                  <div className="bg-black bg-opacity-30 rounded-lg px-4 py-3">
                    <p className="text-sm opacity-75">Código</p>
                    <p className="text-2xl font-bold font-mono">{featuredPromotions[0].code}</p>
                  </div>
                )}
                <button className="ml-auto bg-black bg-opacity-40 hover:bg-opacity-60 text-white font-bold py-3 px-8 rounded-lg transition-all">
                  Aproveitar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'casino', label: 'Cassino' },
            { id: 'sports', label: 'Esportes' },
            { id: 'exclusive', label: 'Exclusivas' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedCategory(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedCategory === filter.id
                  ? 'bg-[#F5A623] text-black'
                  : 'bg-[#101D2C] text-slate-300 hover:bg-[#1a2942] border border-slate-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-[#101D2C] border border-slate-800 rounded-xl overflow-hidden hover:border-[#F5A623] transition-all group"
          >
            <div className="bg-gradient-to-r from-[#1a2942] to-[#0B1622] p-6 text-center">
              <div className="text-6xl mb-2">{promo.image}</div>
              <h3 className="text-white font-bold text-lg">{promo.title}</h3>
            </div>

            <div className="p-6">
              <p className="text-slate-400 text-sm mb-4">{promo.description}</p>

              <div className="bg-[#0B1622] rounded-lg p-4 mb-4 border border-slate-700">
                <p className="text-slate-400 text-xs mb-1">Bônus</p>
                <p className="text-[#F5A623] font-bold text-2xl">{promo.bonus}</p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                {promo.minDeposit && (
                  <div className="flex justify-between text-slate-400">
                    <span>Depósito Mínimo:</span>
                    <span className="text-white">R$ {promo.minDeposit}</span>
                  </div>
                )}
                {promo.maxBonus && (
                  <div className="flex justify-between text-slate-400">
                    <span>Bônus Máximo:</span>
                    <span className="text-white">R$ {promo.maxBonus}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                {promo.code && (
                  <div className="bg-[#0B1622] rounded px-3 py-1 border border-slate-700">
                    <p className="text-[#F5A623] font-mono text-xs font-bold">{promo.code}</p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-slate-500 text-xs">Expira em</p>
                  <p className="text-[#F5A623] font-bold text-sm">
                    {formatTimeRemaining(promo.expiresIn)}
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#F5A623] hover:bg-[#D4881C] text-black font-bold py-2 rounded-lg transition-all">
                Aproveitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#101D2C] border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-3">📋 Termos e Condições</h3>
        <p className="text-slate-400 text-sm">
          Todos os bônus estão sujeitos aos termos e condições da plataforma. Você deve ter 18+ anos
          para participar. Os bônus devem ser utilizados dentro do prazo especificado. Consulte os
          termos completos para mais detalhes.
        </p>
      </div>
    </div>
  );
}