'use client';
import React from 'react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Minha Conta</h1>
        <div className="bg-[#101D2C] border border-slate-800 rounded-2xl p-8">
          <p className="text-slate-400">
            Bem-vindo à sua área de conta. Em breve você poderá ver seu histórico e configurações aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
