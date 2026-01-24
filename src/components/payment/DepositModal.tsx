'use client';
import React, { useState } from 'react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<number>(50);
  const [pixKey, setPixKey] = useState('');
  const [step, setStep] = useState<'amount' | 'qrcode'>('amount');

  if (!isOpen) return null;

  const quickAmounts = [20, 50, 100];

  const handleDeposit = () => {
    setStep('qrcode');
  };

  const handleWithdraw = () => {
    // Simulação de saque
    alert(`Saque de R$ ${amount} solicitado para a chave PIX: ${pixKey}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#101D2C] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-4 font-bold transition-all ${activeTab === 'deposit' ? 'text-[#F5A623] border-b-2 border-[#F5A623] bg-[#0B1622]/50' : 'text-slate-400 hover:text-white hover:bg-[#0B1622]/30'}`}
          >
            DEPOSITAR
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-4 font-bold transition-all ${activeTab === 'withdraw' ? 'text-[#F5A623] border-b-2 border-[#F5A623] bg-[#0B1622]/50' : 'text-slate-400 hover:text-white hover:bg-[#0B1622]/30'}`}
          >
            SACAR
          </button>
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'deposit' ? (
            step === 'amount' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm mb-3">Escolha um valor rápido</label>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-3 rounded-lg border font-bold transition-all ${
                        amount === val
                          ? 'bg-[#F5A623] text-black border-[#F5A623]'
                          : 'bg-[#0B1622] text-slate-300 border-slate-700 hover:border-[#F5A623]'
                      }`}
                    >
                      R$ {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">Ou digite o valor (R$)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-4 text-white text-lg font-bold focus:border-[#F5A623] outline-none"
                />
              </div>

              <div className="bg-[#0B1622] p-4 rounded-lg flex items-start gap-3">
                <span className="text-green-500 text-xl">⚡</span>
                <div>
                  <p className="text-white font-bold text-sm">Depósito Instantâneo</p>
                  <p className="text-slate-400 text-xs">Seu saldo será atualizado em segundos após o pagamento.</p>
                </div>
              </div>

              <button
                onClick={handleDeposit}
                className="w-full bg-[#F5A623] hover:bg-[#D4881C] text-black font-bold py-4 rounded-lg transition-all text-lg"
              >
                GERAR QR CODE PIX
              </button>
            </div>
            ) : (
            <div className="text-center space-y-6">
              <div className="bg-white p-4 rounded-xl inline-block">
                {/* Simulação de QR Code */}
                <div className="w-48 h-48 bg-black pattern-dots relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xs font-bold">PIX</div>
                    </div>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Escaneie o QR Code ou copie o código abaixo:</p>
                <div className="flex gap-2">
                  <input 
                    readOnly
                    value="00020126330014BR.GOV.BCB.PIX011112345678901..."
                    className="flex-1 bg-[#0B1622] border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm outline-none"
                  />
                  <button className="bg-[#1a2942] hover:bg-[#243a5e] text-[#F5A623] font-bold px-4 rounded-lg transition-all">
                    Copiar
                  </button>
                </div>
              </div>

              <div className="animate-pulse">
                <p className="text-[#F5A623] font-bold text-sm">Aguardando pagamento...</p>
              </div>

              <button
                onClick={() => setStep('amount')}
                className="text-slate-500 text-sm hover:text-white underline"
              >
                Voltar
              </button>
            </div>
            )
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0B1622] p-4 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Saldo Disponível</p>
                <p className="text-[#F5A623] font-bold text-2xl">R$ 1.250,00</p>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">Chave PIX (CPF, Email ou Telefone)</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="Digite sua chave PIX"
                  className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-4 text-white font-medium focus:border-[#F5A623] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">Valor do Saque (R$)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-4 text-white text-lg font-bold focus:border-[#F5A623] outline-none"
                />
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>• Mínimo para saque: R$ 50,00</p>
                <p>• Processamento em até 1 hora</p>
              </div>

              <button
                onClick={handleWithdraw}
                disabled={!pixKey || amount < 50}
                className="w-full bg-[#F5A623] hover:bg-[#D4881C] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all text-lg"
              >
                SOLICITAR SAQUE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
