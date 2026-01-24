'use client';
import React, { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: 'Bônus de Boas-vindas',
    description: 'Receba 100% até R$ 500 no seu primeiro depósito!',
    cta: 'PEGAR BÔNUS',
    gradient: 'from-accent-primary to-purple-600',
    icon: '🎁'
  },
  {
    id: 2,
    title: 'Torneio de Slots',
    description: 'Prêmio total de R$ 100.000 para os melhores jogadores!',
    cta: 'PARTICIPAR',
    gradient: 'from-accent-gold to-orange-600',
    icon: '🏆'
  },
  {
    id: 3,
    title: 'Novo Jogo: Space Man',
    description: 'Voe alto e multiplique sua aposta em até 5000x!',
    cta: 'JOGAR AGORA',
    gradient: 'from-blue-600 to-cyan-500',
    icon: '🚀'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl group">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center px-8 md:px-16 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background com Gradiente */}
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          
          {/* Conteúdo */}
          <div className="relative z-20 max-w-2xl animate-fade-in">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-4 border border-white/30">
              DESTAQUE DA SEMANA
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
              {banner.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
              {banner.description}
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
              {banner.cta}
              <span>→</span>
            </button>
          </div>

          {/* Ícone Gigante Decorativo */}
          <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 text-[150px] md:text-[250px] opacity-20 animate-pulse select-none">
            {banner.icon}
          </div>
        </div>
      ))}

      {/* Indicadores (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      
      {/* Setas de Navegação (visíveis no hover) */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ❮
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ❯
      </button>
    </div>
  );
}
