'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Cassino', href: '/', icon: '🎰', label: 'Ir para Cassino' },
    { name: 'Esportes', href: '/sports', icon: '⚽', label: 'Ir para Esportes' },
    { name: 'Ao Vivo', href: '#', icon: '🎥', label: 'Ir para Jogos Ao Vivo' },
    { name: 'Promo', href: '/promotions', icon: '🎁', label: 'Ver Promoções' },
    { name: 'Conta', href: '/account', icon: '👤', label: 'Minha Conta' },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Menu de navegação móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1a1c24] border-t border-[#2a2e3e] flex items-center justify-around z-[9999] px-2 shadow-lg w-full pb-safe"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center w-full h-full transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:ring-inset rounded ${
              isActive ? 'text-[#ff4d00]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className={`text-xl mb-1 ${isActive ? 'animate-bounce' : ''}`} aria-hidden="true">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
