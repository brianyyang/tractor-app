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
