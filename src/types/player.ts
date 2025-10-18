import { IPlayer } from '@/server/models/Player';

export type Player = {
  id?: string;
  name: string;
};

export const examplePlayers: Player[] = [
  { id: '1', name: 'Susan' },
  { id: '2', name: 'Myra' },
  { id: '3', name: 'Renee' },
  { id: '4', name: 'Sisi' },
  { id: '5', name: 'Raymond' },
  { id: '6', name: 'Wendy' },
];

export const fromIPlayer = (iPlayer: IPlayer) => {
  return { id: iPlayer.id, name: iPlayer.name } as Player;
};
