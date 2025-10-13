'use client';

import { useState } from 'react';
import { Button, Flex, Stack } from '@mantine/core';
import { IconPlayCard, IconUsersPlus } from '@tabler/icons-react';
import { Rank, Suit } from '@/types/PlayingCard';
import { StyledSelect } from '../Selects/StyledSelect';
import { StyledMultiSelect } from '../Selects/StyledMultiSelect';
import { GameState, useGame } from '@/client/contexts/GameContext';

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

export const NewGame = () => {
  const { setGameState, setGameId, players, setPlayers, setRoundNumber } =
    useGame();
  const [startingRank, setStartingRank] = useState<Rank | null>(null);
  const [startingSuit, setStartingSuit] = useState<Suit | null>(null);

  return (
    <Stack>
      <Flex align="center" justify="space-between" style={{ margin: '0 1rem' }}>
        <b>Starting Card</b>
        <IconPlayCard size={30} style={{ marginRight: '-5px' }} />
      </Flex>
      <Flex align="center">
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
        align="center"
        justify="space-between"
        style={{ margin: '2rem 1rem 0 1rem' }}
      >
        <b>Add Players</b>
        <IconUsersPlus size={28} style={{ marginRight: '-4px' }} />
      </Flex>
      <StyledMultiSelect
        data={['Susan', 'Sisi', 'Renee', 'Raymond', 'Myra']}
        value={players}
        onChange={(value) => setPlayers(value)}
        w={246}
      />
      <Button
        variant="light"
        color="indigo"
        w={246}
        style={{ marginLeft: '1rem', marginTop: '2rem' }}
        onClick={() => {
          setGameId(1);
          setRoundNumber(1);
          setGameState(GameState.NewRound);
        }}
      >
        Start Game
      </Button>
    </Stack>
  );
};
