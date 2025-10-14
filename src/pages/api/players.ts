import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Player from '@/server/models/Player';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET': // get player by name
      try {
        const { playerName } = req.query;
        if (playerName) {
          const player = await Player.findOne({ name: playerName }).exec();
          if (player) {
            return res.status(200).json(player);
          } else {
            return res.status(404).json({ error: 'Player not found' });
          }
        } else {
          return res.status(400).json({ error: 'No name given' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to load player' });
      }

    case 'POST': // create new player
      try {
        const player = new Player(req.body);
        await player.save();
        return res.status(201).json(player);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to create player' });
      }
    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
