import React from 'react';
import { MatchField, PickTeam } from '..';
import { Button, Modal } from '../../components';
import { useMatch, useMatchSimulator } from '../../hooks';
import { IMatchArena } from '../../types/types';

const MatchArena: React.FC<IMatchArena> = ({
  hostScore,
  guestScore,
  simulateResultHandler,
}) => {
  const [matchArena, { updateMatchArena }] = useMatchSimulator();
  const { isArenaOpen, teamsInPlay } = useMatch();

  const closeModalHandler = () => {
    updateMatchArena({
      isArenaOpen: false,
      hostTeam: null,
      guestTeam: null,
      teamsInPlay: [],
    });
  };
  const activeMatch = teamsInPlay.length > 1;

  return (
    <Modal
      title="Match Arena"
      show={isArenaOpen}
      close={() => closeModalHandler()}
      maxWidth="780px"
      minHeight="520px"
      actions={
        <div className="flex flx-wrap items-center justify-between w-full gap-2">
          {!activeMatch ? (
            <p className="italic text-gray-400">
              Hint: Each team can play against other teams just once
            </p>
          ) : (
            <p className="italic text-gray-400">
              Hint: You can simulate or manually enter the result in the input
              field
            </p>
          )}
          <Button
            onClick={() => closeModalHandler()}
            text="Cancel"
            variant="delete"
          />
        </div>
      }
    >
      {teamsInPlay.length < 2 ? (
        <PickTeam />
      ) : (
        <MatchField
          hostScore={hostScore}
          guestScore={guestScore}
          simulateResultHandler={simulateResultHandler}
        />
      )}
    </Modal>
  );
};

export default MatchArena;
