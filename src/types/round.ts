import { IBoatTicket, IRound } from '@/server/models/Round';

export type BoatTicket = {
  player: string;
  card: string;
  sequence: number;
};

export const fromIBoatTicket = (iBoatTicket: IBoatTicket) => {
  return {
    player: iBoatTicket.player,
    card: iBoatTicket.card,
    sequence: iBoatTicket.sequence,
  } as BoatTicket;
};

export type Round = {
  gameId: number;
  roundId: number;
  dealerTeam: string[];
  otherTeam: string[];
  pointsScored: number;
  dealer: string;
  boatTickets: BoatTicket[];
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
