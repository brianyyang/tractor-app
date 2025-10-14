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
    case 'POST': // create a new game
      const { startingCard, players } = req.body;

      if (!startingCard || !players || !Array.isArray(players)) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
        const game = new Game({
          startingCard: startingCard,
          players,
        });
        const savedGame = await game.save();

        return res
          .status(201)
          .json({ message: 'Game created successfully', game: savedGame });
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: 'Error creating game: ' + error.message });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
