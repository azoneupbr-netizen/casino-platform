'use client';
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  method: string;
}

export default function WalletPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [amount, setAmount] = useState<number>(50);
  const [pixKey, setPixKey] = useState('');
  const [step, setStep] = useState<'amount' | 'qrcode'>('amount');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeUrl: string; externalId: string } | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const quickAmounts = [20, 50, 100];

  useEffect(() => {
    if (activeTab === 'history') {
      fetchTransactions();
    }
  }, [activeTab]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/wallets/me/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      // Fallback vazio ou tratamento de erro
    }
  };

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
      setStep('qrcode');
    } catch (error) {
      console.error('Erro ao criar depósito:', error);
      showToast('Erro ao processar depósito. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await api.post('/payments/withdraw', {
        amount,
        pixKey,
        pixKeyType: 'CPF' // Simplificação
      });
      showToast('Saque solicitado com sucesso!', 'success');
      setAmount(50);
      setPixKey('');
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      showToast('Erro ao processar saque. Verifique o saldo ou tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Carteira</h1>
        
        <div className="bg-[#101D2C] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-800 bg-[#0f1926]">
                <button 
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeTab === 'deposit' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    DEPOSITAR
                </button>
                <button 
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeTab === 'withdraw' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    SACAR
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-4 font-bold transition-all text-sm md:text-base ${activeTab === 'history' ? 'text-[#ccff00] border-b-2 border-[#ccff00] bg-[#1a2942]/30' : 'text-slate-400 hover:text-white hover:bg-[#1a2942]/20'}`}
                >
                    HISTÓRICO
                </button>
            </div>

            <div className="p-6 md:p-8">
                {/* Deposit Tab */}
                {activeTab === 'deposit' && (
                    <div className="max-w-md mx-auto animate-fade-in">
                        {step === 'amount' ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-3 font-medium">Escolha um valor rápido</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {quickAmounts.map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setAmount(val)}
                                                className={`py-3 rounded-lg border font-bold transition-all ${
                                                    amount === val
                                                        ? 'bg-[#ccff00] text-black border-[#ccff00]'
                                                        : 'bg-[#0B1622] text-slate-300 border-slate-700 hover:border-[#ccff00]'
                                                }`}
                                            >
                                                R$ {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-3 font-medium">Ou digite o valor (R$)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="w-full bg-[#0B1622] border border-slate-700 rounded-lg pl-12 pr-4 py-4 text-white text-lg font-bold focus:border-[#ccff00] outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="bg-[#1a2942]/50 p-4 rounded-lg flex items-start gap-3 border border-slate-700/50">
                                    <span className="text-[#ccff00] text-xl">⚡</span>
                                    <div>
                                        <p className="text-white font-bold text-sm">Depósito Instantâneo via PIX</p>
                                        <p className="text-slate-400 text-xs mt-1">Seu saldo será atualizado em segundos após o pagamento.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDeposit}
                                    className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-4 rounded-lg transition-all text-lg shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transform hover:scale-[1.02]"
                                >
                                    GERAR QR CODE
                                </button>
                            </div>
                        ) : (
                            <div className="text-center space-y-6 animate-fade-in">
                                <div className="bg-white p-4 rounded-xl inline-block shadow-xl">
                                    <div className="w-48 h-48 bg-black pattern-dots relative overflow-hidden">
                                        {pixData?.qrCodeUrl ? (
                                            <img src={pixData.qrCodeUrl} alt="QR Code PIX" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-black">PIX</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm mb-2">Escaneie o QR Code ou copie o código abaixo:</p>
                                    <div className="flex gap-2">
                                        <input 
                                            readOnly
                                            value={pixData?.qrCode || ''}
                                            className="flex-1 bg-[#0B1622] border border-slate-700 rounded-lg px-3 py-3 text-slate-300 text-sm outline-none font-mono"
                                        />
                                        <button 
                                            onClick={() => pixData?.qrCode && navigator.clipboard.writeText(pixData.qrCode)}
                                            className="bg-[#1a2942] hover:bg-[#243a5e] text-[#ccff00] font-bold px-4 rounded-lg transition-all border border-[#ccff00]/20"
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                </div>

                                <div className="animate-pulse bg-yellow-500/10 border border-yellow-500/20 py-2 rounded-lg">
                                    <p className="text-yellow-500 font-bold text-sm">Aguardando pagamento...</p>
                                </div>

                                <button
                                    onClick={() => setStep('amount')}
                                    className="text-slate-500 text-sm hover:text-white underline decoration-slate-500 hover:decoration-white transition-all"
                                >
                                    Voltar e alterar valor
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Withdraw Tab */}
                {activeTab === 'withdraw' && (
                    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
                        <div className="bg-gradient-to-br from-[#1a2942] to-[#0B1622] p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-slate-400 text-sm font-medium">Saldo Disponível para Saque</p>
                                <p className="text-white font-bold text-3xl mt-1">R$ 1.250,00</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        </div>

                        <div>
                            <label className="block text-slate-400 text-sm mb-3 font-medium">Tipo de Chave PIX</label>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <button className="py-2 bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 rounded-lg text-sm font-bold">CPF</button>
                                <button className="py-2 bg-[#0B1622] text-slate-400 border border-slate-700 hover:border-slate-500 rounded-lg text-sm font-medium transition-colors">Email</button>
                                <button className="py-2 bg-[#0B1622] text-slate-400 border border-slate-700 hover:border-slate-500 rounded-lg text-sm font-medium transition-colors">Telefone</button>
                            </div>
                            <input
                                type="text"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                placeholder="Digite seu CPF"
                                className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-4 text-white font-medium focus:border-[#ccff00] outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-400 text-sm mb-3 font-medium">Valor do Saque (R$)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg pl-12 pr-4 py-4 text-white text-lg font-bold focus:border-[#ccff00] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2 text-blue-400 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Mínimo para saque: <strong>R$ 50,00</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Processamento em até <strong>1 hora</strong></span>
                            </div>
                        </div>

                        <button
                            onClick={handleWithdraw}
                            disabled={!pixKey || amount < 50}
                            className="w-full bg-[#ccff00] hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all text-lg shadow-lg"
                        >
                            SOLICITAR SAQUE
                        </button>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="animate-fade-in">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-[#0B1622] text-xs uppercase font-bold text-slate-300">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Tipo</th>
                                        <th className="px-4 py-3">Método</th>
                                        <th className="px-4 py-3">Valor</th>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3 rounded-r-lg text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {transactions.length > 0 ? transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-[#1a2942]/20 transition-colors">
                                            <td className="px-4 py-4 font-medium text-white">{tx.type}</td>
                                            <td className="px-4 py-4">{tx.method}</td>
                                            <td className={`px-4 py-4 font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {tx.amount > 0 ? '+' : ''}R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
                                            </td>
                                            <td className="px-4 py-4 text-xs">{new Date(tx.createdAt).toLocaleString('pt-BR')}</td>
                                            <td className="px-4 py-4 text-right">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                                    tx.status === 'completed' || tx.status === 'Concluído' ? 'bg-green-500/10 text-green-500' : 
                                                    tx.status === 'pending' || tx.status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                                Nenhuma transação encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}