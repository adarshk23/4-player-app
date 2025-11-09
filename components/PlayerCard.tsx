import React, { useState, useRef, useEffect } from 'react';
import { Player } from '../types';
import ScoreButton from './ScoreButton';
import { TrophyIcon } from './icons';

interface PlayerCardProps {
  player: Player;
  onScoreChange: (playerId: number, amount: number) => void;
  onNameChange: (playerId: number, newName: string) => void;
  isWinner: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onScoreChange, onNameChange, isWinner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleNameSubmit = () => {
    if (nameValue.trim() && nameValue.trim() !== player.name) {
      onNameChange(player.id, nameValue.trim());
    } else {
      setNameValue(player.name); // Revert if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setNameValue(player.name);
      setIsEditing(false);
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col justify-between border-t-4 ${player.colorClasses.border}`}>
      <div className='text-center'>
        <div className="flex items-center justify-center gap-2 min-h-[36px]">
          {isWinner && <TrophyIcon className={`w-6 h-6 text-amber-400`} />}
          {isEditing ? (
            <input 
              ref={inputRef}
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className={`text-2xl font-bold ${player.colorClasses.text} bg-gray-900/50 text-center w-full outline-none ring-2 ${player.colorClasses.ring} rounded-md p-1`}
            />
          ) : (
            <h2 
              onClick={() => setIsEditing(true)}
              className={`text-2xl font-bold ${player.colorClasses.text} cursor-pointer hover:opacity-75 p-1 rounded-md`}
              title="Click to edit name"
            >
              {player.name}
            </h2>
          )}
           {isWinner && <div className="w-6 h-6"></div>}
        </div>
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
