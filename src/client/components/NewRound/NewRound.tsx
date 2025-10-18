'use client';

import { useMemo, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { useGame } from '@/client/contexts/GameContext';
import { StyledMultiSelect } from '../Selects/StyledMultiSelect';
import { StyledSelect } from '../Selects/StyledSelect';
import { Player } from '@/types/player';

export const NewRound = () => {
  const { players } = useGame();
  const [winningTeam, setWinningTeam] = useState<Player[]>([]);
  const [pointsScored, setPointsScored] = useState<string>('0');
  const [dealer, setDealer] = useState<Player>();

  const otherTeam = useMemo(() => {
    return players.filter((player) => !winningTeam.includes(player));
  }, [winningTeam]);

  const handleWinningTeamChange = (values: string[]) => {
    const selectedPlayers = players.filter((player) =>
      values.includes(player.name)
    );
    setWinningTeam(selectedPlayers);
  };

  return (
    <Stack>
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
        style={{ marginLeft: '1rem', marginTop: '2rem' }}
        onClick={() => {}}
      >
        Add Round
      </Button>
    </Stack>
  );
};
