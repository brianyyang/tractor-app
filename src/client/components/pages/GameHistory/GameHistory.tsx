'use client';

import { useState } from 'react';
import { GameTable } from '../../Tables/GameTable/GameTable';
import { RoundTable } from '../../Tables/RoundTable/RoundTable';

export const GameHistory = () => {
  const [gameId, setGameId] = useState<number>(0);
  return gameId === 0 ? (
    <GameTable onGameClick={setGameId} />
  ) : (
    <RoundTable gameId={gameId} />
  );
};
