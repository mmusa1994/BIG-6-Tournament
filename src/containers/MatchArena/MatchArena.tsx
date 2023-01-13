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

  return (
    <Modal
      title="Match Arena"
      show={isArenaOpen}
      close={() => closeModalHandler()}
      maxWidth="780px"
      minHeight="520px"
      actions={
        <Button
          onClick={() => closeModalHandler()}
          text="Cancel"
          variant="delete"
        />
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
