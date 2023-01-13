import React from 'react';
import clubsData from '../data/data.json';
import { IMatchSimulatorData } from '../types/types';

export const MatchSimulatorContext = React.createContext<IMatchSimulatorData>({
  matchArena: { data: null },
  error: undefined,
  hostTeam: null,
  guestTeam: null,
  teamsInPlay: [],
  isArenaOpen: false,
  isResultSimulated: false,
  updateMatchArena: () => null,
  matchSimulatorHandler: () => null,
  playedHistoryHandler: () => null,
});

export const MatchSimulatorProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [matchArena, setMatchArena] = React.useState({
    data: clubsData,
    isArenaOpen: false,
    hostTeam: { id: 0, score: 0 },
    guestTeam: { id: 0, score: 0 },
    teamsInPlay: [],
    isResultSimulated: false,
    playedMatches: [],
    error: undefined,
  });

  let {
    data,
    hostTeam,
    guestTeam,
    isArenaOpen,
    teamsInPlay,
    isResultSimulated,
    playedMatches,
    error,
  } = matchArena;

  const updateMatchArena = (data: any) => {
    setMatchArena((matchArena) => ({
      ...Object.assign(matchArena, data),
    }));
  };

  const matchSimulatorHandler = (score1: number, score2: number) => {
    const t1r = score1;
    const t2r = score2;

    const updatedData = data.map((club: any) => {
      if (t1r > t2r && hostTeam.id === club.id) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 3,
        };
      } else if (t1r < t2r && guestTeam.id === club.id) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 3,
        };
      } else if (
        t1r === t2r &&
        (guestTeam.id === club.id || hostTeam.id === club.id)
      ) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 1,
        };
      } else return club;
    });

    data = updatedData;
    hostTeam.score = t1r;
    guestTeam.score = t2r;

    updateMatchArena({
      isResultSimulated: false,
      isArenaOpen: false,
    });
  };

  const playedHistoryHandler = () => {
    const updatedData = data.map((club: any) => {
      if (hostTeam.id === club.id) {
        return {
          ...club,
          played: [...club.played, guestTeam.id],
        };
      } else if (guestTeam.id === club.id) {
        return {
          ...club,
          played: [...club.played, hostTeam.id],
        };
      } else return club;
    });

    updateMatchArena({
      data: updatedData,
      teamsInPlay: [hostTeam, guestTeam],
      playedMatches: [...playedMatches, { hostTeam, guestTeam }],
      hostTeam: null,
      guestTeam: null,
    });

    console.log(matchArena);
  };

  return (
    <MatchSimulatorContext.Provider
      value={{
        matchArena,
        updateMatchArena,
        matchSimulatorHandler,
        playedHistoryHandler,
        error,
        hostTeam,
        guestTeam,
        teamsInPlay,
        isArenaOpen,
        isResultSimulated,
      }}
    >
      {children}
    </MatchSimulatorContext.Provider>
  );
};
