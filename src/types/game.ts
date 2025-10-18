import { IGame } from '@/server/models/Game';
import { Player } from './player';
import { PlayingCard } from './playingCard';

export type Game = {
  gameId: number;
  date: Date;
  players: Player[];
  startingCard: PlayingCard;
};

export const fromIGame = (iGame: IGame) => {
  return {
    gameId: iGame.gameId,
    date: iGame.date,
    players: iGame.players,
    startingCard: iGame.startingCard,
  } as Game;
};
