'use client';
import React, { useState } from 'react';
import { api } from '../../services/api';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState<number>(50);
  const [paymentMethod, setPaymentMethod] = useState<'pay2free' | 'pixpaag'>('pay2free');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeUrl: string; externalId: string } | null>(null);
  
  if (!isOpen) return null;

  const quickAmounts = [20, 50, 100, 250, 500, 1000];

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/payments/deposit', {
        amount,
        currency: 'BRL',
        provider: 'PIX'
      });
      setPixData({
        qrCode: res.data.pixCode,
        qrCodeUrl: res.data.pixQrCode,
        externalId: res.data.externalId
      });
    } catch (error) {
      console.error('Erro ao criar depósito:', error);
      alert('Erro ao processar depósito. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!pixData) return;
    try {
      await api.post(`/payments/test/confirm/${pixData.externalId}`);
      alert('Pagamento confirmado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao simular pagamento:', error);
      alert('Erro ao confirmar pagamento.');
    }
  };

  const copyToClipboard = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      alert('Código Pix copiado!');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#121212] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-800">
        
        {/* Banner Promocional (Topo) */}
        <div className="relative w-full h-40 bg-gradient-to-r from-green-900 to-black overflow-hidden flex items-center justify-between p-4 group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
            <div className="z-10 w-2/3">
                <div className="text-[#ccff00] font-black text-4xl italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
                    20% DE <br/>CASHBACK
                </div>
                <div className="bg-[#ccff00] text-black text-xs font-bold px-2 py-1 rounded inline-block mt-2 transform -skew-x-12">
                    EM SLOTS E CRASH
                </div>
            </div>
            <div className="z-10 w-1/3 flex flex-col items-center justify-center">
                 <button className="bg-gradient-to-b from-[#ccff00] to-[#99cc00] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                    SAIBA MAIS
                 </button>
            </div>
            
            <button 
                onClick={onClose} 
                className="absolute top-2 right-2 bg-[#ccff00] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-white transition-colors z-20"
            >
                ✕
            </button>
        </div>

        <div className="p-6">
            {pixData ? (
                <div className="flex flex-col items-center animate-fade-in">
                    <h2 className="text-white font-bold text-xl mb-6">Pagamento via Pix</h2>
                    <div className="bg-white p-4 rounded-xl mb-6 shadow-lg">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={pixData.qrCodeUrl} alt="QR Code Pix" className="w-56 h-56" />
                    </div>
                    <div className="w-full mb-6">
                        <label className="text-gray-400 text-xs font-bold mb-2 block uppercase">Código Pix Copia e Cola</label>
                        <div className="flex gap-2">
                            <input 
                                readOnly 
                                value={pixData.qrCode} 
                                className="flex-1 bg-[#1e1e1e] border border-gray-700 rounded-lg p-3 text-white text-sm font-mono truncate"
                            />
                            <button 
                                onClick={copyToClipboard}
                                className="bg-[#ccff00] text-black font-bold px-4 rounded-lg hover:bg-[#b3e600] transition-colors"
                            >
                                COPIAR
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full bg-[#1e1e1e] border border-dashed border-gray-700 rounded-lg p-4 mb-6 text-center">
                        <p className="text-gray-300 text-sm">
                            Valor a pagar: <span className="text-[#ccff00] font-bold text-lg">R$ {amount.toFixed(2)}</span>
                        </p>
                    </div>

                    <button 
                        onClick={handleSimulatePayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mb-4 shadow-lg transition-all"
                    >
                        SIMULAR PAGAMENTO APROVADO
                    </button>

                    <button 
                        onClick={() => setPixData(null)}
                        className="text-gray-500 hover:text-white text-sm font-medium transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            ) : (
                <>
            {/* Header com Voltar */}
            <div className="flex items-center gap-3 mb-6">
                <button className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div>
                    <h2 className="text-white font-bold text-lg">Depositar</h2>
                    <p className="text-gray-400 text-xs">Adicione saldo à sua conta</p>
                </div>
            </div>

            {/* Seleção de Método */}
            <div className="flex gap-3 mb-6">
                <button 
                    onClick={() => setPaymentMethod('pay2free')}
                    className={`flex-1 py-3 px-2 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'pay2free' ? 'border-[#ccff00] bg-[#ccff00]/10 text-white' : 'border-gray-700 bg-[#1e1e1e] text-gray-400'}`}
                >
                    <span className="font-bold text-sm">Pay2Free</span>
                </button>
                <button 
                    onClick={() => setPaymentMethod('pixpaag')}
                    className={`flex-1 py-3 px-2 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'pixpaag' ? 'border-[#ccff00] bg-[#ccff00]/10 text-white' : 'border-gray-700 bg-[#1e1e1e] text-gray-400'}`}
                >
                    <span className="font-bold text-sm">PixPaag</span>
                </button>
            </div>

            {/* Inputs Readonly */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                    <label className="text-gray-500 text-xs font-bold mb-1 block">Método de Pagamento</label>
                    <div className="bg-[#1e1e1e] border border-gray-700 rounded p-3 text-gray-300 text-sm font-medium">
                        {paymentMethod === 'pay2free' ? 'PAY2FREE' : 'PIXPAAG'}
                    </div>
                </div>
                <div>
                    <label className="text-gray-500 text-xs font-bold mb-1 block">Depósito Mínimo</label>
                    <div className="bg-[#1e1e1e] border border-gray-700 rounded p-3 text-gray-300 text-sm font-medium">
                        R$ 5
                    </div>
                </div>
            </div>

            {/* Valor do Depósito */}
            <div className="mb-2">
                <div className="flex justify-between items-end mb-1">
                    <label className="text-white font-bold text-sm">Valor a ser depositado:</label>
                    <button className="text-gray-400 text-xs hover:text-[#ccff00] underline">Possui cupom?</button>
                </div>
                <div className="relative">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg py-3 pl-4 pr-20 text-white font-bold text-lg focus:border-[#ccff00] outline-none transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#2a2a2a] px-2 py-1 rounded">
                         <span className="text-xs text-white font-bold">🇧🇷 BRL</span>
                    </div>
                </div>
            </div>

            {/* Grid de Valores Rápidos */}
            <div className="grid grid-cols-3 gap-2 mb-8 mt-4">
                {quickAmounts.map((val) => (
                    <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`relative py-3 rounded border font-bold text-sm transition-all ${
                            amount === val
                                ? 'bg-white text-black border-white'
                                : 'bg-[#1e1e1e] text-white border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        R$ {val}
                        {[50, 250, 1000].includes(val) && (
                            <span className="absolute -top-2 -right-1 bg-[#ccff00] text-black text-[10px] px-1 rounded font-bold shadow-sm">
                                HOT
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Botão de Ação */}
            <button 
                onClick={handleDeposit}
                disabled={loading}
                className="w-full bg-gradient-to-b from-[#ccff00] to-[#99cc00] hover:from-[#b3e600] hover:to-[#88b300] text-black font-black py-4 rounded-lg text-lg shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'PROCESSANDO...' : 'DEPOSITAR'}
            </button>
            </>
        )}
        </div>
      </div>
    </div>
  );
}
