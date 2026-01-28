'use client';
import React from 'react';

export default function TopBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-purple-800 text-white h-10 flex items-center justify-between px-4 lg:px-8 relative z-[60]">
      <div className="flex-1"></div> {/* Spacer Left */}
      
      <div className="flex items-center gap-4">
        <span className="text-xl">📱</span>
        <span className="text-sm font-bold hidden sm:inline">Faça o download do nosso aplicativo para uma experiência ainda melhor!</span>
        <span className="text-sm font-bold sm:hidden">Baixe nosso App!</span>
        <button className="bg-white text-orange-600 hover:bg-gray-100 px-4 py-1 rounded text-xs font-bold transition-colors">
          Download
        </button>
      </div>

      <div className="flex-1 flex justify-end">
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors p-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
