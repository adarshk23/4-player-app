import React from 'react';
import { Player } from '../types';
import { TrophyIcon } from './icons';

interface LeaderboardProps {
  players: Player[];
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, onClose }) => {
  const maxScore = players.length > 0 ? players[0].score : 0;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm border border-gray-700 flex flex-col gap-6">
        <header className="text-center">
          <h2 className="text-3xl font-bold">Final Scores</h2>
        </header>

        <main>
          <ol className="space-y-3">
            {players.map((player) => (
              <li
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-lg text-lg ${player.score === maxScore && maxScore > 0 ? 'bg-amber-500/20' : 'bg-gray-700/50'}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-bold w-10 flex-shrink-0 ${player.score === maxScore && maxScore > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                    {player.score === maxScore && maxScore > 0 ? (
                        <TrophyIcon className="w-6 h-6 inline-block" />
                    ) : (
                        ''
                    )}
                  </span>
                  <span className={`${player.colorClasses.text} font-semibold`}>{player.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{player.score}</span>
              </li>
            ))}
          </ol>
        </main>

        <footer>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
          >
            Start New Game
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Leaderboard;
