/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Game, { IGame } from '@/server/models/Game';

export type GameData = {
  message?: string;
  games?: IGame[];
  game?: IGame;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData>,
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

    case 'GET': // get all games
      const page = Number(req.query.page) - 1 || 0;
      const pageSize = 20;
      try {
        const foundGames = await Game.find()
          .sort({ gameId: -1 })
          .skip(page * pageSize)
          .limit(pageSize);
        return res.status(200).json({ games: foundGames });
      } catch (error: any) {
        console.error('Error fetching game:', error);
        return res
          .status(500)
          .json({ message: 'Failed to fetch games: ' + error.message });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
