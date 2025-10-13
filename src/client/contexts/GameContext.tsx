'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum GameState {
  Home = 'home',
  NewGame = 'new game',
  NewRound = 'new round',
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  gameId: number;
  setGameId: (id: number) => void;
  players: string[];
  setPlayers: (players: string[]) => void;
  roundNumber: number;
  setRoundNumber: (round: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.Home);
  const [gameId, setGameId] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [roundNumber, setRoundNumber] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        gameId,
        setGameId,
        players,
        setPlayers,
        roundNumber,
        setRoundNumber,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
