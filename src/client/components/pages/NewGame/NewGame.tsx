'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { Button, Flex, Loader, Stack } from '@mantine/core';
import { IconPlayCard, IconUsersPlus } from '@tabler/icons-react';
import {
  Rank,
  rankOptions,
  rankToNumberValue,
  Suit,
  suitOptions,
} from '@/types/PlayingCard';
import { StyledSelect } from '../../Selects/StyledSelect';
import { StyledMultiSelect } from '../../Selects/StyledMultiSelect';
import { GameState, useGame } from '@/client/contexts/GameContext';
import { createGame } from '@/client/apis/gameAPI';
import { fromIPlayer, Player } from '@/types/player';
import { getAllPlayers } from '@/client/apis/playerAPI';
import { PlayerData } from '@/pages/api/players';
import { fromIGame } from '@/types/game';

const areFieldsValid = (
  startingRank: Rank | null,
  startingSuit: Suit | null,
  players: Player[],
) => {
  return !(
    startingRank === null ||
    startingSuit === null ||
    players.length < 2
  );
};

export const NewGame = () => {
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

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

  const {
    setGameState,
    setGameId,
    players,
    setPlayers,
    setStartingRank,
    setRoundNumber,
  } = useGame();
  const [startingRank, setNewStartingRank] = useState<Rank | null>(null);
  const [startingSuit, setStartingSuit] = useState<Suit | null>(null);

  const submitButtonStyles = {
    marginTop: '2rem',
    pointerEvents: !areFieldsValid(startingRank, startingSuit, players)
      ? 'none'
      : undefined,
    opacity: !areFieldsValid(startingRank, startingSuit, players) ? '0.8' : '1',
  } as CSSProperties;

  const handlePlayerChange = (values: string[]) => {
    const selectedPlayers = availablePlayers.filter((player) =>
      values.includes(player.name),
    );
    setPlayers(selectedPlayers);
  };

  const handleCreateGame = async () => {
    try {
      if (startingRank !== null && startingSuit !== null) {
        const gameData = await createGame(players, {
          rank: startingRank,
          suit: startingSuit,
        });
        if (gameData.game) {
          const createdGame = fromIGame(gameData.game);
          setGameId(createdGame.gameId);
          setRoundNumber(1);
          setGameState(GameState.NewRound);
          setStartingRank(rankToNumberValue(startingRank));
        }
      }
    } catch (err) {
      console.error('Error creating game:', err);
    }
  };

  return dataLoading ? (
    <Loader />
  ) : (
    <Stack align='center'>
      <Flex justify='space-between' w='100%'>
        <b>Starting Card</b>
        <IconPlayCard size={30} />
      </Flex>
      <Flex align='center' justify='space-between' gap='md' w='100%'>
        <StyledSelect
          data={rankOptions}
          value={startingRank ? startingRank : null}
          onChange={(value) => setNewStartingRank(value as Rank)}
          w={80}
          searchable
        />
        of
        <StyledSelect
          data={suitOptions}
          value={startingSuit}
          onChange={(value) => setStartingSuit(value as Suit)}
          w={120}
          searchable
        />
      </Flex>
      <Flex
        align='center'
        justify='space-between'
        style={{ margin: '1rem 0 0 0' }}
        w='100%'
      >
        <b>Add Players</b>
        <IconUsersPlus size={28} />
      </Flex>
      <StyledMultiSelect
        data={availablePlayers.map((player) => player.name)}
        value={players.map((player) => player.name)}
        onChange={handlePlayerChange}
        w={246}
      />
      <Button
        variant='light'
        color='black'
        w='100%'
        style={submitButtonStyles}
        onClick={() => {
          handleCreateGame();
        }}
      >
        Start Game
      </Button>
    </Stack>
  );
};
