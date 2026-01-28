import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  homeIcon: string;
  awayIcon: string;
}

const PopularBetsWidget = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMatches();
  }, []);

  const fetchPopularMatches = async () => {
    try {
      const res = await api.get('/sports/matches');
      // Transform API matches to widget format
      // We'll take the first 5 matches as "popular"
      const popularMatches = res.data.slice(0, 5).map((match: Match) => {
        // Simple logic to pick a selection: pick the favorite (lowest odd)
        const odds = match.odds || { home: 1, draw: 1, away: 1 };
        let selection = match.homeTeam;
        let odd = odds.home;
        
        if (odds.away < odd) {
          selection = match.awayTeam;
          odd = odds.away;
        }

        return {
          id: match.id,
          home: { name: match.homeTeam, logo: match.homeIcon || 'https://media.api-sports.io/football/teams/50.png' },
          away: { name: match.awayTeam, logo: match.awayIcon || 'https://media.api-sports.io/football/teams/39.png' },
          selection: selection,
          market: 'Vencedor do encontro',
          odd: odd,
          highlight: false
        };
      });
      setMatches(popularMatches);
    } catch (error) {
      console.error('Erro ao buscar apostas populares:', error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-slate-800">
        <div className="bg-[#FF4500] h-10 w-full animate-pulse opacity-50"></div>
        <div className="divide-y divide-slate-800">
            {[1, 2, 3].map(i => (
                <div key={i} className="p-3 animate-pulse">
                    <div className="flex justify-between mb-2">
                        <div className="h-4 w-20 bg-white/10 rounded"></div>
                        <div className="h-4 w-20 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                         <div className="h-4 w-32 bg-white/10 rounded"></div>
                         <div className="h-6 w-12 bg-white/10 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (matches.length === 0) return null;

  return (
    <div className="bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-slate-800">
      {/* Header */}
      <div className="bg-[#FF4500] px-3 py-2 flex justify-between items-center text-white">
        <span className="font-bold text-sm">Apostas populares</span>
        <button className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-800">
        {matches.map((match) => (
          <div key={match.id} className={`${match.highlight ? 'bg-[#FF4500]' : 'bg-[#0F1923] hover:bg-[#16222E]'} p-3 transition-colors cursor-pointer group`}>
            {/* Teams Row */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <img src={match.home.logo} alt={match.home.name} className="w-5 h-5 object-contain" />
                    <span className="text-sm font-medium text-white">{match.home.name}</span>
                </div>
                <span className={`text-xs mx-1 ${match.highlight ? 'text-white/80' : 'text-slate-500'}`}>x</span>
                <div className="flex items-center gap-2">
                    <img src={match.away.logo} alt={match.away.name} className="w-5 h-5 object-contain" />
                    <span className="text-sm font-medium text-white">{match.away.name}</span>
                </div>
            </div>

            {/* Selection & Odd Row */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-sm font-bold text-white">{match.selection}</div>
                    <div className={`text-xs ${match.highlight ? 'text-white/80' : 'text-slate-500'}`}>{match.market}</div>
                </div>
                <div className={`font-bold text-sm px-2 py-0.5 rounded ${match.highlight ? 'bg-black/20 text-white' : 'text-[#3B82F6]'}`}>
                    {match.odd?.toFixed(2)}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBetsWidget;
