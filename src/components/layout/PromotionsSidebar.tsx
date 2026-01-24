'use client';
import React from 'react';

interface PromotionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function PromotionsSidebar({ isOpen, onClose, onLogin }: PromotionsSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-[#0F1923] h-full shadow-2xl flex flex-col animate-fade-in-right border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0B1219]">
            <button onClick={onClose} className="text-white hover:text-accent-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-white font-bold text-lg">Promoções</h2>
            <div className="w-6"></div> {/* Spacer */}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
            {/* Login CTA Box */}
            <div className="bg-gradient-to-r from-[#1A2C3D] to-[#0F1923] rounded-xl p-6 relative overflow-hidden border border-white/5">
                <div className="relative z-10 w-2/3">
                    <p className="text-gray-400 text-xs font-bold mb-1">Minhas últimas recompensas</p>
                    <h3 className="text-white font-bold text-lg mb-4 leading-tight">
                        Faça login para conferir suas recompensas!
                    </h3>
                    <button 
                        onClick={() => { onClose(); onLogin(); }}
                        className="px-6 py-2 bg-[#2E3B4E] hover:bg-[#3A4B60] text-white text-sm font-bold rounded-lg transition-colors border border-white/10"
                    >
                        Entrar
                    </button>
                </div>
                {/* Imagem de Presente 3D (Simulada) */}
                <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-4 -translate-y-2">
                    <span className="text-8xl drop-shadow-2xl">🎁</span>
                </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['Todos', 'Aposta Esportiva', 'Cassino'].map((filter, idx) => (
                    <button 
                        key={filter}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                            idx === 1 
                            ? 'bg-[#0089A8] text-white' 
                            : 'bg-[#1A2C3D] text-gray-400 hover:text-white'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Lista de Promoções */}
            <div className="space-y-4">
                {[
                    { title: "Early Win", image: "🏎️", color: "from-green-900 to-green-800", badge: null },
                    { title: "Aposte & Ganhe", image: "🧘‍♂️", color: "from-blue-900 to-blue-800", badge: "R$ 50 APOSTA EXTRA", time: "1806d 4h" },
                    { title: "Vem pro APP!", image: "📱", color: "from-purple-900 to-purple-800", badge: "R$ 20 APOSTA EXTRA", time: "555d 11h" },
                    { title: "Golden Sub", image: "⚽", color: "from-yellow-900 to-yellow-800", badge: null },
                ].map((promo, i) => (
                    <div key={i} className={`relative h-40 rounded-xl bg-gradient-to-r ${promo.color} overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30 transition-all`}>
                        {/* Conteúdo */}
                        <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                            {promo.badge && (
                                <div className="self-start bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 border border-white/20">
                                    <span>🎟️</span> {promo.badge}
                                </div>
                            )}
                            
                            <div className="mt-auto">
                                <h4 className="text-white font-bold text-xl mb-1">{promo.title}</h4>
                                {promo.time && (
                                    <div className="inline-block bg-black/40 px-2 py-1 rounded text-[10px] text-yellow-500 font-mono">
                                        Termina em: <span className="font-bold text-white">{promo.time}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Imagem de Fundo (Simulada) */}
                        <div className="absolute right-0 bottom-0 h-full w-1/2 flex items-end justify-end p-2 opacity-80 group-hover:scale-105 transition-transform duration-500">
                            <span className="text-8xl">{promo.image}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
