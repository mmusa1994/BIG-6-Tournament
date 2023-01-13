import React, { useRef } from 'react';
import { Modal, Button, Input, Table } from './components';
import { isValidResult, validationErrors } from './helpers/validations';
import { columnTemplate, sortedData } from './helpers/table';
import { useMatchSimulator, useMatch } from './hooks';

import './App.css';

const App: React.FC = () => {
  const hostScore = useRef<any>(null);
  const guestScore = useRef<any>(null);
  const [
    matchArena,
    { updateMatchArena, matchSimulatorHandler, playedHistoryHandler },
  ] = useMatchSimulator();

  const { isArenaOpen, hostTeam, guestTeam, teamsInPlay, error } = useMatch();

  const simulateResult = () => {
    hostScore.current.value = Math.floor(Math.random() * 5);
    guestScore.current.value = Math.floor(Math.random() * 5);
    updateMatchArena({ isResultSimulated: true });
  };

  const data = React.useMemo(() => sortedData(matchArena.data), [matchArena]);
  const columns = React.useMemo(() => columnTemplate, []);

  return (
    <div className="App flex flex-col items-center justify-start bg-gray-900 h-[100vh] w-full gap-4 pt-10">
      <Table columns={columns} data={data} />
      <Button
        variant="secondary"
        text="Pick teams for match"
        onClick={() => updateMatchArena({ isArenaOpen: true })}
      />

      <Modal
        title="Match Arena"
        show={isArenaOpen}
        close={() => {
          updateMatchArena({
            isArenaOpen: false,
            hostTeam: null,
            guestTeam: null,
            teamsInPlay: [],
          });
        }}
        maxWidth="780px"
        minHeight="520px"
        actions={
          <div className="w-full flex justify-end gap-2 mt-3">
            <Button
              onClick={() => {
                updateMatchArena({
                  isArenaOpen: false,
                  hostTeam: null,
                  guestTeam: null,
                  teamsInPlay: [],
                });
              }}
              text="Cancel"
              variant="secondary"
            />
          </div>
        }
      >
        {teamsInPlay.length < 2 && (
          <div className="h-[310px]">
            <div className="flex flex-col">
              <h3 className="text-white text-xs font-bold bg-green-700 w-max p-1 m-1">
                Pick the host
              </h3>
              <div className="flex flex-wrap">
                {matchArena.data.map((club: any) => (
                  <div
                    key={club.id}
                    className={`flex flex-col items-center justify-start w-[100px] cursor-pointer rounded hover:bg-gray-600 m-1
                    ${hostTeam?.id === club.id && 'bg-gray-400'}
                    `}
                    onClick={() => {
                      updateMatchArena({ hostTeam: club });
                    }}
                  >
                    <img
                      className="h-[75px] w-[75px] m-2 object-contain"
                      src={club?.logo}
                      alt="logo"
                    />
                    <p className="text-white text-center">{`${club.name}`}</p>
                  </div>
                ))}
              </div>
            </div>
            {hostTeam?.played?.length < 5 && (
              <div className="mt-2">
                <h3 className="text-white text-xs font-bold bg-orange-700 w-max p-1 m-1">
                  Pick the guest
                </h3>
                <div className="flex flex-wrap">
                  {matchArena.data.map(
                    (club: any) =>
                      !hostTeam?.played?.includes(club.id) &&
                      hostTeam?.id !== club.id && (
                        <div
                          key={club.id}
                          className={`flex flex-col items-center justify-start w-[100px] cursor-pointer rounded hover:bg-gray-600 m-1
                    ${hostTeam?.id === club.id && 'bg-gray-400'}
                    `}
                          onClick={() => {
                            updateMatchArena({
                              guestTeam: club,
                              teamsInPlay: [hostTeam, guestTeam],
                            });
                          }}
                        >
                          <img
                            className="h-[75px] w-[75px] m-2 object-contain"
                            src={club?.logo}
                            alt="logo"
                          />
                          <p className="text-white text-center">{`${club.name}`}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {hostTeam?.played?.length >= 5 && (
              <p className="text-white bg-blue-700 p-2 w-max mt-1">
                This team played all them matches
              </p>
            )}
          </div>
        )}

        {teamsInPlay.length === 2 && (
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
                simulateResult();

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
        )}
      </Modal>
    </div>
  );
};
export default App;
