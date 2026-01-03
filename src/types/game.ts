import { IGame } from '@/server/models/Game';
import { PlayingCard, stringToPlayingCard } from './PlayingCard';

export type Game = {
  gameId: number;
  date: Date;
  players: string[];
  startingCard: PlayingCard;
};

export const fromIGame = (iGame: IGame) => {
  return {
    gameId: iGame.gameId,
    date: iGame.date,
    players: iGame.players,
    startingCard: stringToPlayingCard(iGame.startingCard),
  } as Game;
};
