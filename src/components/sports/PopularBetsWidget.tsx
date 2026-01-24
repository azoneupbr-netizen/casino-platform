import React from 'react';

const PopularBetsWidget = () => {
  const matches = [
    {
      id: 1,
      home: { name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
      away: { name: 'Wolverhampton', logo: 'https://media.api-sports.io/football/teams/39.png' },
      selection: 'Manchester City',
      market: 'Vencedor do encontro',
      odd: 1.33,
      highlight: false
    },
    {
      id: 2,
      home: { name: 'FC Arouca', logo: 'https://media.api-sports.io/football/teams/223.png' },
      away: { name: 'Sporting', logo: 'https://media.api-sports.io/football/teams/228.png' },
      selection: 'Sporting',
      market: 'Vencedor do encontro',
      odd: 1.30,
      highlight: false
    },
    {
      id: 3,
      home: { name: 'Villarreal CF', logo: 'https://media.api-sports.io/football/teams/533.png' },
      away: { name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
      selection: 'Real Madrid',
      market: 'Vencedor do encontro',
      odd: 1.87,
      highlight: true
    },
    {
      id: 4,
      home: { name: 'PSV Eindhoven', logo: 'https://media.api-sports.io/football/teams/197.png' },
      away: { name: 'NAC Breda', logo: 'https://media.api-sports.io/football/teams/204.png' },
      selection: 'PSV Eindhoven',
      market: 'Vencedor do encontro',
      odd: 1.33,
      highlight: false
    },
    {
      id: 5,
      home: { name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
      away: { name: 'Real Oviedo', logo: 'https://media.api-sports.io/football/teams/546.png' },
      selection: 'FC Barcelona',
      market: 'Vencedor do encontro',
      odd: 1.10,
      highlight: false
    }
  ];

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
                    {match.odd.toFixed(2)}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBetsWidget;
