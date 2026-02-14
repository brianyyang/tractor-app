/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Game, { IGame } from '@/server/models/Game';
import Round from '@/server/models/Round';

type Data = {
  message?: string;
  game?: IGame;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await connectToDatabase();
  const gameId = req.query.gameId;

  switch (req.method) {
    case 'GET': // get a game by its ID
      try {
        const game = await Game.findOne({
          gameId: gameId,
        });
        if (!game) {
          return res.status(404).json({ message: 'Game not found' });
        }
        return res.status(200).json({ game });
      } catch (error) {
        console.error('Error fetching game:', error);
        return res.status(500).json({ message: 'Failed to fetch game' });
      }

    case 'DELETE': // delete a game
      try {
        // Delete all rounds for this game first
        await Round.deleteMany({ gameId: gameId });

        const deletedGame = await Game.findOneAndDelete({ gameId: gameId });

        if (!deletedGame) {
          return res
            .status(404)
            .json({ message: `Game with gameId: ${gameId} not found` });
        }

        return res.status(200).json({
          message: 'Game deleted successfully',
          game: deletedGame,
        });
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: 'Error deleting game: ' + error.message });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET, DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
