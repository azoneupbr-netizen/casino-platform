'use client';
import React, { useState } from 'react';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[990] w-14 h-14 bg-[#F5A623] hover:bg-[#D4881C] text-black rounded-full shadow-lg shadow-black/50 flex items-center justify-center transition-all hover:scale-110"
      >
        {isOpen ? (
          <span className="text-2xl font-bold">✕</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Janela de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[990] w-80 h-96 bg-[#101D2C] border border-slate-800 rounded-xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 duration-200">
          {/* Header do Chat */}
          <div className="bg-[#0B1622] p-4 rounded-t-xl border-b border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CS
            </div>
            <div>
              <p className="text-white font-bold text-sm">Suporte 24h</p>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
              </p>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-[#1a2942] p-3 rounded-lg rounded-tl-none max-w-[85%]">
              <p className="text-slate-300 text-sm">Olá! Bem-vindo ao suporte da Brand Casino. Como posso ajudar você hoje?</p>
              <span className="text-[10px] text-slate-500 block mt-1">Agora</span>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-[#0B1622] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#F5A623] outline-none"
              />
              <button className="bg-[#F5A623] text-black rounded-lg px-3 hover:bg-[#D4881C] transition-colors">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
