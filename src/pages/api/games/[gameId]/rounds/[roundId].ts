import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Round, { IRound } from '@/server/models/Round';

export type RoundData = {
  message?: string;
  round?: IRound;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoundData>
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET': // get a round by its ID
      const gameId = req.query.gameId;
      const roundId = req.query.roundId;
      try {
        const round = await Round.findOne({
          gameId: gameId,
          roundId: roundId,
        });
        if (!round) {
          return res.status(404).json({ message: 'Round not found' });
        }
        return res.status(200).json({ round });
      } catch (error) {
        console.error('Error fetching round:', error);
        return res.status(500).json({ message: 'Failed to fetch round' });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
