import { Player } from './player';
import { PlayingCard } from './playingCard';

export type Game = {
  gameId: string;
  date: Date;
  players: Player[];
  startingCard: PlayingCard;
};
