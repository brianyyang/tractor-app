export type PlayingCard = {
  rank: Rank;
  suit: Suit;
};

export enum Suit {
  SPADES = 'spades',
  HEARTS = 'hearts',
  CLUBS = 'clubs',
  DIAMONDS = 'diamonds',
}

export enum Rank {
  ACE = 'ace',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = 'six',
  SEVEN = 'seven',
  EIGHT = 'eight',
  NINE = 'nine',
  TEN = 'ten',
  JACK = 'jack',
  QUEEN = 'queen',
  KING = 'king',
  JOKER = 'joker',
}
