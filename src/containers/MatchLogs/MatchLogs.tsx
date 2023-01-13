import React from 'react';
import { useMatchSimulator } from '../../hooks';

const MatchLogs: React.FC = () => {
  const [matchArena] = useMatchSimulator();
  const { playedMatches } = matchArena;

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
            className="flex flex-wrap items-center justify-start text-white text-center gap-1 mb-2 border rounded-sm border-gray-500 p-2"
            key={i}
          >
            <span className="w-[155px]">{hostName}</span>

            <div className="w-[80px]">
              <span
                className={`text-xs ml-2 mr-1
                          ${hostWinner && 'bg-green-700 p-1'} 
                          ${guestWinner && 'bg-red-700 p-1'}
                          ${draw && 'bg-yellow-600 p-1'}
                          `}
              >
                {hostScore}
              </span>
              vs
              <span
                className={`text-xs mr-2 ml-1
                          ${guestWinner && 'bg-green-700 p-1'} 
                          ${hostWinner && 'bg-red-700 p-1'}
                          ${draw && 'bg-yellow-600 p-1'}
                          `}
              >
                {guestScore}
              </span>
            </div>
            <span className="w-[155px]">{guestName}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MatchLogs;
