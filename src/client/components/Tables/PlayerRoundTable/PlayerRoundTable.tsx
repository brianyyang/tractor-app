'use client';

import { CSSProperties, useMemo } from 'react';
import { Table } from '@mantine/core';
import styles from '../Table.module.css';
import { useGame } from '@/client/contexts/GameContext';
import { Player } from '@/types/player';
import { BoatTicket, Round } from '@/types/round';
import { PointCircle } from '../../PointCircles/PointCircle';

interface PlayerRoundTableProps {
  pastRounds: Round[];
  startingRank: number;
  isGameEnded: boolean;
}

const stickyHeaderStyles = {
  textAlign: 'center',
  position: 'sticky',
  background: 'var(--background)',
  zIndex: 1,
  left: 0,
} as CSSProperties;

const scrollingDivStyles = {
  maxWidth: '100vw',
  overflowX: 'auto',
} as CSSProperties;

const createPlayerRows = (
  pastRounds: Round[],
  players: Player[],
  startingRank: number,
  isGameEnded: boolean,
) => {
  const pointsEarnedInRoundByPlayer: Map<string, number> =
    calculatePointsPerPlayer(pastRounds, players, startingRank);

  const finalScorePerPlayer: Map<string, number> =
    calculateEndGamePointsPerPlayer(
      pointsEarnedInRoundByPlayer,
      pastRounds.length,
      players,
    );

  const rows = players.map((player) => (
    <Table.Tr key={`${player.name}Row`} ta={'center'}>
      <Table.Th style={stickyHeaderStyles}>{player.name}</Table.Th>
      <Table.Td key={`${player.name}0score`}>
        <PointCircle isDealer={false} isOnDealersTeam={false}>
          {startingRank}
        </PointCircle>
      </Table.Td>
      {pastRounds.map((round, i) => (
        <Table.Td key={`${player.name}${round.roundId}score`}>
          <PointCircle
            isDealer={isDealer(round, player)}
            isOnDealersTeam={isOnDealersTeam(round.boatTickets, player)}
            boatTicket={round.boatTickets.find(
              (ticket) => ticket.player === player.name,
            )}
          >
            {pointsEarnedInRoundByPlayer.get(`${player.name}${round.roundId}`)}
          </PointCircle>
        </Table.Td>
      ))}
      {isGameEnded && (
        <Table.Td>
          <PointCircle isDealer={false} isOnDealersTeam={false}>
            {finalScorePerPlayer.get(player.name)}
          </PointCircle>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return rows;
};

const isOnDealersTeam = (boatTickets: BoatTicket[], player: Player) => {
  return boatTickets.some((ticket) => ticket.player === player.name);
};

const isDealer = (round: Round, player: Player) => {
  return round.dealer === player.name;
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
      if (round.pointsScored >= 0) {
        if (
          isOnDealersTeam(round.boatTickets, player) ||
          isDealer(round, player)
        ) {
          pointsEarnedPerPlayer.set(
            `${player.name}${round.roundId}`,
            isFirstRound
              ? startingRank + round.pointsScored
              : pointsEarnedPerPlayer.get(
                  `${player.name}${round.roundId - 1}`,
                ) + round.pointsScored,
          );
        } else {
          pointsEarnedPerPlayer.set(
            `${player.name}${round.roundId}`,
            isFirstRound
              ? startingRank
              : pointsEarnedPerPlayer.get(`${player.name}${round.roundId - 1}`),
          );
        }
      } else {
        if (
          isOnDealersTeam(round.boatTickets, player) ||
          isDealer(round, player)
        ) {
          pointsEarnedPerPlayer.set(
            `${player.name}${round.roundId}`,
            isFirstRound
              ? startingRank
              : pointsEarnedPerPlayer.get(`${player.name}${round.roundId - 1}`),
          );
        } else {
          pointsEarnedPerPlayer.set(
            `${player.name}${round.roundId}`,
            isFirstRound
              ? startingRank - round.pointsScored
              : pointsEarnedPerPlayer.get(
                  `${player.name}${round.roundId - 1}`,
                ) - round.pointsScored,
          );
        }
      }
    });
  });
  return pointsEarnedPerPlayer;
};

const calculateEndGamePointsPerPlayer = (
  allRoundPoints: Map<string, number>,
  lastRoundId: number,
  players: Player[],
) => {
  const endGamePointsPerPlayer = new Map();
  players.forEach((player) => {
    const playerPoints =
      allRoundPoints.get(`${player.name}${lastRoundId}`) || 0;
    let sumOfFinalPoints = 0;
    players.forEach((otherPlayer) => {
      if (otherPlayer.name !== player.name) {
        const otherPlayerPoints =
          allRoundPoints.get(`${otherPlayer.name}${lastRoundId}`) || 0;
        sumOfFinalPoints += playerPoints - otherPlayerPoints;
      }
    });
    endGamePointsPerPlayer.set(player.name, sumOfFinalPoints);
  });
  return endGamePointsPerPlayer;
};

export const PlayerRoundTable = ({
  pastRounds,
  startingRank,
  isGameEnded,
}: PlayerRoundTableProps) => {
  const { players, setRoundNumber } = useGame();
  const playerRows = useMemo(() => {
    return createPlayerRows(pastRounds, players, startingRank, isGameEnded);
  }, [pastRounds, isGameEnded]);

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
                className={styles.editRound}
                onClick={() => !isGameEnded && setRoundNumber(index + 1)}
              >
                {index + 1}
              </Table.Td>
            ))}
            {isGameEnded && <Table.Td>Final</Table.Td>}
          </Table.Tr>
          {playerRows}
        </Table.Tbody>
      </Table>
    </div>
  );
};
