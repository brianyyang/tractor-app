'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useEffect, useState } from 'react';
import { Button, Loader, Stack, Title } from '@mantine/core';
import { GameState, useGame } from '@/client/contexts/GameContext';
import { getGameByID } from '@/client/apis/gameAPI';
import { getAllRoundsByID } from '@/client/apis/roundAPI';
import { fromIGame } from '@/types/game';
import { fromIRound } from '@/types/round';
import { fromIPlayer, Player } from '@/types/player';
import { getAllPlayers } from '@/client/apis/playerAPI';
import { PlayerData } from '@/pages/api/players';
import { rankToNumberValue } from '@/types/PlayingCard';
import { GameTable } from '../../Tables/GameTable/GameTable';

export const ResumeGame = () => {
  const {
    setGameState,
    setGameId,
    setRoundNumber,
    setPlayers,
    setStartingRank,
  } = useGame();
  const [errorMsg, setErrorMsg] = useState('');
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const submitButtonStyles = {
    marginLeft: '1rem',
    marginTop: '2rem',
  } as CSSProperties;

  useEffect(() => {
    const fetchPlayers = async () => {
      const response: PlayerData = await getAllPlayers();
      if (response.players) {
        setAvailablePlayers(
          response.players.map((iPlayer) => fromIPlayer(iPlayer)),
        );
      } else {
        setAvailablePlayers([]);
      }
    };

    fetchPlayers();
    setDataLoading(false);
  }, []);

  const handleResumeGame = async (gameId: number) => {
    try {
      const gameData = await getGameByID(gameId.toString());
      const roundData = await getAllRoundsByID(gameId);
      if (gameData.game && roundData.rounds) {
        const gameToResume = fromIGame(gameData.game);
        const rounds = roundData.rounds.map((round) => fromIRound(round));
        setGameId(gameId);
        setRoundNumber(rounds.length + 1);
        setPlayers(
          gameToResume.players.map((gamePlayer) =>
            availablePlayers.find((player) => player.name === gamePlayer),
          ) as Player[],
        );
        setStartingRank(rankToNumberValue(gameToResume.startingCard.rank));
        setGameState(GameState.NewRound);
      }
    } catch (err: any) {
      console.error('Error resuming game:', err);
      setErrorMsg(err.message);
    }
  };

  return dataLoading ? (
    <Loader />
  ) : errorMsg !== '' ? (
    <Stack align='center'>
      <Title order={4}>{errorMsg}</Title>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={submitButtonStyles}
        onClick={() => {
          setErrorMsg('');
        }}
      >
        Continue
      </Button>
    </Stack>
  ) : (
    <GameTable onGameClick={handleResumeGame} />
  );
};
