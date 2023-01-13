import React, { useRef } from 'react';
import { Button, Table } from './components';
import { MatchArena, MatchLogs } from './containers';
import { useMatchSimulator } from './hooks';
import { columnTemplate, sortedData } from './helpers/table';

const App: React.FC = () => {
  const hostScore = useRef<any>(null);
  const guestScore = useRef<any>(null);
  const [matchArena, { updateMatchArena }] = useMatchSimulator();

  const simulateResultHandler = () => {
    hostScore.current.value = Math.floor(Math.random() * 5);
    guestScore.current.value = Math.floor(Math.random() * 5);
    updateMatchArena({ isResultSimulated: true });
  };

  const data = React.useMemo(() => sortedData(matchArena.data), [matchArena]);
  const columns = React.useMemo(() => columnTemplate, []);
  const allMatchPlayed = matchArena.playedMatches.length === 15;
  const playBtnText = allMatchPlayed
    ? 'Tournament finished'
    : 'Pick teams for match';

  return (
    <div className="flex flex-col items-center justify-start text-center bg-gray-900 h-[100vh] w-full gap-4 pt-10">
      <h3 className="text-base text-white mb-2">Tournament Table</h3>
      <Table columns={columns} data={data} allMatchPlayed={allMatchPlayed} />
      <Button
        variant="secondary"
        text={playBtnText}
        onClick={() => updateMatchArena({ isArenaOpen: true })}
        disabled={allMatchPlayed}
      />
      <MatchArena
        hostScore={hostScore}
        guestScore={guestScore}
        simulateResultHandler={simulateResultHandler}
      />
      {matchArena.playedMatches.length && (
        <>
          <h3 className="text-base text-white mb-2">Matches History</h3>
          <MatchLogs />
        </>
      )}
    </div>
  );
};
export default App;
