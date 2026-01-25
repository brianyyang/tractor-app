import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Player, { IPlayer } from '@/server/models/Player';

export type PlayerData = {
  message?: string;
  players?: IPlayer[];
  player?: IPlayer;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerData>,
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET': // get all players
      try {
        const foundPlayers = await Player.find().sort({ name: 1 });
        return res.status(200).json({ players: foundPlayers });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to load players' });
      }

    case 'POST': // create new player
      const { playerName } = req.body;
      try {
        const player = new Player({ name: playerName });
        const savedPlayer = await player.save();
        return res.status(201).json({ player: savedPlayer });
      } catch (error: any) {
        if (error.code === 11000) {
          return res.status(409).json({
            error: `Player: ${playerName} already exists. Please try again.`,
          });
        }
        return res
          .status(400)
          .json({ error: 'Failed to create player: please notify Brian.' });
      }
    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
