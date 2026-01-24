'use client';
import React from 'react';

interface AgeGateModalProps {
  onConfirm: () => void;
  onReject: () => void;
}

export default function AgeGateModal({ onConfirm, onReject }: AgeGateModalProps) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-[#FBFBFB] w-full max-w-md rounded-xl overflow-hidden shadow-2xl animate-fade-in relative">
        {/* Header Allyk */}
        <div className="bg-accent-primary p-6 flex justify-center relative overflow-hidden">
            {/* Shapes decorativos */}
            <h2 className="text-3xl font-bold italic text-white tracking-tighter">ALLYK</h2>
            
            {/* Efeito triangular na base */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-[#FBFBFB]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        </div>

        <div className="p-8 text-center">
            <h3 className="text-accent-primary text-xl font-bold mb-1 uppercase">VOCÊ TEM MAIS DE 18</h3>
            <h3 className="text-accent-primary text-xl font-bold mb-8 uppercase">ANOS?</h3>

            <div className="flex gap-4">
                <button 
                    onClick={onReject}
                    className="flex-1 py-3 border border-gray-300 rounded text-gray-700 font-bold hover:bg-gray-50 transition-colors uppercase text-sm"
                >
                    NÃO
                </button>
                <button 
                    onClick={onConfirm}
                    className="flex-1 py-3 bg-[#2D3238] text-white rounded font-bold hover:bg-[#1a1d21] transition-colors uppercase text-sm shadow-lg"
                >
                    SIM
                </button>
            </div>
        </div>
        
        {/* Detalhe triangular inferior */}
        <div className="h-4 bg-[#111] w-full mt-4" style={{ clipPath: 'polygon(0 100%, 20% 0, 40% 100%, 60% 0, 80% 100%, 100% 0)' }}></div>
      </div>
    </div>
  );
}
