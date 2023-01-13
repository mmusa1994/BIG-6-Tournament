import React from 'react';
import { Button, Input } from '../../components';
import { isValidResult, validationErrors } from '../../helpers/validations';
import { useMatch, useMatchSimulator } from '../../hooks';

type Props = {
  hostScore: any;
  guestScore: any;
  simulateResultHandler: () => void;
};

const MatchField: React.FC<Props> = ({
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
    <div>
      <div className="flex flex-col items-center justify-center gap-4 h-[400px]">
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          <div className="flex flex-col items-center justify-center w-1/5">
            <img
              key={hostTeam.id}
              className="h-[90px] w-[90px] m-2 object-contain"
              src={hostTeam?.logo}
              alt="logo"
            />
            <p className="text-center text-xs text-gray-200 font-semibold">
              {hostTeam.name}
            </p>
          </div>
          <div className="h-[50px]">
            <Input
              width="80px"
              name="hostScore"
              inputRef={hostScore}
              required={true}
              type="number"
              onChange={(e) => {
                console.log(e.target.value);
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
          <div className="flex flex-col items-center justify-center w-1/5">
            <img
              key={guestTeam.id}
              className="h-[100px] w-[100px] m-2 object-contain"
              src={guestTeam?.logo}
              alt="logo"
            />
            <p className="text-center text-xs text-gray-200 font-semibold">
              {guestTeam.name}
            </p>
          </div>
        </div>
        <Button
          size="178px"
          variant="secondary"
          text="Simulate Result"
          onClick={() => {
            simulateResultHandler();
            updateMatchArena({ isResultSimulated: true, error: null });
          }}
        />
        <Button
          size="178px"
          text="Confirm Result"
          onClick={() => {
            matchSimulatorHandler(
              Number(hostScore.current.value),
              Number(guestScore.current.value)
            );
            playedHistoryHandler();
            updateMatchArena({ teamsInPlay: [] });
          }}
          disabled={
            error || !hostScore.current?.value || !guestScore.current?.value
          }
        />
      </div>
    </div>
  );
};

export default MatchField;
