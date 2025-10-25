import { IRound } from '@/server/models/Round';

export type Round = {
  gameId: number;
  roundId: number;
  winningTeam: string[];
  otherTeam: string[];
  pointsScored: number;
  dealer: string;
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
