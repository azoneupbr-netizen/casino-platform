'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none flex items-center ${
        theme === 'dark' ? 'bg-tertiary border border-slate-700' : 'bg-slate-300 border border-slate-400'
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`absolute left-1 flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-0' : 'translate-x-7'
        }`}
      >
        {theme === 'dark' ? (
          <span className="text-xs">🌙</span>
        ) : (
          <span className="text-xs">☀️</span>
        )}
      </span>
    </button>
  );
}
