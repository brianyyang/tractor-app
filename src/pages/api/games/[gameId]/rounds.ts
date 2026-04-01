/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Round, { IRound } from '@/server/models/Round';

export type RoundData = {
  message?: string;
  round?: IRound;
  rounds?: IRound[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoundData>,
) {
  await connectToDatabase();
  const gameId = req.query.gameId;
  const { dealerTeam, otherTeam, pointsScored, dealer } = req.body;

  switch (req.method) {
    case 'POST': // create a new round
      if (
        !dealerTeam ||
        !otherTeam ||
        (pointsScored !== 0 && !pointsScored) ||
        !dealer
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
        const round = new Round({
          gameId: gameId,
          dealerTeam: dealerTeam,
          otherTeam: otherTeam,
          pointsScored: pointsScored,
          dealer: dealer,
        });
        const savedRound = await round.save();

        return res
          .status(201)
          .json({ message: 'Round created successfully', round: savedRound });
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: 'Error creating round: ' + error.message });
      }

    case 'PATCH': // edit an existing round
      if (
        !dealerTeam ||
        !otherTeam ||
        (pointsScored !== 0 && !pointsScored) ||
        !dealer
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const { roundNumber } = req.body;
      try {
        const editedRound = await Round.findOneAndUpdate(
          {
            gameId: gameId,
            roundId: roundNumber,
          },
          {
            $set: {
              dealerTeam: dealerTeam,
              otherTeam: otherTeam,
              pointsScored: pointsScored,
              dealer: dealer,
            },
          },
        );

        if (editedRound) {
          return res
            .status(201)
            .json({ message: 'Round edited successfully', round: editedRound });
        } else {
          return res
            .status(500)
            .json({ message: 'Error editing round: round not found' });
        }
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: 'Error creating round: ' + error.message });
      }

    case 'GET': // get all rounds for a game
      try {
        const foundRounds = await Round.find({ gameId: gameId }).sort({
          roundId: 1,
        });
        return res.status(200).json({ rounds: foundRounds });
      } catch (error: any) {
        console.error('Error fetching rounds:', error);
        return res
          .status(500)
          .json({ message: 'Failed to fetch rounds: ' + error.message });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
