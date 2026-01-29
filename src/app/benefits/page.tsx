import { BenefitsList } from '@/components/benefits/BenefitsList';
import { Gift } from 'lucide-react';

export default function BenefitsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Benefícios e Recompensas</h1>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          Aproveite nossas recompensas exclusivas! Resgate seu cashback diário, bônus semanal e rakeback instantâneo.
        </p>
      </div>

      <BenefitsList />
    </div>
  );
}
