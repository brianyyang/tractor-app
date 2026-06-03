'use client';

import { Player } from '@/types/player';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum GameState {
  Home = 'home',
  NewGame = 'new game',
  NewRound = 'new round',
  GameHistory = 'game history',
  ManagePlayers = 'manage players',
  ResumeGame = 'resume game',
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  gameId: number;
  setGameId: (id: number) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  startingRank: number;
  setStartingRank: (rank: number) => void;
  roundNumber: number;
  setRoundNumber: (round: number) => void;
  gameEnded: boolean;
  setGameEnded: (isGameEnded: boolean) => void;
  clearGameState: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.Home);
  const [gameId, setGameId] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundNumber, setRoundNumber] = useState<number>(0);
  const [startingRank, setStartingRank] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const clearGameState = () => {
    setGameId(0);
    setPlayers([]);
    setRoundNumber(0);
    setStartingRank(0);
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
        startingRank,
        setStartingRank,
        roundNumber,
        setRoundNumber,
        gameEnded,
        setGameEnded,
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
