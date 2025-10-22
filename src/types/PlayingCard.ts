export type PlayingCard = {
  rank: Rank;
  suit: Suit;
};

export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds',
}

export enum Rank {
  Ace = 'ace',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
  Six = 'six',
  Seven = 'seven',
  Eight = 'eight',
  Nine = 'nine',
  Ten = 'ten',
  Jack = 'jack',
  Queen = 'queen',
  King = 'king',
  Joker = 'joker',
}

export const playingCardToString = (card: PlayingCard) => {
  return `${card.rank} of ${card.suit}`;
};

export const stringToPlayingCard = (str: String) => {
  const words = str.split(' ');
  return {
    rank: words[0] as Rank,
    suit: words[2] as Suit,
  } as PlayingCard;
};
