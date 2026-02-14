'use client';

import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Button, Center, Loader, Stack } from '@mantine/core';
import { GameState, useGame } from '@/client/contexts/GameContext';
import { StyledMultiSelect } from '../../Selects/StyledMultiSelect';
import { StyledSelect } from '../../Selects/StyledSelect';
import { Player } from '@/types/player';
import { createRound, getAllRoundsByID } from '@/client/apis/roundAPI';
import { fromIRound, Round } from '@/types/round';
import { PlayerRoundTable } from '../../Tables/PlayerRoundTable/PlayerRoundTable';
import { RoundTable } from '../../Tables/RoundTable/RoundTable';
import { deleteGameById } from '@/client/apis/gameAPI';
import { useDisclosure } from '@mantine/hooks';
import { DeleteGameModal } from './DeleteGameModal';

const areFieldsValid = (
  winningTeam: Player[],
  otherTeam: Player[],
  pointsScored: string,
  dealer: Player | undefined,
) => {
  return !(
    winningTeam.length === 0 ||
    otherTeam.length === 0 ||
    (pointsScored !== '0' &&
      pointsScored !== '1' &&
      pointsScored !== '2' &&
      pointsScored !== '3') ||
    dealer === undefined
  );
};

export const NewRound = () => {
  const {
    gameId,
    players,
    roundNumber,
    setRoundNumber,
    startingRank,
    setGameState,
  } = useGame();
  const [winningTeam, setWinningTeam] = useState<Player[]>([]);
  const [pointsScored, setPointsScored] = useState<string>('0');
  const [dealer, setDealer] = useState<Player>();
  const [dealerKey, setDealerKey] = useState<number>(0); // used to remount component on submit
  const [showGameDetails, setShowGameDetails] = useState<boolean>(false);
  const [deleteModalOpen, { close, open }] = useDisclosure(false);

  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRoundsByID(gameId)
      .then((data) => {
        if (data.rounds) {
          setRounds(data.rounds.map((iRound) => fromIRound(iRound)));
        }
      })
      .finally(() => setLoading(false));
  }, [gameId, roundNumber]);

  const otherTeam = useMemo(() => {
    return players.filter((player) => !winningTeam.includes(player));
  }, [winningTeam]);

  const handleWinningTeamChange = (values: string[]) => {
    const selectedPlayers = players.filter((player) =>
      values.includes(player.name),
    );
    setWinningTeam(selectedPlayers);
  };

  const resetRoundFields = () => {
    setWinningTeam([]);
    setPointsScored('0');
    setDealer(undefined);
    setDealerKey((k) => k + 1);
  };

  const submitButtonStyles = {
    marginLeft: '1rem',
    marginTop: '2rem',
    pointerEvents: !areFieldsValid(winningTeam, otherTeam, pointsScored, dealer)
      ? 'none'
      : undefined,
    opacity: !areFieldsValid(winningTeam, otherTeam, pointsScored, dealer)
      ? '0.8'
      : '1',
  } as CSSProperties;

  const showDetailsButtonStyles = {
    marginLeft: '1rem',
    marginTop: '1rem',
  };

  const deleteGameButtonStyles = {
    marginLeft: '1rem',
    marginTop: '1rem',
    marginBottom: '2rem',
  };

  const handleCreateRound = async () => {
    try {
      if (winningTeam.length > 0 && dealer) {
        const roundData = await createRound(
          gameId,
          winningTeam,
          otherTeam,
          Number(pointsScored),
          dealer,
        );
        if (roundData.round) {
          const createdRound = fromIRound(roundData.round);
          setRoundNumber(createdRound.roundId + 1);
          resetRoundFields();
        }
      }
    } catch (err) {
      console.error('Error creating round:', err);
    }
  };

  const handleDeleteGame = async () => {
    try {
      await deleteGameById(String(gameId));
      resetRoundFields();
      setGameState(GameState.Home);
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  return (
    <Stack>
      {showGameDetails ? (
        <>
          <RoundTable gameId={gameId} />
          <Button
            variant="light"
            color="indigo"
            w={246}
            style={showDetailsButtonStyles}
            onClick={() => setShowGameDetails(false)}
          >
            Back
          </Button>
        </>
      ) : loading ? (
        <Center mt="xl">
          <Loader />
        </Center>
      ) : (
        <PlayerRoundTable pastRounds={rounds} startingRank={startingRank} />
      )}
      {!showGameDetails && (
        <>
          <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
            <b>Winning Team</b>
          </div>
          <StyledMultiSelect
            data={players.map((player) => player.name)}
            value={winningTeam.map((player) => player.name)}
            onChange={handleWinningTeamChange}
            w={246}
          />
          <div
            style={{
              marginLeft: '1rem',
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              width: '307.5px',
            }}
          >
            <b>Points Scored</b>
            <b>Dealer</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledSelect
              data={['0', '1', '2', '3']}
              value={pointsScored}
              w={80}
              onChange={(value) => setPointsScored(value || '0')}
            />
            <StyledSelect
              key={dealerKey}
              data={players.map((player) => player.name)}
              value={dealer ? dealer.name : ''}
              w={130}
              onChange={(value) =>
                setDealer(players.find((player) => player.name === value))
              }
            />
          </div>
          <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
            <b>Other Team</b>
          </div>
          <StyledMultiSelect
            data={players.map((player) => player.name)}
            value={otherTeam.map((player) => player.name)}
            w={246}
            disabled
          />
          <Button
            variant="light"
            color="indigo"
            w={246}
            style={submitButtonStyles}
            onClick={handleCreateRound}
          >
            Add Round
          </Button>
          <Button
            variant="light"
            color="indigo"
            w={246}
            style={showDetailsButtonStyles}
            onClick={() => setShowGameDetails(true)}
          >
            Show Game Details
          </Button>
          <Button
            variant="light"
            color="indigo"
            w={246}
            style={deleteGameButtonStyles}
            onClick={open}
          >
            Delete Game
          </Button>
          <DeleteGameModal
            handleDeleteGame={handleDeleteGame}
            isOpened={deleteModalOpen}
            close={close}
          />
        </>
      )}
    </Stack>
  );
};
