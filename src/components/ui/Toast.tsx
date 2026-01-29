import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000 
}: ToastProps) {
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center gap-3 px-6 py-5 rounded-xl shadow-2xl border transition-all duration-300 animate-in fade-in zoom-in-95 ${
      type === 'success' 
        ? 'bg-[#0B1622] border-[#ccff00] text-white shadow-[#ccff00]/20' 
        : 'bg-[#0B1622] border-red-500 text-white shadow-red-500/20'
    } max-w-[90vw] md:max-w-md w-full backdrop-blur-xl`}>
      
      <div className={`flex-shrink-0 ${type === 'success' ? 'text-[#ccff00]' : 'text-red-500'}`}>
        {type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
      </div>
      
      <p className="flex-1 font-medium text-sm md:text-base leading-tight">
        {message}
      </p>

      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors p-1"
      >
        <X size={20} />
      </button>
    </div>
  );
}
