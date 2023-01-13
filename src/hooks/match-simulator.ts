import React from 'react';
import { MatchSimulatorContext } from '../providers/MatchSimulatorProvider';

export const useMatchSimulator = () => {
  const {
    matchArena,
    updateMatchArena,
    matchSimulatorHandler,
    playedHistoryHandler,
    error,
  } = React.useContext(MatchSimulatorContext);

  return [
    matchArena,
    { updateMatchArena, matchSimulatorHandler, playedHistoryHandler },
    error,
  ];
};
