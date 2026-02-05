'use client';

import { useMemo } from 'react';
import { Table } from '@mantine/core';
import styles from '../Table.module.css';
import { useGame } from '@/client/contexts/GameContext';
import { Player } from '@/types/player';
import { Round } from '@/types/round';
import { PointCircle } from '../../PointCircles/PointCircle';

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

  const rows = players.map((player) => (
    <Table.Tr key={`${player.name}Row`} ta={'center'}>
      <Table.Th ta={'center'} bg={'#121212'}>
        {player.name}
      </Table.Th>
      <Table.Td key={`${player.name}0score`}>{startingRank}</Table.Td>
      {pastRounds.map((round) => (
        <Table.Td key={`${player.name}${round.roundId}score`}>
          <PointCircle
            isDealer={round.dealer === player.name}
            isOnDealersTeam={
              (round.winningTeam.includes(round.dealer) &&
                round.winningTeam.includes(player.name)) ||
              (round.otherTeam.includes(round.dealer) &&
                round.otherTeam.includes(player.name))
            }
          >
            {pointsEarnedInRoundByPlayer.get(`${player.name}${round.roundId}`)}
          </PointCircle>
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
  const { players } = useGame();
  const playerRows = useMemo(() => {
    return createPlayerRows(pastRounds, players, startingRank);
  }, [pastRounds]);

  return (
    <div>
      <Table withColumnBorders className={styles.table} variant="vertical">
        <Table.Tbody>
          <Table.Tr ta={'center'}>
            <Table.Th ta={'center'} bg={'#121212'}>
              Round
            </Table.Th>
            <Table.Td>0</Table.Td>
            {pastRounds.map((round, index) => (
              <Table.Td key={round.roundId}>{index + 1}</Table.Td>
            ))}
          </Table.Tr>
          {playerRows}
        </Table.Tbody>
      </Table>
    </div>
  );
};
