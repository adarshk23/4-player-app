
import React from 'react';
import { Player } from '../types';
import ScoreButton from './ScoreButton';

interface PlayerCardProps {
  player: Player;
  onScoreChange: (playerId: number, amount: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onScoreChange }) => {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col justify-between border-t-4 ${player.colorClasses.border}`}>
      <div className='text-center'>
        <h2 className={`text-2xl font-bold ${player.colorClasses.text}`}>{player.name}</h2>
      </div>
      <div className="my-4 text-center">
        <span className="text-6xl font-mono font-bold text-white tracking-tighter">{player.score}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-white">
        <ScoreButton onClick={() => onScoreChange(player.id, 5)} colorClasses={player.colorClasses}>+5</ScoreButton>
        <ScoreButton onClick={() => onScoreChange(player.id, 1)} colorClasses={player.colorClasses}>+1</ScoreButton>
        <ScoreButton onClick={() => onScoreChange(player.id, -5)} colorClasses={player.colorClasses}>-5</ScoreButton>
        <ScoreButton onClick={() => onScoreChange(player.id, -1)} colorClasses={player.colorClasses}>-1</ScoreButton>
      </div>
    </div>
  );
};

export default PlayerCard;
