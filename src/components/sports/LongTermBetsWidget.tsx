import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Match {
    league: string;
}

const LongTermBetsWidget = () => {
  const [leagues, setLeagues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
        try {
            const res = await api.get('/sports/matches');
            const matches: Match[] = res.data;
            const uniqueLeagues = Array.from(new Set(matches.map(m => m.league))).slice(0, 5);
            setLeagues(uniqueLeagues);
        } catch (error) {
            console.error('Error fetching leagues:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchLeagues();
  }, []);

  if (loading || leagues.length === 0) return null;

  return (
    <div className="bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-slate-800 mt-4">
      {/* Header */}
      <div className="bg-[#FF4500] px-3 py-2 flex justify-between items-center text-white">
        <span className="font-bold text-sm">Ligas Disponíveis</span>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-800">
        {leagues.map((league, index) => (
          <div key={index} className="bg-[#0F1923] hover:bg-[#16222E] p-3 transition-colors cursor-pointer flex items-center gap-3">
             <span className="text-lg">🏆</span>
             <span className="text-sm font-medium text-white">{league}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongTermBetsWidget;
