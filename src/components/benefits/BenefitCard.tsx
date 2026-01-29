import { LucideIcon, Lock, CheckCircle } from 'lucide-react';
import { BenefitType } from '@/services/benefits';

interface BenefitCardProps {
  title: string;
  description: string;
  amount: number;
  available: boolean;
  claimed?: boolean;
  period?: string;
  icon: LucideIcon;
  type: BenefitType;
  onClaim: (type: BenefitType) => void;
  loading: boolean;
}

export function BenefitCard({
  title,
  description,
  amount,
  available,
  claimed,
  period,
  icon: Icon,
  type,
  onClaim,
  loading
}: BenefitCardProps) {
  const isAvailable = available && !claimed;
  
  // Format currency
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);

  return (
    <div className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ${
      isAvailable 
        ? 'border-primary/50 bg-primary/5 hover:border-primary hover:shadow-lg hover:shadow-primary/10' 
        : 'border-zinc-800 bg-zinc-900/50 opacity-80'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${isAvailable ? 'bg-primary/20 text-primary' : 'bg-zinc-800 text-zinc-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
        {claimed ? (
          <span className="flex items-center gap-1 text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" /> Resgatado
          </span>
        ) : !available && (
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">
            <Lock className="w-3 h-3" /> Indisponível
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 mb-4 h-10">{description}</p>

      {period && (
        <div className="text-xs text-zinc-500 mb-2">
          Período: {period}
        </div>
      )}

      <div className="flex items-end justify-between mt-auto">
        <div>
          <span className="text-xs text-zinc-500 block">Valor do Bônus</span>
          <span className={`text-2xl font-bold ${isAvailable ? 'text-white' : 'text-zinc-500'}`}>
            {formattedAmount}
          </span>
        </div>

        <button
          onClick={() => onClaim(type)}
          disabled={!isAvailable || loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isAvailable
              ? 'bg-primary text-black hover:bg-primary/90 cursor-pointer'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processando...' : claimed ? 'Já Resgatado' : isAvailable ? 'Resgatar' : 'Bloqueado'}
        </button>
      </div>
    </div>
  );
}
