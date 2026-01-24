import React from 'react';

const LongTermBetsWidget = () => {
  const leagues = [
    { id: 1, name: 'Champions League • Principal', icon: '⚽' },
    { id: 2, name: 'Europa League • Vencedor', icon: '🏆' },
    { id: 3, name: 'Bundesliga • Principal', icon: '🇩🇪' },
  ];

  return (
    <div className="bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-slate-800 mt-4">
      {/* Header */}
      <div className="bg-[#FF4500] px-3 py-2 flex justify-between items-center text-white">
        <span className="font-bold text-sm">Longo prazo</span>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-800">
        {leagues.map((league) => (
          <div key={league.id} className="bg-[#0F1923] hover:bg-[#16222E] p-3 transition-colors cursor-pointer flex items-center gap-3">
             <span className="text-lg">{league.icon}</span>
             <span className="text-sm font-medium text-white">{league.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongTermBetsWidget;
