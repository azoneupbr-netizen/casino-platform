'use client';
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      // Fail silently to empty list if endpoint doesn't exist
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
        await api.post('/notifications/read-all');
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
        console.error('Erro ao marcar notificações como lidas:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Notificações</h1>
            <button onClick={markAllAsRead} className="text-[#ccff00] text-sm hover:underline">Marcar todas como lidas</button>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-[#101D2C] rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
