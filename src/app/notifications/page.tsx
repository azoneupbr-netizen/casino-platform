'use client';
import React from 'react';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'Bônus de Boas-vindas', message: 'Seu bônus de 100% até R$ 500 está disponível!', time: '2 horas atrás', read: false },
    { id: 2, title: 'Saque Aprovado', message: 'Seu saque de R$ 150,00 foi processado com sucesso.', time: '1 dia atrás', read: true },
    { id: 3, title: 'Novo Jogo: Allyk Wild', message: 'Experimente o novo slot exclusivo com multiplicadores de até 5000x.', time: '2 dias atrás', read: true },
  ];

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Notificações</h1>
            <button className="text-[#ccff00] text-sm hover:underline">Marcar todas como lidas</button>
        </div>
        
        <div className="space-y-4">
            {notifications.map((notif) => (
                <div 
                    key={notif.id} 
                    className={`p-6 rounded-xl border transition-colors ${
                        notif.read 
                            ? 'bg-[#101D2C] border-slate-800' 
                            : 'bg-[#1a2942] border-[#ccff00]/30 shadow-[0_0_15px_rgba(204,255,0,0.05)]'
                    }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                            {notif.title}
                            {!notif.read && <span className="ml-3 inline-block w-2 h-2 bg-[#ccff00] rounded-full"></span>}
                        </h3>
                        <span className="text-xs text-slate-500">{notif.time}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{notif.message}</p>
                </div>
            ))}
            
            {notifications.length === 0 && (
                <div className="bg-[#101D2C] border border-slate-800 rounded-2xl p-12 text-center">
                    <p className="text-slate-500">Você não tem novas notificações.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
