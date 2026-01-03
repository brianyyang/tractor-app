'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { Button, Flex, Loader, Stack } from '@mantine/core';
import { IconPlayCard, IconUsersPlus } from '@tabler/icons-react';
import { Rank, Suit } from '@/types/PlayingCard';
import { StyledSelect } from '../Selects/StyledSelect';
import { StyledMultiSelect } from '../Selects/StyledMultiSelect';
import { GameState, useGame } from '@/client/contexts/GameContext';
import { createGame } from '@/client/apis/gameAPI';
import { fromIPlayer, Player } from '@/types/player';
import { getAllPlayers } from '@/client/apis/playerAPI';
import { PlayerData } from '@/pages/api/players';
import { fromIGame } from '@/types/game';

const rankOptions = Object.values(Rank).map((rank) => ({
  value: rank,
  label: rank,
}));

const suitOptions = Object.values(Suit).map((suit) => {
  let symbol = '';
  switch (suit) {
    case Suit.Spades:
      symbol = '♠';
      break;
    case Suit.Hearts:
      symbol = '♥';
      break;
    case Suit.Diamonds:
      symbol = '♦';
      break;
    case Suit.Clubs:
      symbol = '♣';
      break;
  }
  return {
    value: suit,
    label: `${suit} ${symbol}`,
  };
});

const areFieldsValid = (
  startingRank: Rank | null,
  startingSuit: Suit | null,
  players: Player[]
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
          response.players.map((iPlayer) => fromIPlayer(iPlayer))
        );
      } else {
        setAvailablePlayers([]);
      }
    };

    fetchPlayers();
    setDataLoading(false);
  }, []);

  const { setGameState, setGameId, players, setPlayers, setRoundNumber } =
    useGame();
  const [startingRank, setStartingRank] = useState<Rank | null>(null);
  const [startingSuit, setStartingSuit] = useState<Suit | null>(null);

  const submitButtonStyles = {
    marginLeft: '1rem',
    marginTop: '2rem',
    pointerEvents: !areFieldsValid(startingRank, startingSuit, players)
      ? 'none'
      : undefined,
    opacity: !areFieldsValid(startingRank, startingSuit, players) ? '0.8' : '1',
  } as CSSProperties;

  const handlePlayerChange = (values: string[]) => {
    const selectedPlayers = availablePlayers.filter((player) =>
      values.includes(player.name)
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
        }
      }
    } catch (err) {
      console.error('Error creating game:', err);
    }
  };

  return dataLoading ? (
    <Loader />
  ) : (
    <Stack>
      <Flex align='center' justify='space-between' style={{ margin: '0 1rem' }}>
        <b>Starting Card</b>
        <IconPlayCard size={30} style={{ marginRight: '-5px' }} />
      </Flex>
      <Flex align='center'>
        <StyledSelect
          data={rankOptions}
          value={startingRank ? startingRank : null}
          onChange={(value) => setStartingRank(value as Rank)}
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
        style={{ margin: '2rem 1rem 0 1rem' }}
      >
        <b>Add Players</b>
        <IconUsersPlus size={28} style={{ marginRight: '-4px' }} />
      </Flex>
      <StyledMultiSelect
        data={availablePlayers.map((player) => player.name)}
        value={players.map((player) => player.name)}
        onChange={handlePlayerChange}
        w={246}
      />
      <Button
        variant='light'
        color='indigo'
        w={246}
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
