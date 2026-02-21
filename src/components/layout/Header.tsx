'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DepositModal from '../payment/DepositModal';
import ThemeToggle from '../ui/ThemeToggle';
import PromotionsSidebar from './PromotionsSidebar';
import AgeGateModal from '../auth/AgeGateModal';
import UserDropdown from './UserDropdown';
import SupportModal from './SupportModal';
import { api } from '../../services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export default function Header() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isGuestProfileOpen, setIsGuestProfileOpen] = useState(false);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Typewriter Effect State
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [searchCategory, setSearchCategory] = useState('Cassino');
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const res = await api.get('/wallets/me/balance');
      // The backend returns { balanceCents: number, currency: string }
      const newBalance = res.data.balanceCents / 100;
      setBalance(newBalance);
      
      // Salva o saldo real no cache
      if (typeof window !== 'undefined') {
        localStorage.setItem('wallet_balance_cache', newBalance.toString());
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
      // Fallback para cache local se API falhar
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('wallet_balance_cache');
        if (cached) setBalance(parseFloat(cached));
      }
    }
  };

  const gameNames = ["Sweet Bonanza", "Aviator", "Fortune Tiger", "Roleta", "Blackjack"];

  React.useEffect(() => {
    if (isAuthenticated) {
      // Tenta carregar do cache imediatamente para evitar "0" piscando
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('wallet_balance_cache');
        if (cached) setBalance(parseFloat(cached));
      }

      fetchBalance();
      // Poll balance every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Listen for local balance updates (e.g. from rewards)
  React.useEffect(() => {
    const handleBalanceUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.amount === 'number') {
        setBalance(prev => {
            const newBal = prev + customEvent.detail.amount;
            if (typeof window !== 'undefined') {
                localStorage.setItem('wallet_balance_cache', newBal.toString());
            }
            return newBal;
        });
      }
    };

    window.addEventListener('wallet:update_balance', handleBalanceUpdate);
    return () => window.removeEventListener('wallet:update_balance', handleBalanceUpdate);
  }, []);

  React.useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % gameNames.length;
      const fullText = gameNames[i];

      setPlaceholder(isDeleting 
        ? fullText.substring(0, placeholder.length - 1) 
        : fullText.substring(0, placeholder.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && placeholder === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && placeholder === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum]);

  const openModal = (tab: 'login' | 'signup') => {
    setModalTab(tab);
    setIsModalOpen(true);
    setError('');
  };

  const handleSignupClick = () => {
    setIsAgeGateOpen(true);
  };

  const handleAgeConfirm = () => {
    setIsAgeGateOpen(false);
    openModal('signup');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (modalTab === 'login') {
        const res = await api.post('/auth/login', { email, password });
        login(res.data.access_token);
        setIsModalOpen(false);
        showToast('Login realizado com sucesso!', 'success');
      } else {
        // Signup (Auto login)
        const res = await api.post('/auth/register', { email, password });
        login(res.data.access_token);
        setIsModalOpen(false);
        showToast('Cadastro realizado com sucesso!', 'success');
        // Abrir modal de depósito após cadastro (Primeiro Depósito)
        setTimeout(() => setIsDepositModalOpen(true), 500);
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError.response?.data?.message || 'Erro ao realizar autenticação';
      // setError(errorMessage); // Removed in favor of Toast
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const base = (api.defaults.baseURL || '');
    window.location.href = `${base.replace(/\/$/, '')}/auth/google`;
  };

  return (
    <>
      {/* Skip Link para acessibilidade */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent-primary focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">
        Pular para conteúdo principal
      </a>
      
      <header role="banner" className="sticky top-0 left-0 right-0 bg-primary border-b border-border-custom z-50 h-20 transition-colors duration-300">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" className="flex items-center gap-2 w-auto md:w-64" aria-label="Brand Casino - Página inicial">
            <span className="text-xl md:text-2xl font-bold text-accent-primary">BRAND</span>
            <span className="text-sm md:text-base text-text-primary">CASINO</span>
          </Link>

          <nav role="navigation" aria-label="Menu principal" className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-text-secondary hover:text-accent-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-primary rounded">
              CASSINO
            </Link>
            <Link href="/sports" className="text-text-secondary hover:text-accent-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-primary rounded">
              ESPORTES
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-primary rounded">
              AO VIVO
            </Link>
            <button 
                onClick={() => setIsPromotionsOpen(true)}
                className="text-text-secondary hover:text-accent-primary transition-colors font-medium flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-primary rounded" 
                aria-label="Abrir promoções"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform animate-bounce" aria-hidden="true">🎁</span>
            </button>
            <button 
                onClick={() => setIsSupportOpen(true)}
                className="text-text-secondary hover:text-accent-primary transition-colors font-medium flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-primary rounded" 
                aria-label="Abrir suporte ao cliente"
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform animate-[bounce_2s_infinite]">
                <defs>
                  <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" /> {/* green-500 */}
                    <stop offset="100%" stopColor="#15803d" /> {/* green-700 */}
                  </linearGradient>
                </defs>
                <path d="M20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20C4 23.6733 5.23769 27.0588 7.33206 29.7423C7.54573 30.016 7.62588 30.3662 7.55167 30.702L6.5 35.5L11.298 34.4483C11.6338 34.3741 11.984 34.4543 12.2577 34.6679C14.9412 36.7623 18.3267 38 22 38L20 36Z" fill="url(#chatGradient)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                <path d="M12 14H28" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                <path d="M12 26H20" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
              </svg>
            </button>
          </nav>

          {/* Search Bar with Typewriter & Dropdown */}
          <div className="hidden xl:flex items-center flex-1 max-w-lg mx-6">
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary group-focus-within:text-accent-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-32 py-2.5 bg-tertiary/50 border border-border-custom rounded-lg text-sm text-text-primary placeholder-text-muted focus:border-accent-primary outline-none transition-all shadow-inner focus:bg-tertiary"
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center border-l border-border-custom my-1">
                    <select 
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="h-full pl-3 pr-8 bg-transparent text-text-secondary text-xs font-medium focus:ring-0 cursor-pointer hover:text-text-primary outline-none appearance-none"
                        style={{ backgroundImage: 'none' }}
                    >
                        <option value="Cassino" className="bg-primary text-text-primary">🎰 Cassino</option>
                        <option value="Esportes" className="bg-primary text-text-primary">⚽ Esportes</option>
                    </select>
                    <div className="absolute right-2 pointer-events-none text-text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => setIsDepositModalOpen(true)}
                  className="px-6 py-2 bg-[#ccff00] hover:bg-[#b3e600] text-black rounded-full transition-all font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] transform hover:scale-105"
                >
                  DEPOSITAR
                </button>

                <div className="flex items-center gap-2 bg-[#1e2330] rounded-full pl-4 pr-1 py-1 border border-gray-700/50">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
                    </button>
                    <span className="text-white font-bold text-sm mx-2">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#2a2e3e] flex items-center justify-center border border-gray-600 relative overflow-hidden">
                         <Image src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email || 'User'}`} alt="Avatar do usuário" fill className="object-cover rounded-full" unoptimized />
                    </div>
                </div>

                <div className="relative">
                    <button 
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-[#1e2330] overflow-hidden hover:scale-105 transition-transform ring-2 ring-transparent hover:ring-yellow-400 cursor-pointer relative"
                    >
                        <Image src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email || 'User'}`} alt="Avatar do usuário" fill className="object-cover" unoptimized />
                    </button>
                    
                    <UserDropdown 
                        isOpen={isUserDropdownOpen} 
                        onClose={() => setIsUserDropdownOpen(false)}
                        user={user}
                        onLogout={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                        }}
                        onSupportClick={() => setIsSupportOpen(true)}
                    />
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => openModal('login')}
                  className="px-3 py-1.5 md:px-6 md:py-2 text-xs md:text-base text-accent-primary border border-accent-primary rounded-lg hover:bg-accent-primary hover:text-white transition-all font-bold"
                >
                  Entrar
                </button>
                <button 
                  onClick={handleSignupClick}
                  className="px-3 py-1.5 md:px-6 md:py-2 text-xs md:text-base bg-accent-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
                >
                  Cadastro
                </button>
                
                {/* Ícone de Perfil para Visitantes */}
                <button 
                  onClick={() => setIsGuestProfileOpen(true)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-tertiary hover:bg-accent-primary/20 flex items-center justify-center text-text-secondary hover:text-accent-primary transition-all border border-border-custom ml-2 group relative"
                  title="Minha Conta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className="absolute top-0 right-0 w-3 h-3 bg-accent-gold rounded-full border-2 border-secondary animate-pulse"></span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => {
          setIsDepositModalOpen(false);
          fetchBalance();
        }}
      />
      
      <PromotionsSidebar 
        isOpen={isPromotionsOpen} 
        onClose={() => setIsPromotionsOpen(false)} 
        onLogin={() => openModal('login')}
      />

      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
      />

      {isAgeGateOpen && (
        <AgeGateModal 
            onConfirm={handleAgeConfirm} 
            onReject={() => setIsAgeGateOpen(false)} 
        />
      )}

      {/* Modal de Perfil para Visitante (Upsell) */}
      {isGuestProfileOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsGuestProfileOpen(false)} />
            <div className="relative bg-secondary border border-border-custom rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden p-6 text-center animate-fade-in">
                <button onClick={() => setIsGuestProfileOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors">✕</button>
                
                <div className="w-20 h-20 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted ring-4 ring-tertiary/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-2">Acesse sua Conta</h3>
                <p className="text-text-secondary text-sm mb-6">Faça login ou cadastre-se para gerenciar seu perfil e apostas.</p>

                {/* Área de Bônus */}
                <div className="bg-gradient-to-r from-accent-gold/20 to-accent-primary/20 border border-accent-gold/50 rounded-xl p-4 mb-6 transform hover:scale-105 transition-transform">
                    <div className="text-3xl mb-2 animate-bounce">🎁</div>
                    <h4 className="font-bold text-accent-gold text-sm uppercase mb-1">Bônus de Boas-vindas</h4>
                    <p className="text-xs text-text-primary">Ganhe <span className="font-bold text-accent-gold">100% até R$ 500</span> no seu primeiro depósito!</p>
                </div>

                <div className="space-y-3">
                    <button 
                        onClick={() => { setIsGuestProfileOpen(false); openModal('login'); }}
                        className="w-full py-3 border border-accent-primary text-accent-primary font-bold rounded-lg hover:bg-accent-primary hover:text-white transition-all"
                    >
                        JÁ TENHO CONTA
                    </button>
                    <button 
                        onClick={() => { setIsGuestProfileOpen(false); handleSignupClick(); }}
                        className="w-full py-3 bg-accent-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-accent-primary/20"
                    >
                        QUERO MEU BÔNUS
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Modal de Login/Cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-[#1a1c24] border border-[#2a2e3e] rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
            {/* Top Bar */}
            <div className="flex justify-between items-center p-4 bg-[#15171e] border-b border-[#2a2e3e]">
                {/* Help Button */}
                <button 
                    onClick={() => { setIsModalOpen(false); setIsSupportOpen(true); }}
                    className="flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6600] text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-lg group"
                >
                    <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] opacity-80">Precisa de</span>
                        <span>Ajuda?</span>
                    </div>
                </button>

                {/* Switch Mode & Close */}
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-gray-400">
                            {modalTab === 'signup' ? 'Já tem uma conta?' : 'Não tem conta?'}
                        </p>
                        <button 
                            onClick={() => setModalTab(modalTab === 'signup' ? 'login' : 'signup')}
                            className="text-xs font-bold text-[#ff4d00] hover:underline"
                        >
                            {modalTab === 'signup' ? 'Faça login aqui' : 'Registre-se aqui'}
                        </button>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Google Button */}
                <button 
                    onClick={handleGoogleLogin}
                    className="w-full bg-[#2a2e3e] hover:bg-[#353a4d] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all group border border-gray-700 hover:border-gray-500 shadow-lg"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {modalTab === 'signup' ? 'Registrar com Google' : 'Entrar com Google'}
                </button>

                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">ou</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                {/* Form (Email Input) */}
                <form 
                    className="space-y-4" 
                    onSubmit={handleAuth}
                >
                     {error && (
                       <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                         {error}
                       </div>
                     )}

                     <div className="space-y-2">
                        <div className="relative group">
                            <input 
                                type="email" 
                                placeholder="Email *" 
                                className="w-full bg-[#15171e] border border-gray-700 rounded-lg pl-4 pr-24 py-3 text-white placeholder-gray-500 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                     </div>
                     
                     <div className="animate-fade-in">
                         <input 
                            type="password"
                            placeholder="Senha"
                            className="w-full bg-[#15171e] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                         />
                         {modalTab === 'login' && (
                             <div className="text-right mt-1">
                                <a href="#" className="text-xs text-gray-400 hover:text-[#ccff00]">Esqueceu a senha?</a>
                             </div>
                         )}
                     </div>

                     <button 
                       type="submit"
                       disabled={loading}
                       className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {loading ? 'Carregando...' : (modalTab === 'signup' ? 'CONTINUAR' : 'ENTRAR')}
                     </button>
                </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
