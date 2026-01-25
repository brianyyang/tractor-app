'use client';

import { Table } from '@mantine/core';
import styles from '../Table.module.css';
import { useGame } from '@/client/contexts/GameContext';
import { Player } from '@/types/player';
import { Round } from '@/types/round';
import { useMemo } from 'react';

interface PlayerRoundTableProps {
  pastRounds: Round[];
  startingRank: number;
}

const createPlayerRows = (
  pastRounds: Round[],
  players: Player[],
  startingRank: number,
) => {
  const pointsEarnedInRoundByPlayer: Map<string, number> =
    calculatePointsPerPlayer(pastRounds, players, startingRank);

  const rows = pastRounds.map((round) => (
    <Table.Tr key={round.roundId}>
      {players.map((player) => (
        <Table.Td key={`${player.name}RoundScore`}>
          {pointsEarnedInRoundByPlayer.get(`${player.name}${round.roundId}`)}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return rows;
};

const calculatePointsPerPlayer = (
  pastRounds: Round[],
  players: Player[],
  startingRank: number,
) => {
  const pointsEarnedPerPlayer = new Map();
  pastRounds.forEach((round) => {
    players.forEach((player) => {
      const isFirstRound = round.roundId === 1;
      if (round.winningTeam.includes(player.name)) {
        pointsEarnedPerPlayer.set(
          `${player.name}${round.roundId}`,
          isFirstRound
            ? startingRank + round.pointsScored
            : pointsEarnedPerPlayer.get(`${player.name}${round.roundId - 1}`) +
                round.pointsScored,
        );
      } else {
        pointsEarnedPerPlayer.set(
          `${player.name}${round.roundId}`,
          isFirstRound
            ? startingRank
            : pointsEarnedPerPlayer.get(`${player.name}${round.roundId - 1}`),
        );
      }
    });
  });
  return pointsEarnedPerPlayer;
};

export const PlayerRoundTable = ({
  pastRounds,
  startingRank,
}: PlayerRoundTableProps) => {
  console.log(pastRounds);
  const { players } = useGame();
  const playerRows = useMemo(() => {
    return createPlayerRows(pastRounds, players, startingRank);
  }, [pastRounds]);

  return (
    <div>
      <Table withColumnBorders className={styles.table}>
        <Table.Thead>
          <Table.Tr>
            {players.map((player) => (
              <Table.Th key={player.id}>{player.name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{playerRows}</Table.Tbody>
      </Table>
    </div>
  );
};
