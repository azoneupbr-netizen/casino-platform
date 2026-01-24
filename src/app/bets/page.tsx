'use client';
import React, { useState } from 'react';

export default function BetsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sports' | 'casino'>('all');

  // Mock Bets Data
  const bets = [
    { id: 1, type: 'sports', game: 'Flamengo vs Vasco', market: 'Vencedor da Partida', selection: 'Flamengo', odds: 1.85, stake: 50.00, return: 92.50, status: 'win', date: '24/01/2026 14:30' },
    { id: 2, type: 'casino', game: 'Gates of Olympus', market: 'Slot Spin', selection: '-', odds: 50.0, stake: 2.00, return: 100.00, status: 'win', date: '24/01/2026 14:45' },
    { id: 3, type: 'sports', game: 'Lakers vs Warriors', market: 'Total de Pontos', selection: 'Over 220.5', odds: 1.90, stake: 100.00, return: 0, status: 'loss', date: '24/01/2026 12:00' },
    { id: 4, type: 'casino', game: 'Sweet Bonanza', market: 'Slot Spin', selection: '-', odds: 0, stake: 5.00, return: 0, status: 'loss', date: '24/01/2026 14:50' },
    { id: 5, type: 'sports', game: 'Real Madrid vs Barcelona', market: 'Ambos Marcam', selection: 'Sim', odds: 1.75, stake: 200.00, return: 0, status: 'pending', date: '24/01/2026 16:00' },
  ];

  const filteredBets = activeFilter === 'all' ? bets : bets.filter(bet => bet.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Minhas Apostas</h1>
        
        <div className="bg-[#101D2C] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Filter Tabs */}
            <div className="flex border-b border-slate-800 bg-[#0f1926]">
                <button 
                    onClick={() => setActiveFilter('all')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeFilter === 'all' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    TODAS
                </button>
                <button 
                    onClick={() => setActiveFilter('sports')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeFilter === 'sports' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    ESPORTES
                </button>
                <button 
                    onClick={() => setActiveFilter('casino')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeFilter === 'casino' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    CASSINO
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-[#0B1622] text-xs uppercase font-bold text-slate-300">
                        <tr>
                            <th className="px-6 py-4">Jogo / Evento</th>
                            <th className="px-6 py-4">Aposta</th>
                            <th className="px-6 py-4">Odds</th>
                            <th className="px-6 py-4">Valor</th>
                            <th className="px-6 py-4">Retorno</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredBets.map((bet) => (
                            <tr key={bet.id} className="hover:bg-[#1a2942]/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">{bet.game}</span>
                                        <span className="text-xs text-slate-500">{bet.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-slate-300">{bet.market}</span>
                                        {bet.selection !== '-' && <span className="text-[#ccff00] text-xs font-bold">{bet.selection}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-[#ccff00]">{bet.odds.toFixed(2)}</td>
                                <td className="px-6 py-4 text-white">R$ {bet.stake.toFixed(2)}</td>
                                <td className={`px-6 py-4 font-bold ${bet.status === 'win' ? 'text-green-500' : bet.status === 'loss' ? 'text-slate-500' : 'text-yellow-500'}`}>
                                    {bet.status === 'pending' ? '-' : `R$ ${bet.return.toFixed(2)}`}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        bet.status === 'win' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                        bet.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}>
                                        {bet.status === 'win' && '✅ Ganhou'}
                                        {bet.status === 'loss' && '❌ Perdeu'}
                                        {bet.status === 'pending' && '⏳ Pendente'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {filteredBets.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">Nenhuma aposta encontrada.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
