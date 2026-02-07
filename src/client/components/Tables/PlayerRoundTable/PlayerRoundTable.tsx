'use client';

import { CSSProperties, useMemo } from 'react';
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

const stickyHeaderStyles = {
  textAlign: 'center',
  position: 'sticky',
  background: '#121212',
  zIndex: 1,
  left: 0,
} as CSSProperties;

const stickyTotalStyles = {
  textAlign: 'center',
  position: 'sticky',
  background: '#121212',
  zIndex: 1,
  right: 0,
} as CSSProperties;

const scrollingDivStyles = {
  maxWidth: '100vw',
  overflowX: 'scroll',
} as CSSProperties;

const createPlayerRows = (
  pastRounds: Round[],
  players: Player[],
  startingRank: number,
) => {
  const pointsEarnedInRoundByPlayer: Map<string, number> =
    calculatePointsPerPlayer(pastRounds, players, startingRank);

  const rows = players.map((player) => (
    <Table.Tr key={`${player.name}Row`} ta={'center'}>
      <Table.Th style={stickyHeaderStyles}>{player.name}</Table.Th>
      <Table.Td key={`${player.name}0score`}>{startingRank}</Table.Td>
      {pastRounds.map((round, i) => (
        <Table.Td
          key={`${player.name}${round.roundId}score`}
          style={i === pastRounds.length - 1 ? stickyTotalStyles : undefined}
        >
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
    <div style={scrollingDivStyles}>
      <Table withColumnBorders className={styles.table} variant='vertical'>
        <Table.Tbody>
          <Table.Tr ta={'center'}>
            <Table.Th style={stickyHeaderStyles}>Round</Table.Th>
            <Table.Td>0</Table.Td>
            {pastRounds.map((round, index) => (
              <Table.Td
                key={round.roundId}
                style={
                  index === pastRounds.length - 1
                    ? stickyTotalStyles
                    : undefined
                }
              >
                {index + 1}
              </Table.Td>
            ))}
          </Table.Tr>
          {playerRows}
        </Table.Tbody>
      </Table>
    </div>
  );
};
