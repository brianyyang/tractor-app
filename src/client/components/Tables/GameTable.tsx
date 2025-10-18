'use client';

import { useEffect, useState } from 'react';
import { Table, Title, Loader, Center } from '@mantine/core';
import { fromIGame, Game } from '@/types/game';
import { getGamesPaginated } from '@/client/apis/gameAPI';

export const GameTable = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    getGamesPaginated(pageNumber)
      .then((data) => {
        if (data.games) {
          setGames(data.games.map((iGame) => fromIGame(iGame)));
        }
      })
      .finally(() => setLoading(false));
  }, [pageNumber]);

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (games.length === 0) {
    return (
      <Title order={3} mb="md" ta="center">
        No recent games found.
      </Title>
    );
  }

  return (
    <div>
      <Title order={2} mb="md" ta="center">
        Latest Games
      </Title>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Players</Table.Th>
            <Table.Th>Starting Card</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {games.map((game) => (
            <Table.Tr key={game.gameId}>
              <Table.Td>{game.date.toLocaleString()}</Table.Td>
              <Table.Td>{game.players.join(', ')}</Table.Td>
              <Table.Td>{`${game.startingCard.rank} of ${game.startingCard.suit}`}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
