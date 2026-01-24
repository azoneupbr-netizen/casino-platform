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
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0B1622] border-t border-slate-800 flex items-center justify-around z-[980] px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? 'text-[#F5A623]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
