'use client';
import React, { useState } from 'react';

const OddsSettingsWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [oddsOption, setOddsOption] = useState<'any' | 'higher' | 'none'>('higher');

  return (
    <div 
        className="bg-secondary border border-accent-secondary/30 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 mt-auto w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header (Always Visible) */}
      <div className="bg-gradient-to-r from-accent-secondary to-accent-primary px-4 py-3 flex justify-between items-center cursor-pointer border-b border-white/10">
        <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">Configurações de odds</span>
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white font-serif italic">i</div>
        </div>
        <button className="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>

      {/* Content (Expand on Hover) */}
      <div className={`transition-all duration-500 ease-in-out bg-tertiary overflow-hidden ${
          isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${oddsOption === 'any' ? 'border-[#E91E63]' : 'border-slate-600 group-hover:border-slate-400'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-[#E91E63] transition-transform ${oddsOption === 'any' ? 'scale-100' : 'scale-0'}`} />
                </div>
                <span className={`text-sm transition-colors ${oddsOption === 'any' ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Aceitar quaisquer alterações de odds
                </span>
                <input type="radio" name="odds_widget" checked={oddsOption === 'any'} onChange={() => setOddsOption('any')} className="hidden" />
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${oddsOption === 'higher' ? 'border-[#E91E63]' : 'border-slate-600 group-hover:border-slate-400'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-[#E91E63] transition-transform ${oddsOption === 'higher' ? 'scale-100' : 'scale-0'}`} />
                </div>
                <span className={`text-sm transition-colors ${oddsOption === 'higher' ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Aceitar alterações de Odds mais altas
                </span>
                <input type="radio" name="odds_widget" checked={oddsOption === 'higher'} onChange={() => setOddsOption('higher')} className="hidden" />
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${oddsOption === 'none' ? 'border-[#E91E63]' : 'border-slate-600 group-hover:border-slate-400'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-[#E91E63] transition-transform ${oddsOption === 'none' ? 'scale-100' : 'scale-0'}`} />
                </div>
                <span className={`text-sm transition-colors ${oddsOption === 'none' ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Não aceitar alterações nas Odds
                </span>
                <input type="radio" name="odds_widget" checked={oddsOption === 'none'} onChange={() => setOddsOption('none')} className="hidden" />
            </label>
        </div>
      </div>
    </div>
  );
};

export default OddsSettingsWidget;
