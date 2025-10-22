import { Game } from './game';
import { Player } from './player';
import { IRound } from '@/server/models/Round';

export type Round = {
  gameId: Game;
  roundId: number;
  winningTeam: Player[];
  otherTeam: Player[];
  pointsScored: number;
  dealer: Player;
};

export const fromIRound = (iRound: IRound) => {
  return {
    gameId: iRound.gameId,
    roundId: iRound.roundId,
    winningTeam: iRound.winningTeam,
    otherTeam: iRound.otherTeam,
    pointsScored: iRound.pointsScored,
    dealer: iRound.dealer,
  } as Round;
};
