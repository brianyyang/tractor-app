'use client';

import { GameProvider } from '@/client/contexts/GameContext';
import { HomePage } from '@/client/components/HomePage/HomePage';

export default function Home() {
  return (
    <GameProvider>
      <HomePage />
    </GameProvider>
  );
}
