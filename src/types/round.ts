import { IRound } from '@/server/models/Round';

export type Round = {
  gameId: number;
  roundId: number;
  dealerTeam: string[];
  otherTeam: string[];
  pointsScored: number;
  dealer: string;
};

export const fromIRound = (iRound: IRound) => {
  return {
    gameId: iRound.gameId,
    roundId: iRound.roundId,
    dealerTeam: iRound.dealerTeam,
    otherTeam: iRound.otherTeam,
    pointsScored: iRound.pointsScored,
    dealer: iRound.dealer,
  } as Round;
};
