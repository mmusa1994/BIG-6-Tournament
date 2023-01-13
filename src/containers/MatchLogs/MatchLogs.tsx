import React from 'react';
import { useMatchSimulator } from '../../hooks';

const MatchLogs: React.FC = () => {
  const [matchArena] = useMatchSimulator();
  const { playedMatches } = matchArena;
  console.log(playedMatches);
  return (
    <div className="max-h-[200px] overflow-auto">
      {playedMatches.map((match: any, i: number) => {
        const hostName = match.hostTeam.name;
        const hostScore = match.hostTeam.score;
        const guestName = match.guestTeam.name;
        const guestScore = match.guestTeam.score;

        const hostWinner = hostScore > guestScore;
        const guestWinner = hostScore < guestScore;
        const draw = hostScore === guestScore;

        return (
          <div
            className="flex flex-wrap items-center justify-center text-white text-center gap-1 mb-2 border rounded-sm border-gray-500 p-2"
            key={i}
          >
            <span>{hostName}</span>
            <span
              className={`text-xs ml-2 
                          ${hostWinner && 'bg-green-700 p-1'} 
                          ${guestWinner && 'bg-red-700 p-1'}
                          ${draw && 'bg-yellow-600 p-1'}
                          `}
            >
              {hostScore}
            </span>
            vs
            <span
              className={`text-xs mr-2 
                          ${guestWinner && 'bg-green-700 p-1'} 
                          ${hostWinner && 'bg-red-700 p-1'}
                          ${draw && 'bg-yellow-600 p-1'}
                          `}
            >
              {guestScore}
            </span>
            <span>{guestName}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MatchLogs;
