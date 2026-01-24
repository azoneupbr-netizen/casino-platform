import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PromotionsPage from '@/components/promotions/PromotionsPage';

export default function Promotions() {
  return (
    <main className="flex min-h-screen bg-[#0B1622]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PromotionsPage />
      </div>
    </main>
  );
}