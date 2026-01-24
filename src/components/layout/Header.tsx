'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import DepositModal from '../payment/DepositModal';
import ThemeToggle from '../ui/ThemeToggle';
import PromotionsSidebar from './PromotionsSidebar';
import AgeGateModal from '../auth/AgeGateModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isGuestProfileOpen, setIsGuestProfileOpen] = useState(false);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = (tab: 'login' | 'signup') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsAgeGateOpen(true);
  };

  const handleAgeConfirm = () => {
    setIsAgeGateOpen(false);
    openModal('signup');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 bg-primary border-b border-border-custom z-50 h-20 transition-colors duration-300">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-2 w-64"> {/* Largura fixa para alinhar com sidebar expandida se necessário */}
            <span className="text-2xl font-bold text-accent-primary">ALLYK</span>
            <span className="text-text-primary">CASINO</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-text-secondary hover:text-accent-primary transition-colors font-medium">
              CASSINO
            </Link>
            <Link href="/sports" className="text-text-secondary hover:text-accent-primary transition-colors font-medium">
              ESPORTES
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent-primary transition-colors font-medium">
              AO VIVO
            </Link>
            <button 
                onClick={() => setIsPromotionsOpen(true)}
                className="text-text-secondary hover:text-accent-primary transition-colors font-medium flex items-center gap-2 group" 
                title="Promoções"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform animate-bounce">🎁</span>
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-text-muted">Saldo</span>
                    <span className="text-accent-gold font-bold">R$ 1.250,00</span>
                </div>
                {/* Notificações */}
                <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
                  <span className="text-xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                <button 
                  onClick={() => setIsDepositModalOpen(true)}
                  className="px-6 py-2 bg-[#28a745] hover:bg-[#218838] text-white rounded-lg transition-all font-bold shadow-lg shadow-green-900/20"
                >
                  DEPOSITAR
                </button>
                <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center text-accent-gold font-bold border border-slate-600 cursor-pointer hover:border-accent-gold transition-colors">
                    A
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => openModal('login')}
                  className="px-6 py-2 text-accent-primary border border-accent-primary rounded-lg hover:bg-accent-primary hover:text-white transition-all font-bold"
                >
                  Entrar
                </button>
                <button 
                  onClick={handleSignupClick}
                  className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
                >
                  Cadastro
                </button>
                
                {/* Ícone de Perfil para Visitantes */}
                <button 
                  onClick={() => setIsGuestProfileOpen(true)}
                  className="w-10 h-10 rounded-full bg-tertiary hover:bg-accent-primary/20 flex items-center justify-center text-text-secondary hover:text-accent-primary transition-all border border-border-custom ml-2 group relative"
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
        onClose={() => setIsDepositModalOpen(false)} 
      />
      
      <PromotionsSidebar 
        isOpen={isPromotionsOpen} 
        onClose={() => setIsPromotionsOpen(false)} 
        onLogin={() => openModal('login')}
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-secondary border border-border-custom rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex border-b border-border-custom">
              <button 
                onClick={() => setModalTab('login')}
                className={`flex-1 py-4 font-bold transition-all ${modalTab === 'login' ? 'text-accent-primary border-b-2 border-accent-primary' : 'text-text-muted'}`}
              >
                ENTRAR
              </button>
              <button 
                onClick={() => setModalTab('signup')}
                className={`flex-1 py-4 font-bold transition-all ${modalTab === 'signup' ? 'text-accent-primary border-b-2 border-accent-primary' : 'text-text-muted'}`}
              >
                CADASTRO
              </button>
            </div>

            <div className="p-8">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                {modalTab === 'signup' && (
                  <input 
                    type="text" 
                    placeholder="Nome Completo" 
                    className="w-full bg-primary border border-border-custom rounded-lg px-4 py-3 text-text-primary focus:border-accent-primary outline-none" 
                  />
                )}
                <input 
                  type="text" 
                  placeholder="Email ou CPF" 
                  className="w-full bg-primary border border-border-custom rounded-lg px-4 py-3 text-text-primary focus:border-accent-primary outline-none" 
                />
                <input 
                  type="password" 
                  placeholder="Senha" 
                  className="w-full bg-primary border border-border-custom rounded-lg px-4 py-3 text-text-primary focus:border-accent-primary outline-none" 
                />
                
                <button className="w-full bg-accent-primary hover:bg-opacity-90 text-white font-bold py-4 rounded-lg transition-all mt-4">
                  {modalTab === 'login' ? 'ENTRAR NA CONTA' : 'CRIAR MINHA CONTA'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}