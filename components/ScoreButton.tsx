
import React from 'react';

interface ScoreButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  colorClasses: {
    text: string;
    ring: string;
  };
}

const ScoreButton: React.FC<ScoreButtonProps> = ({ onClick, children, className = '', colorClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-2 text-center text-lg font-semibold rounded-md transition-colors duration-200 bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 ${colorClasses.ring} ${className}`}
    >
      {children}
    </button>
  );
};

export default ScoreButton;
