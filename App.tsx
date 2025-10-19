
import React, { useState } from 'react';
import { Player } from './types';
import PlayerCard from './components/PlayerCard';
import { RotateCcwIcon } from './components/icons';

const initialPlayers: Player[] = [
  {
    id: 1,
    name: 'Player 1',
    score: 0,
    colorClasses: {
      bg: 'bg-rose-500',
      text: 'text-rose-400',
      border: 'border-rose-500',
      ring: 'focus:ring-rose-500',
    },
  },
  {
    id: 2,
    name: 'Player 2',
    score: 0,
    colorClasses: {
      bg: 'bg-sky-500',
      text: 'text-sky-400',
      border: 'border-sky-500',
      ring: 'focus:ring-sky-500',
    },
  },
  {
    id: 3,
    name: 'Player 3',
    score: 0,
    colorClasses: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-400',
      border: 'border-emerald-500',
      ring: 'focus:ring-emerald-500',
    },
  },
  {
    id: 4,
    name: 'Player 4',
    score: 0,
    colorClasses: {
      bg: 'bg-amber-500',
      text: 'text-amber-400',
      border: 'border-amber-500',
      ring: 'focus:ring-amber-500',
    },
  },
];

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const handleScoreChange = (playerId: number, amount: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, score: player.score + amount }
          : player
      )
    );
  };

  const handleResetScores = () => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({ ...player, score: 0 }))
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center my-6">
          <h1 className="text-4xl font-bold tracking-tight">Score Keeper</h1>
        </header>
        
        <main className="grid grid-cols-2 gap-4">
          {players.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              onScoreChange={handleScoreChange} 
            />
          ))}
        </main>

        <footer className="mt-8 text-center">
          <button 
            onClick={handleResetScores}
            className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
          >
            <RotateCcwIcon className="w-5 h-5" />
            Reset Scores
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
