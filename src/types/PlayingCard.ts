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

const suitToSymbol = (suit: string) => {
  switch (suit) {
    case Suit.Spades:
      return '♠';
    case Suit.Hearts:
      return '♥';
    case Suit.Diamonds:
      return '♦';
    case Suit.Clubs:
      return '♣';
  }
};

const rankToInitial = (rank: Rank) => {
  switch (rank) {
    case Rank.Ace:
      return 'A';
    case Rank.Two:
      return '2';
    case Rank.Three:
      return '3';
    case Rank.Four:
      return '4';
    case Rank.Five:
      return '5';
    case Rank.Six:
      return '6';
    case Rank.Seven:
      return '7';
    case Rank.Eight:
      return '8';
    case Rank.Nine:
      return '9';
    case Rank.Ten:
      return '10';
    case Rank.Jack:
      return 'Ja';
    case Rank.Queen:
      return 'Q';
    case Rank.King:
      return 'K';
    case Rank.Joker:
      return 'Jo';
  }
};

export const playingCardToString = (card: PlayingCard) => {
  return `${card.rank} of ${card.suit}`;
};

export const stringToShortString = (card: string) => {
  const playingCard = stringToPlayingCard(card);
  return `${rankToInitial(playingCard.rank)} ${suitToSymbol(playingCard.suit)}`;
};

export const stringToPlayingCard = (str: string) => {
  const words = str.split(' ');
  return {
    rank: words[0] as Rank,
    suit: words[2] as Suit,
  } as PlayingCard;
};

export const rankToNumberValue = (rank: Rank) => {
  switch (rank) {
    case Rank.Ace:
      return 1;
    case Rank.Two:
      return 2;
    case Rank.Three:
      return 3;
    case Rank.Four:
      return 4;
    case Rank.Five:
      return 5;
    case Rank.Six:
      return 6;
    case Rank.Seven:
      return 7;
    case Rank.Eight:
      return 8;
    case Rank.Nine:
      return 9;
    case Rank.Ten:
      return 10;
    case Rank.Jack:
      return 11;
    case Rank.Queen:
      return 12;
    case Rank.King:
      return 13;
    case Rank.Joker:
      return 14;
  }
};

export const rankOptions = Object.values(Rank).map((rank) => ({
  value: rank,
  label: rank,
}));

export const suitOptions = Object.values(Suit).map((suit) => {
  const symbol = suitToSymbol(suit);
  return {
    value: suit,
    label: `${suit} ${symbol}`,
  };
});
