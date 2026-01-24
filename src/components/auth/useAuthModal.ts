'use client';
import { useState } from 'react';

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const open = (initialTab: 'login' | 'signup' = 'login') => {
    setTab(initialTab);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const switchTab = (newTab: 'login' | 'signup') => {
    setTab(newTab);
  };

  return {
    isOpen,
    tab,
    open,
    close,
    switchTab,
  };
}