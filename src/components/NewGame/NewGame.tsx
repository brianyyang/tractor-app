'use client';

import { useState } from 'react';
import { Button, Flex, Stack } from '@mantine/core';
import { IconPlayCard, IconUsersPlus } from '@tabler/icons-react';
import { Rank, Suit } from '@/types/PlayingCard';
import styles from './NewGame.module.css';
import { StyledSelect } from '../StyledSelect';
import { StyledMultiSelect } from '../StyledMultiSelect';

const rankOptions = Object.values(Rank).map((rank) => ({
  value: rank,
  label: rank,
}));

const suitOptions = Object.values(Suit).map((suit) => {
  let symbol = '';
  switch (suit) {
    case Suit.SPADES:
      symbol = '♠';
      break;
    case Suit.HEARTS:
      symbol = '♥';
      break;
    case Suit.DIAMONDS:
      symbol = '♦';
      break;
    case Suit.CLUBS:
      symbol = '♣';
      break;
  }
  return {
    value: suit,
    label: `${suit} ${symbol}`,
  };
});

export const NewGame = () => {
  const [startingRank, setStartingRank] = useState<Rank | null>(null);
  const [startingSuit, setStartingSuit] = useState<Suit | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <Stack>
      <Flex align="center" justify="space-between" style={{ margin: '0 1rem' }}>
        <b>Starting Card</b>
        <IconPlayCard size={30} style={{ marginRight: '-5px' }} />
      </Flex>
      <Flex align="center">
        <StyledSelect
          className={styles.select}
          classNames={{ option: styles.option }}
          data={rankOptions}
          value={startingRank ? startingRank : null}
          onChange={(value) => setStartingRank(value as Rank)}
          w={80}
          searchable
        />
        of
        <StyledSelect
          className={styles.select}
          classNames={{ option: styles.option }}
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
        className={styles.select}
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
      >
        Start Game
      </Button>
    </Stack>
  );
};
