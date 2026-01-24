'use client';
import React, { useState, useEffect } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    { text: 'Olá! Como posso ajudar você hoje?', isUser: false, time: 'Agora' }
  ]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: message, isUser: true, time: 'Agora' }];
    setMessages(newMessages);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Obrigado pelo contato. Um de nossos atendentes responderá em breve. Por enquanto, isso é apenas uma demonstração.', 
        isUser: false, 
        time: 'Agora' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-[#101D2C] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#0B1622] p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center text-black font-bold text-xl">
                    🎧
                </div>
                <div>
                    <h3 className="font-bold text-white">Suporte ao Vivo</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                    </p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-2">
                ✕
            </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f1926]">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.isUser 
                            ? 'bg-[#ccff00] text-black rounded-tr-none' 
                            : 'bg-[#1a2942] text-white rounded-tl-none border border-slate-700'
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                        <span className={`text-[10px] block mt-1 ${msg.isUser ? 'text-black/60' : 'text-slate-400'}`}>
                            {msg.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-[#0B1622] border-t border-slate-800 flex gap-2">
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-[#1a2942] border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-[#ccff00] outline-none text-sm"
            />
            <button 
                type="submit" 
                disabled={!message.trim()}
                className="bg-[#ccff00] text-black p-2 rounded-lg hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                ➤
            </button>
        </form>
      </div>
    </div>
  );
}
