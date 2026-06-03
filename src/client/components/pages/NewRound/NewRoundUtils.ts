import { Player } from '@/types/player';
import { BoatTicket } from '@/types/round';

export const areFieldsValid = (
  boatTickets: BoatTicket[],
  otherTeam: Player[],
  pointsScored: string,
  dealer: Player | undefined,
) => {
  return !(
    boatTickets.length < 2 ||
    !boatTickets.every(isValidBoatTicket) ||
    otherTeam.length < 2 ||
    !isValidInteger(pointsScored) ||
    dealer === undefined
  );
};

const isValidInteger = (str: string) => {
  const num = Number(str);
  return str !== '' && Number.isInteger(num);
};

const isValidBoatTicket = (ticket: BoatTicket) => {
  return (
    ticket.player !== '' &&
    Number.isInteger(Number(ticket.sequence)) &&
    ticket.card.split(' ').length === 3
  );
};
