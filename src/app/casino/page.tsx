import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CasinoPage from '@/components/casino/CasinoPage';

export default function Casino() {
  return (
    <main className="min-h-screen bg-[#0B1622]">
      <Header />
      <Sidebar />
      <CasinoPage />
    </main>
  );
}