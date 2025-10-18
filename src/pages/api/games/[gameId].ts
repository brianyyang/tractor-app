import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Game, { IGame } from '@/server/models/Game';

type Data = {
  message?: string;
  game?: IGame;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET': // get a game by its ID
      const gameId = req.query.gameId;
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

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
