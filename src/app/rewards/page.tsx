'use client';
import React from 'react';

export default function RewardsPage() {
  const currentLevel = "MEMBRO BRAND";
  const nextLevel = "BRAND PRATA";
  const progress = 65; // percentage
  const points = 6500;
  const nextLevelPoints = 10000;

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="text-[#ccff00]">👑</span> Brand VIP
                </h1>
                <p className="text-slate-400 mt-2">Suba de nível e desbloqueie recompensas exclusivas.</p>
            </div>
            <div className="bg-[#1a2942] px-6 py-3 rounded-full border border-slate-700 flex items-center gap-3">
                <span className="text-slate-400 text-sm font-bold uppercase">Nível Atual</span>
                <span className="text-[#ccff00] font-bold text-lg">{currentLevel}</span>
            </div>
        </div>
        
        {/* Progress Section */}
        <div className="bg-gradient-to-r from-[#101D2C] to-[#1a2942] border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-slate-300 font-medium mb-1">Progresso para {nextLevel}</p>
                        <p className="text-2xl font-bold text-white">{points} <span className="text-slate-500 text-sm">/ {nextLevelPoints} XP</span></p>
                    </div>
                    <span className="text-[#ccff00] font-bold text-xl">{progress}%</span>
                </div>
                
                <div className="h-4 bg-[#0B1622] rounded-full overflow-hidden border border-slate-700">
                    <div 
                        className="h-full bg-gradient-to-r from-[#ccff00] to-[#b3e600] transition-all duration-1000 ease-out shadow-[0_0_10px_#ccff00]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <p className="text-slate-500 text-xs mt-4">Aposte mais R$ {(nextLevelPoints - points) * 10} para alcançar o nível {nextLevel}</p>
            </div>
        </div>

        {/* Benefits Grid */}
        <h2 className="text-xl font-bold text-white mb-6">Seus Benefícios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#101D2C] border border-slate-800 p-6 rounded-xl hover:border-[#ccff00]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#1a2942] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ccff00] transition-colors">
                    <span className="text-2xl group-hover:text-black">💰</span>
                </div>
                <h3 className="text-white font-bold mb-2">Cashback Diário</h3>
                <p className="text-slate-400 text-sm">Receba 5% de volta em todas as suas perdas líquidas diariamente.</p>
                <button className="mt-4 w-full py-2 bg-[#1a2942] text-white rounded-lg text-sm font-bold hover:bg-[#243a5e] transition-colors">Resgatar</button>
            </div>

            <div className="bg-[#101D2C] border border-slate-800 p-6 rounded-xl hover:border-[#ccff00]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#1a2942] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ccff00] transition-colors">
                    <span className="text-2xl group-hover:text-black">🎁</span>
                </div>
                <h3 className="text-white font-bold mb-2">Bônus Semanal</h3>
                <p className="text-slate-400 text-sm">Um presente especial toda sexta-feira baseado na sua atividade.</p>
                <div className="mt-4 w-full py-2 bg-[#0B1622] text-slate-500 rounded-lg text-sm font-bold text-center border border-slate-700">Disponível em 3 dias</div>
            </div>

            <div className="bg-[#101D2C] border border-slate-800 p-6 rounded-xl hover:border-[#ccff00]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#1a2942] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ccff00] transition-colors">
                    <span className="text-2xl group-hover:text-black">🚀</span>
                </div>
                <h3 className="text-white font-bold mb-2">Rakeback</h3>
                <p className="text-slate-400 text-sm">Ganhe uma porcentagem de cada aposta de volta, ganhando ou perdendo.</p>
                <button className="mt-4 w-full py-2 bg-[#ccff00] text-black rounded-lg text-sm font-bold hover:bg-[#b3e600] transition-colors shadow-lg">Ativar Agora</button>
            </div>
        </div>

        {/* Levels Table */}
        <div className="bg-[#101D2C] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Benefícios por Nível</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-[#0B1622] text-xs uppercase font-bold text-slate-300">
                        <tr>
                            <th className="px-6 py-4">Nível</th>
                            <th className="px-6 py-4">XP Necessário</th>
                            <th className="px-6 py-4">Cashback</th>
                            <th className="px-6 py-4">Bônus Level Up</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        <tr className="bg-[#ccff00]/5">
                            <td className="px-6 py-4 font-bold text-[#ccff00]">Membro Brand (Atual)</td>
                            <td className="px-6 py-4">0</td>
                            <td className="px-6 py-4">5%</td>
                            <td className="px-6 py-4">R$ 10</td>
                        </tr>
                        <tr className="hover:bg-[#1a2942]/20">
                            <td className="px-6 py-4 font-bold text-slate-300">Brand Prata</td>
                            <td className="px-6 py-4">10.000</td>
                            <td className="px-6 py-4">8%</td>
                            <td className="px-6 py-4">R$ 50</td>
                        </tr>
                        <tr className="hover:bg-[#1a2942]/20">
                            <td className="px-6 py-4 font-bold text-yellow-400">Brand Ouro</td>
                            <td className="px-6 py-4">50.000</td>
                            <td className="px-6 py-4">10%</td>
                            <td className="px-6 py-4">R$ 200</td>
                        </tr>
                        <tr className="hover:bg-[#1a2942]/20">
                            <td className="px-6 py-4 font-bold text-cyan-400">Brand Platina</td>
                            <td className="px-6 py-4">250.000</td>
                            <td className="px-6 py-4">12%</td>
                            <td className="px-6 py-4">R$ 1.000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
