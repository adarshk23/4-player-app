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
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleScoreChange = (playerId: number, amount: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, score: player.score + amount }
          : player
      )
    );
  };
  
  const handleNameChange = (playerId: number, newName: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId ? { ...player, name: newName } : player
      )
    );
  };

  const confirmResetScores = () => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({ ...player, score: 0 }))
    );
    setIsResetModalOpen(false);
  };

  const scores = players.map(p => p.score);
  const maxScore = Math.max(...scores);
  const hasScores = scores.some(s => s !== 0);
  
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524293581270-99431958042d?q=80&w=1974&auto=format&fit=crop')" }}
    >
      <div className="min-h-screen bg-gray-900/80 backdrop-blur-sm text-white font-sans p-4">
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
                onNameChange={handleNameChange}
                isWinner={hasScores && player.score === maxScore}
              />
            ))}
          </main>

          <footer className="mt-8 text-center">
            <button 
              onClick={() => setIsResetModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
            >
              <RotateCcwIcon className="w-5 h-5" />
              Reset Scores
            </button>
          </footer>
        </div>

        {isResetModalOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
          >
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Reset Scores?</h2>
              <p className="text-gray-400 mb-6">Are you sure you want to reset all scores to zero? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResetScores}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
