import React, { useState } from 'react';

export default function QuantumAI() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAsk = () => {
    if (!query) return;
    setLoading(true);
    // Simulate AI delay
    setTimeout(() => {
      setLoading(false);
      setResponse(generateResponse(query));
    }, 1500);
  };

  const generateResponse = (q: string) => {
    const lowerQ = q.toLowerCase();
    if (lowerQ.includes('flamengo')) {
      return "Com base nos últimos 10 confrontos, o Flamengo venceu 6 vezes jogando em casa. A odd de 1.85 para vitória do Flamengo oferece 12% de value em relação à probabilidade calculada de 58%. Recomendação: Aposta moderada na vitória do Flamengo.";
    }
    if (lowerQ.includes('roi')) {
      return "Encontrei 3 oportunidades com ROI projetado acima de 10% hoje: \n1. Lakers -3.5 (NBA) - ROI 12%\n2. Man City vs Liverpool - Over 2.5 - ROI 11%\n3. Alcaraz 2-0 - ROI 10.5%";
    }
    return "Analisando base de dados em tempo real... Identifiquei padrões de alta probabilidade nos jogos da Premier League hoje. O mercado de 'Ambos Marcam' no jogo do Arsenal tem 72% de probabilidade estatística contra uma odd implícita de 60%.";
  };

  const suggestions = [
    "Melhor aposta Flamengo?",
    "Value bets hoje?",
    "Análise Lakers vs Warriors"
  ];

  return (
    <div 
        className="w-full bg-gradient-to-b from-[#1a1f2e] to-[#0f1219] rounded-xl border border-accent-gold/30 overflow-hidden relative group transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header */}
      <div className="p-3 bg-white/5 flex items-center gap-2 border-b border-white/5 cursor-default">
        <span className="text-xl">🧠</span>
        <div>
          <h3 className="text-sm font-bold text-white leading-none">Quantum AI</h3>
          <span className="text-[10px] text-accent-gold font-medium">Assistente Inteligente PRO</span>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col ${
          !isHovered ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'
      }`}>
      <div className="p-4 space-y-4">
        
        {/* Chat Area */}
        <div className="space-y-3">
          {response ? (
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-bold text-white">Análise em Tempo Real</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {response}
              </p>
              <button 
                onClick={() => { setResponse(null); setQuery(''); }}
                className="mt-2 text-[10px] text-accent-gold hover:underline"
              >
                Nova consulta
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400">
                O assistente Quantum analisa milhares de dados para encontrar as melhores oportunidades para você.
              </p>
              
              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => { setQuery(s); }}
                    className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pergunte ao Quantum AI..."
            className="w-full bg-black/20 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-xs text-white placeholder-gray-500 focus:border-accent-gold/50 focus:outline-none transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button 
            onClick={handleAsk}
            disabled={loading || !query}
            className="absolute right-2 top-1.5 text-accent-gold hover:text-white transition-colors disabled:opacity-30"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>

      </div>
      
      {/* Background Decor */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
    </div>
  );
}