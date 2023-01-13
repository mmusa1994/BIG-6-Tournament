import React from 'react';
import { MatchSimulatorContext } from '../providers/MatchSimulatorProvider';

export const useMatch = () => {
  const {
    isArenaOpen,
    isResultSimulated,
    hostTeam,
    guestTeam,
    teamsInPlay,
    error,
  } = React.useContext(MatchSimulatorContext);

  return {
    isArenaOpen,
    isResultSimulated,
    hostTeam,
    guestTeam,
    teamsInPlay,
    error,
  };
};
