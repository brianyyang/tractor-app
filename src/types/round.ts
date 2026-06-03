import { IBoatTicket, IRound } from '@/server/models/Round';

export type BoatTicket = {
  player: string;
  card: string;
  sequence: string;
};

export const fromIBoatTicket = (iBoatTicket: IBoatTicket) => {
  return {
    player: iBoatTicket.player,
    card: iBoatTicket.card,
    sequence: String(iBoatTicket.sequence),
  } as BoatTicket;
};

export type Round = {
  gameId: number;
  roundId: number;
  otherTeam: string[];
  pointsScored: number;
  dealer: string;
  boatTickets: BoatTicket[];
};

export const fromIRound = (iRound: IRound) => {
  return {
    gameId: iRound.gameId,
    roundId: iRound.roundId,
    otherTeam: iRound.otherTeam,
    pointsScored: iRound.pointsScored,
    dealer: iRound.dealer,
    boatTickets: iRound.boatTickets.map((ticket) => fromIBoatTicket(ticket)),
  } as Round;
};
