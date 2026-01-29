'use client';

import { useEffect, useState } from 'react';
import { Calendar, CalendarDays, Coins, Loader2 } from 'lucide-react';
import { benefitsService, BenefitsResponse, BenefitType } from '@/services/benefits';
import { BenefitCard } from './BenefitCard';
import { useAuth } from '@/contexts/AuthContext';

export function BenefitsList() {
  const [benefits, setBenefits] = useState<BenefitsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<BenefitType | null>(null);
  const { user } = useAuth(); // Para forçar refresh se o usuário logar/deslogar

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const data = await benefitsService.getBenefitsStatus();
      setBenefits(data);
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, [user]);

  const handleClaim = async (type: BenefitType) => {
    try {
      setClaiming(type);
      await benefitsService.claimBenefit(type);
      
      // Feedback visual simples via alert (pode ser melhorado para toast depois)
      alert('Benefício resgatado com sucesso!');
      
      // Atualiza os dados
      await fetchBenefits();
    } catch (error: any) {
      console.error('Erro ao resgatar benefício:', error);
      const message = error.response?.data?.message || 'Erro ao resgatar benefício. Tente novamente.';
      alert(message);
    } finally {
      setClaiming(null);
    }
  };

  if (loading && !benefits) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!benefits) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Não foi possível carregar os benefícios. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BenefitCard
        title="Cashback Diário"
        description="Receba uma porcentagem das suas perdas do dia anterior de volta na sua conta."
        amount={benefits.daily.amount}
        available={benefits.daily.available}
        claimed={benefits.daily.claimed}
        icon={Calendar}
        type="DAILY_CASHBACK"
        onClaim={handleClaim}
        loading={claiming === 'DAILY_CASHBACK'}
      />

      <BenefitCard
        title="Bônus Semanal"
        description="Seu desempenho semanal recompensado! Disponível toda segunda-feira."
        amount={benefits.weekly.amount}
        available={benefits.weekly.available}
        period={benefits.weekly.period}
        icon={CalendarDays}
        type="WEEKLY_BONUS"
        onClaim={handleClaim}
        loading={claiming === 'WEEKLY_BONUS'}
      />

      <BenefitCard
        title="Rakeback"
        description="Ganhe uma parte da vantagem da casa em cada aposta que você fizer."
        amount={benefits.rakeback.amount}
        available={benefits.rakeback.available}
        icon={Coins}
        type="RAKEBACK"
        onClaim={handleClaim}
        loading={claiming === 'RAKEBACK'}
      />
    </div>
  );
}
