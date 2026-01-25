import { IPlayer } from '@/server/models/Player';

export type Player = {
  id?: string;
  name: string;
};

export const fromIPlayer = (iPlayer: IPlayer) => {
  return { id: iPlayer._id, name: iPlayer.name } as Player;
};
