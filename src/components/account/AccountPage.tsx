'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import { authService } from '../../services/auth';
import { useToast } from '../../contexts/ToastContext';

export default function AccountPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'verification'>('profile');
  
  // Profile State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
        const res = await api.get('/auth/me');
        const user = res.data;
        setName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        router.push('/');
    } finally {
        setLoading(false);
    }
  };

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      await authService.updateProfile({ name, phone });
      showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Erro desconhecido';
      showToast(`Erro ao atualizar perfil: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast('As senhas não coincidem!', 'error');
      return;
    }
    
    try {
      setLoading(true);
      await authService.updatePassword({ currentPassword, newPassword });
      showToast('Senha alterada com sucesso!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Erro desconhecido';
      showToast(`Erro ao alterar senha: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1622] pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Minha Conta</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-[#101D2C] border border-slate-800 rounded-2xl overflow-hidden">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-6 py-4 font-medium transition-colors ${activeTab === 'profile' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-slate-400 hover:bg-[#1a2942] hover:text-white'}`}
                    >
                        Dados Pessoais
                    </button>
                    <button 
                        onClick={() => setActiveTab('security')}
                        className={`w-full text-left px-6 py-4 font-medium transition-colors ${activeTab === 'security' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-slate-400 hover:bg-[#1a2942] hover:text-white'}`}
                    >
                        Segurança
                    </button>
                    <button 
                        onClick={() => setActiveTab('verification')}
                        className={`w-full text-left px-6 py-4 font-medium transition-colors ${activeTab === 'verification' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-slate-400 hover:bg-[#1a2942] hover:text-white'}`}
                    >
                        Verificação
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                {activeTab === 'profile' && (
                    <div className="bg-[#101D2C] border border-slate-800 rounded-2xl p-8 animate-fade-in">
                        <h2 className="text-xl font-bold text-white mb-6">Dados Pessoais</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Nome Completo</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#ccff00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">E-mail</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    className="w-full bg-[#0B1622]/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-600 mt-1">O e-mail não pode ser alterado.</p>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Telefone</label>
                                <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#ccff00] outline-none"
                                />
                            </div>
                            <button 
                                onClick={handleSaveProfile}
                                className="px-6 py-3 bg-[#ccff00] text-black font-bold rounded-lg hover:bg-[#b3e600] transition-colors"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="bg-[#101D2C] border border-slate-800 rounded-2xl p-8 animate-fade-in">
                        <h2 className="text-xl font-bold text-white mb-6">Alterar Senha</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Senha Atual</label>
                                <input 
                                    type="password" 
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#ccff00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Nova Senha</label>
                                <input 
                                    type="password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#ccff00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Confirmar Nova Senha</label>
                                <input 
                                    type="password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#0B1622] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#ccff00] outline-none"
                                />
                            </div>
                            <button 
                                onClick={handleChangePassword}
                                className="px-6 py-3 bg-[#ccff00] text-black font-bold rounded-lg hover:bg-[#b3e600] transition-colors"
                            >
                                Atualizar Senha
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'verification' && (
                    <div className="bg-[#101D2C] border border-slate-800 rounded-2xl p-8 animate-fade-in">
                        <h2 className="text-xl font-bold text-white mb-6">Verificação de Conta (KYC)</h2>
                        
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xl">✓</div>
                            <div>
                                <p className="text-green-500 font-bold">Conta Verificada</p>
                                <p className="text-slate-400 text-sm">Seus documentos foram aprovados.</p>
                            </div>
                        </div>

                        <div className="space-y-4 opacity-50 pointer-events-none">
                            <div className="border border-slate-700 rounded-lg p-4 flex justify-between items-center">
                                <span className="text-slate-300">Documento de Identidade</span>
                                <span className="text-green-500 font-bold text-sm">Aprovado</span>
                            </div>
                            <div className="border border-slate-700 rounded-lg p-4 flex justify-between items-center">
                                <span className="text-slate-300">Comprovante de Residência</span>
                                <span className="text-green-500 font-bold text-sm">Aprovado</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
