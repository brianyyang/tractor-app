'use client';

import { useState } from 'react';
import { Flex, Stack } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { Rank, Suit } from '@/types/PlayingCard';
import styles from './NewGame.module.css';
import { StyledSelect } from '../StyledSelect';

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
    label: `${suit} ${symbol} `,
  };
});

export const NewRound = () => {
  const [startingRank, setStartingRank] = useState<Rank | null>(null);
  const [startingSuit, setStartingSuit] = useState<Suit | null>(null);
  const [playerCount, setPlayerCount] = useState('');

  return (
    <Stack>
      <div style={{ marginLeft: '1rem' }}>
        <b>Starting Card</b>
      </div>
      <Flex align="center">
        <StyledSelect
          className={styles.select}
          data={rankOptions}
          value={startingRank ? startingRank : null}
          onChange={(value) => setStartingRank(value as Rank)}
          rightSection={<IconChevronDown size={14} />}
          w={80}
          searchable
        />
        of
        <StyledSelect
          className={styles.select}
          data={suitOptions}
          value={startingSuit}
          onChange={(value) => setStartingSuit(value as Suit)}
          rightSection={<IconChevronDown size={14} />}
          w={120}
          searchable
        />
      </Flex>
      <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
        <b>Number of Players</b>
      </div>
      <StyledSelect
        className={styles.select}
        data={['4', '5', '6']}
        value={playerCount}
        onChange={(value) => setPlayerCount(value || '')}
        rightSection={<IconChevronDown size={14} />}
        w={80}
        searchable
      />
    </Stack>
  );
};
