import React, { useState, useRef } from 'react';
import { Modal, Button, Input, Table } from './components';
import { isValidResult, validationErrors } from './helpers/validations';
import data1 from './data/data.json';

import './App.css';

const App: React.FC = () => {
  const [stateData, setStateData] = useState<any>(data1);
  const [toggle, setToggle] = useState<boolean>(false);
  const [pickedHostTeam, setPickedHostTeam] = useState<any>(null);
  const [match, setMatch] = useState<any>([]);
  const [numOfPlayedMatch, setNumOfPlayedMatch] = useState<number>(0);
  const [inputError, setInputError] = useState<string>('');
  const [simulatedResult, setSimulatedResult] = useState<boolean>(false);
  const team1Result = useRef<any>(null);
  const team2Result = useRef<any>(null);

  const openMatchArea = () => {
    setToggle(true);
  };

  const playMatchHandler = (team1: any, team2: any) => {
    const t1r = team1Result.current.value;
    const t2r = team2Result.current.value;

    const newStateData = stateData.map((club: any) => {
      if (t1r > t2r && team1.id === club.id) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 3,
        };
      } else if (t1r < t2r && team2.id === club.id) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 3,
        };
      } else if (
        t1r === t2r &&
        (team2.id === club.id || team1.id === club.id)
      ) {
        return {
          ...club,
          numOfPoints: club.numOfPoints + 1,
        };
      } else return club;
    });
    setStateData(newStateData);
    setMatch([]);
    setNumOfPlayedMatch(numOfPlayedMatch + 1);
    setSimulatedResult(false);
    setToggle(false);
    setPickedHostTeam(null);
  };

  const pickGuestHandler = (team: any) => {
    const hostTeam = stateData.find((el: any) => pickedHostTeam?.id === el.id);
    const newStateData = stateData.map((club: any) => {
      if (hostTeam.id === club?.id) {
        return {
          ...club,
          played: [...club.played, team.id],
        };
      } else if (team.id === club?.id) {
        return {
          ...club,
          played: [...club.played, hostTeam.id],
        };
      } else return club;
    });
    setStateData(newStateData);
    setPickedHostTeam(
      newStateData.find((el: any) => el.id === pickedHostTeam?.id)
    );
    setMatch([hostTeam, team]);
  };

  const simulateResult = () => {
    team1Result.current.value = Math.floor(Math.random() * 5);
    team2Result.current.value = Math.floor(Math.random() * 5);
    setSimulatedResult(true);
  };

  const data = React.useMemo(
    () =>
      stateData?.sort((a: any, b: any) =>
        a.numOfPoints > b.numOfPoints ? -1 : 1
      ),
    [stateData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'POSITION',
        accessor: 'logo',
      },
      {
        Header: 'LOGO',
        accessor: 'name',
      },
      {
        Header: 'NAME',
        accessor: 'numOfPoints',
      },
      {
        Header: 'POINTS',
      },
    ],
    []
  );

  const disableBtnState = !!inputError || !simulatedResult;

  return (
    <div className="App flex flex-col items-center justify-center bg-gray-700 h-[100vh] w-full gap-4">
      <Table columns={columns} data={data} defaultColumn={1} />
      <Button
        variant="secondary"
        text="Pick teams for match"
        onClick={() => openMatchArea()}
      />

      <Modal
        title="Match Arena"
        show={toggle}
        close={() => {
          setToggle(false);
          setPickedHostTeam(null);
          match.length && setMatch([]);
        }}
        maxWidth="780px"
        minHeight="520px"
        actions={
          <div className="w-full flex justify-end gap-2 mt-3">
            <Button
              onClick={() => {
                setToggle(false);
                setPickedHostTeam(null);
                match.length && setMatch([]);
              }}
              text="Cancel"
              variant="secondary"
            />
          </div>
        }
      >
        {match?.length < 2 && (
          <div className="h-[310px]">
            <div className="flex flex-col">
              <h3 className="text-white text-xs font-bold bg-green-700 w-max p-1 m-1">
                Pick the host
              </h3>
              <div className="flex flex-wrap">
                {stateData.map((club: any) => (
                  <div
                    key={club.id}
                    className={`flex flex-col items-center justify-start w-[100px] cursor-pointer rounded hover:bg-gray-600 m-1
                    ${pickedHostTeam?.id === club.id && 'bg-gray-400'}
                    `}
                    onClick={() => setPickedHostTeam(club)}
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
            {pickedHostTeam?.played.length < 5 && (
              <div className="mt-2">
                <h3 className="text-white text-xs font-bold bg-orange-700 w-max p-1 m-1">
                  Pick the guest
                </h3>
                <div className="flex">
                  {stateData.map(
                    (club: any) =>
                      !pickedHostTeam?.played?.includes(club.id) &&
                      pickedHostTeam?.id !== club.id && (
                        <div
                          key={club.id}
                          className={`flex flex-col items-center justify-start w-[100px] cursor-pointer rounded hover:bg-gray-600 m-1
                    ${pickedHostTeam?.id === club.id && 'bg-gray-400'}
                    `}
                          onClick={() => pickGuestHandler(club)}
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
            {pickedHostTeam?.played.length >= 5 && (
              <p className="text-white">Played all matches</p>
            )}
          </div>
        )}

        {match.length === 2 && (
          <div className="flex flex-col items-center justify-center gap-4 h-[400px]">
            <div className="flex flex-wrap items-center justify-center gap-2 w-full">
              <div className="flex flex-col items-center justify-center w-1/5">
                <img
                  key={match[0].id}
                  className="h-[90px] w-[90px] m-2 object-contain"
                  src={match[0]?.logo}
                  alt="logo"
                />
                <p className="text-center text-xs text-gray-200 font-semibold">
                  {match[0].name}
                </p>
              </div>
              <div className="h-[50px]">
                <Input
                  width="80px"
                  name="team1Result"
                  inputRef={team1Result}
                  required
                  type="number"
                  onChange={(e) => {
                    !isValidResult(e.target.value)
                      ? setInputError(validationErrors.inputError)
                      : setInputError('');
                    team1Result.current.value = e.target.value;
                  }}
                  errorMessage={inputError}
                />
              </div>
              <p className="text-xl text-white">vs</p>
              <div className="h-[50px]">
                <Input
                  width="80px"
                  name="team1Result"
                  inputRef={team2Result}
                  required
                  type="number"
                  onChange={(e) => {
                    !isValidResult(e.target.value)
                      ? setInputError(validationErrors.inputError)
                      : setInputError('');
                    team2Result.current.value = e.target.value;
                  }}
                  errorMessage={inputError}
                />
              </div>
              <div className="flex flex-col items-center justify-center w-1/5">
                <img
                  key={match[1].id}
                  className="h-[100px] w-[100px] m-2 object-contain"
                  src={match[1]?.logo}
                  alt="logo"
                />
                <p className="text-center text-xs text-gray-200 font-semibold">
                  {match[1].name}
                </p>
              </div>
            </div>
            <Button
              size="178px"
              variant="secondary"
              text="Simulate Result"
              onClick={() => simulateResult()}
            />
            <Button
              size="178px"
              text="Confirm Result"
              onClick={() => playMatchHandler(match[0], match[1])}
              disabled={disableBtnState}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
export default App;
