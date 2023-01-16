import React from 'react';
import { CheckCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Button, Input } from '../../components';
import { isValidResult, validationErrors } from '../../helpers/validations';
import { useMatch, useMatchSimulator } from '../../hooks';
import { IMatchArena } from '../../types/types';

import './match-field.css';

const MatchField: React.FC<IMatchArena> = ({
  hostScore,
  guestScore,
  simulateResultHandler,
}) => {
  const [
    matchArena,
    { updateMatchArena, matchSimulatorHandler, playedHistoryHandler },
  ] = useMatchSimulator();
  const { hostTeam, guestTeam, error } = useMatch();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[400px]">
      <div className="result-container flex flex-wrap items-center justify-center gap-2 w-full">
        <div className="flex flex-col items-center justify-center w-1/4">
          <img
            key={hostTeam?.id}
            className="match-logo m-2 object-contain"
            src={hostTeam?.logo}
            alt="logo"
          />
          <p className="text-center text-xs text-gray-200 font-semibold">
            {hostTeam?.name}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 w-[300px]">
          <div className="h-[50px]">
            <Input
              width="80px"
              name="hostScore"
              inputRef={hostScore}
              required={true}
              type="number"
              onChange={(e) => {
                !isValidResult(e.target.value)
                  ? updateMatchArena({ error: validationErrors.inputError })
                  : updateMatchArena({ error: null });
                hostScore.current.value = e.target.value;
              }}
              errorMessage={error}
            />
          </div>
          <p className="text-xl text-white">vs</p>
          <div className="h-[50px]">
            <Input
              width="80px"
              name="guestScore"
              inputRef={guestScore}
              required
              type="number"
              onChange={(e) => {
                !isValidResult(e.target.value)
                  ? updateMatchArena({ error: validationErrors.inputError })
                  : updateMatchArena({ error: null });
                guestScore.current.value = e.target.value;
              }}
              errorMessage={error}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/4">
          <img
            key={guestTeam?.id}
            className="match-logo m-2 object-contain"
            src={guestTeam?.logo}
            alt="logo"
          />
          <p className="text-center text-xs text-gray-200 font-semibold">
            {guestTeam?.name}
          </p>
        </div>
      </div>
      <Button
        size="205px"
        variant="secondary"
        text="Simulate Result"
        icon={<PlayIcon className="w-4 h-4" />}
        onClick={() => {
          simulateResultHandler();
          updateMatchArena({ isResultSimulated: true, error: null });
        }}
      />
      <Button
        size="205px"
        text="Confirm Result"
        icon={<CheckCircleIcon className="w-5 h-5" />}
        onClick={() => {
          matchSimulatorHandler(
            Number(hostScore.current.value),
            Number(guestScore.current.value)
          );
          playedHistoryHandler();
          updateMatchArena({ teamsInPlay: [] });
        }}
        disabled={
          !!error || !hostScore.current?.value || !guestScore.current?.value
        }
      />
    </div>
  );
};

export default MatchField;
