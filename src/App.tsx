import React, { useRef } from 'react';
import { Modal, Button, Table } from './components';
import { columnTemplate, sortedData } from './helpers/table';
import { useMatchSimulator, useMatch } from './hooks';

import './App.css';
import { MatchField, PickTeam, MatchArena, MatchLogs } from './containers';

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

  return (
    <div className="App flex flex-col items-center justify-start bg-gray-900 h-[100vh] w-full gap-4 pt-10">
      <h3 className="text-base text-white mb-2">Tournament Table</h3>
      <Table columns={columns} data={data} />
      <Button
        variant="secondary"
        text="Pick teams for match"
        onClick={() => updateMatchArena({ isArenaOpen: true })}
      />
      <MatchArena
        hostScore={hostScore}
        guestScore={guestScore}
        simulateResultHandler={simulateResultHandler}
      />
      <h3 className="text-base text-white mb-2">Matches History</h3>
      <MatchLogs />
    </div>
  );
};
export default App;
