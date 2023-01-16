import React from 'react';
import { useMatch, useMatchSimulator } from '../../hooks';

import './pick-team.css';

const PickTeam: React.FC = () => {
  const [matchArena, { updateMatchArena }] = useMatchSimulator();
  const { hostTeam, guestTeam } = useMatch();

  return (
    <div className="h-[320px]">
      <div className="flex flex-col">
        <h3 className="header text-white font-bold bg-green-700 w-max p-1 m-1">
          Pick the host
        </h3>
        <div className="flex flex-wrap">
          {matchArena.data.map((club: any) => (
            <div
              key={club.id}
              className={`club-container flex flex-col items-center justify-start cursor-pointer rounded hover:bg-gray-600 m-1
                          ${hostTeam?.id === club.id && 'bg-gray-400'}`}
              onClick={() => {
                updateMatchArena({ hostTeam: club });
              }}
            >
              <img
                className="logo m-2 object-contain"
                src={club?.logo}
                alt="logo"
              />
              <p className="text-white text-center">{`${club.name}`}</p>
            </div>
          ))}
        </div>
      </div>
      {hostTeam?.played?.length < 5 && (
        <div className="mt-2">
          <h3 className="header text-white font-bold bg-orange-700 w-max p-1 m-1">
            Pick the guest
          </h3>
          <div className="flex flex-wrap">
            {matchArena.data.map(
              (club: any) =>
                !hostTeam?.played?.includes(club.id) &&
                hostTeam?.id !== club.id && (
                  <div
                    key={club.id}
                    className={`club-container flex flex-col items-center justify-start w-[100px] cursor-pointer rounded hover:bg-gray-600 m-1
                                ${hostTeam?.id === club.id && 'bg-gray-400'}`}
                    onClick={() => {
                      updateMatchArena({
                        guestTeam: club,
                        teamsInPlay: [hostTeam, guestTeam],
                      });
                    }}
                  >
                    <img
                      className="logo m-2 object-contain"
                      src={club?.logo}
                      alt="logo"
                    />
                    <p className="text-white text-center">{`${club.name}`}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {hostTeam?.played?.length >= 5 && (
        <p className="text-white bg-blue-700 p-2 w-max mt-1">
          This team played all matches
        </p>
      )}
    </div>
  );
};

export default PickTeam;
