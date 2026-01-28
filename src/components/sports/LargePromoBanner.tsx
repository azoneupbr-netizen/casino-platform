'use client';
import React from 'react';

export default function LargePromoBanner() {
  return (
    <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer mb-6 mt-2">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#E91E63] to-[#111] bg-[length:200%_200%] animate-[gradient_3s_ease-in-out_infinite]"></div>
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
        
        {/* Animated Badge */}
        <div className="bg-yellow-400 text-black font-black text-xs md:text-sm px-3 py-1 rounded-full uppercase tracking-widest mb-4 animate-bounce shadow-[0_0_15px_rgba(250,204,21,0.6)]">
          Só Hoje
        </div>

        {/* Main Title with Glitch Effect */}
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transform -skew-x-12">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
            Bônus de
          </span>
          <span className="block text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
            Boas-Vindas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-white/90 font-medium text-sm md:text-lg max-w-lg bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          Ganhe até <span className="text-yellow-400 font-bold">R$ 5.000</span> + <span className="text-yellow-400 font-bold">200 Rodadas Grátis</span> no primeiro depósito
        </p>

        {/* CTA Button */}
        <button className="mt-6 bg-white text-[#E91E63] font-black uppercase text-sm md:text-base px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2">
          <span>Resgatar Agora</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Floating Particles/Elements */}
      <div className="absolute top-10 left-10 text-4xl animate-[float_4s_ease-in-out_infinite] opacity-50">🎰</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-[float_5s_ease-in-out_infinite_reverse] opacity-50">🎲</div>
      <div className="absolute top-1/2 right-20 text-2xl animate-[float_3s_ease-in-out_infinite] opacity-30 delay-700">⚽</div>
      <div className="absolute bottom-20 left-1/4 text-3xl animate-[float_6s_ease-in-out_infinite_reverse] opacity-40 delay-1000">🃏</div>

    </div>
  );
}
