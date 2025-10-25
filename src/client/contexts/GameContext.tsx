'use client';

import { Player } from '@/types/player';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum GameState {
  Home = 'home',
  NewGame = 'new game',
  NewRound = 'new round',
  GameHistory = 'game history',
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  gameId: number;
  setGameId: (id: number) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  roundNumber: number;
  setRoundNumber: (round: number) => void;
  clearGameState: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.Home);
  const [gameId, setGameId] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundNumber, setRoundNumber] = useState<number>(0);

  const clearGameState = () => {
    setGameId(0);
    setPlayers([]);
    setRoundNumber(0);
  };

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
        clearGameState,
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
