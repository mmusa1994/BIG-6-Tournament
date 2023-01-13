import React from 'react';
import { MatchField, PickTeam } from '..';
import { Button, Modal } from '../../components';
import { useMatch, useMatchSimulator } from '../../hooks';

type Props = {
  hostScore: any;
  guestScore: any;
  simulateResultHandler: () => void;
};

const MatchArena: React.FC<Props> = ({
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
          variant="secondary"
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
