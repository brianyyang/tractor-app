/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import Player, { IPlayer } from '@/server/models/Player';
import Game from '@/server/models/Game';
import Round from '@/server/models/Round';

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

    case 'DELETE': // delete players
      const { playersToDelete } = req.body;
      try {
        await Player.deleteMany({
          name: { $in: playersToDelete },
        });

        await Game.deleteMany({
          players: { $in: playersToDelete },
        });

        await Round.deleteMany({
          $or: [
            { 'boatTickets.player': { $in: playersToDelete } },
            { otherTeam: { $in: playersToDelete } },
            { dealer: { $in: playersToDelete } },
          ],
        });

        return res.status(200).json({
          message: 'Players deleted successfully',
        });
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: 'Error deleting players: ' + error.message });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
