import { Player } from '@/types/player';

export const areFieldsValid = (
  dealerTeam: Player[],
  otherTeam: Player[],
  pointsScored: string,
  dealer: Player | undefined,
) => {
  return !(
    dealerTeam.length < 2 ||
    otherTeam.length < 2 ||
    !isValidInteger(pointsScored) ||
    dealer === undefined
  );
};

const isValidInteger = (str: string) => {
  const num = Number(str);
  return str !== '' && Number.isInteger(num);
};
