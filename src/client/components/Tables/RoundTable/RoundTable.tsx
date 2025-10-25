'use client';

import { useEffect, useState } from 'react';
import { Table, Title, Loader, Center } from '@mantine/core';
import { fromIGame, Game } from '@/types/game';
import styles from '../Table.module.css';
import { getAllRoundsByID } from '@/client/apis/roundAPI';
import { fromIRound, Round } from '@/types/round';

interface RoundTableProps {
  gameId: number;
}

export const RoundTable = ({ gameId }: RoundTableProps) => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRoundsByID(gameId)
      .then((data) => {
        if (data.rounds) {
          setRounds(data.rounds.map((iRound) => fromIRound(iRound)));
        }
      })
      .finally(() => setLoading(false));
  }, [gameId]);

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (rounds.length === 0) {
    return (
      <Title order={3} mb="md" ta="center">
        No rounds found.
      </Title>
    );
  }

  return (
    <div>
      <Title order={2} mb="md" ta="center">
        Rounds for Game ID: {gameId}
      </Title>
      <Table withColumnBorders className={styles.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Winning Team</Table.Th>
            <Table.Th>Other Team</Table.Th>
            <Table.Th>Points Scored</Table.Th>
            <Table.Th>Dealer</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rounds.map((round) => (
            <Table.Tr key={round.roundId}>
              <Table.Td>{round.roundId}</Table.Td>
              <Table.Td>{round.winningTeam.join(', ')}</Table.Td>
              <Table.Td>{round.otherTeam.join(', ')}</Table.Td>
              <Table.Td>{round.pointsScored}</Table.Td>
              <Table.Td>{round.dealer}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
