'use client';

import { useMemo, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { useGame } from '@/client/contexts/GameContext';
import { StyledMultiSelect } from '../Selects/StyledMultiSelect';
import { StyledSelect } from '../Selects/StyledSelect';

export const NewRound = () => {
  const { players } = useGame();
  const [winningTeam, setWinningTeam] = useState<string[]>([]);
  const [pointsScored, setPointsScored] = useState<string>('0');
  const [dealer, setDealer] = useState<string>('');

  const otherTeam = useMemo(() => {
    return players.filter((player) => !winningTeam.includes(player));
  }, [winningTeam]);

  return (
    <Stack>
      <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <b>Winning Team</b>
      </div>
      <StyledMultiSelect
        data={players}
        value={winningTeam}
        onChange={(value) => setWinningTeam(value)}
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
          data={players}
          value={dealer}
          w={130}
          onChange={(value) => setDealer(value || '')}
        />
      </div>
      <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
        <b>Other Team</b>
      </div>
      <StyledMultiSelect data={players} value={otherTeam} w={246} disabled />
      <Button
        variant="light"
        color="indigo"
        w={246}
        style={{ marginLeft: '1rem', marginTop: '2rem' }}
        onClick={() => {}}
      >
        Add Round
      </Button>
    </Stack>
  );
};
