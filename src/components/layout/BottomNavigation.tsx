'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Cassino', href: '/', icon: '🎰' },
    { name: 'Esportes', href: '/sports', icon: '⚽' },
    { name: 'Ao Vivo', href: '#', icon: '🎥' },
    { name: 'Promo', href: '/promotions', icon: '🎁' },
    { name: 'Conta', href: '/account', icon: '👤' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1a1c24] border-t border-[#2a2e3e] flex items-center justify-around z-[100000] px-2 shadow-lg w-full pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-all ${
              isActive ? 'text-[#ff4d00]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className={`text-xl mb-1 ${isActive ? 'animate-bounce' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
