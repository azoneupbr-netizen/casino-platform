'use client';
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AccountPage from '@/components/account/AccountPage';

const Account = () => {
  return (
    <main className="flex min-h-screen bg-[#0B1622]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <AccountPage />
      </div>
    </main>
  );
};

export default Account;