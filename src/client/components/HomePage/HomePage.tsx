'use client';

import { Button, Stack, Title, Flex } from '@mantine/core';
import { useGame, GameState } from '@/client/contexts/GameContext';
import { NewGame } from '../NewGame/NewGame';
import { NewRound } from '../NewRound/NewRound';
import styles from './HomePage.module.css';
import { GameTable } from '../Tables/GameTable';

export const HomePage = () => {
  const { gameState, setGameState, gameId, roundNumber } = useGame();

  const renderGameState = (gameState: GameState) => {
    switch (gameState) {
      case GameState.Home:
        return (
          <>
            <Button
              className={styles.button}
              variant="light"
              color="indigo"
              onClick={() => setGameState(GameState.NewGame)}
            >
              New Game
            </Button>
            <Button
              className={styles.button}
              variant="light"
              color="indigo"
              onClick={() => setGameState(GameState.GameHistory)}
            >
              Past Games
            </Button>
          </>
        );

      case GameState.NewGame:
        return <NewGame />;

      case GameState.NewRound:
        return <NewRound />;

      case GameState.GameHistory:
        return <GameTable />;

      default:
    }
  };

  return (
    <Stack align="center" justify="center" className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <Title
          className={styles.title}
          onClick={() => setGameState(GameState.Home)}
        >
          Tractor
        </Title>
        {gameId > 0 && (
          <Flex justify="center" mt="1rem">
            <b>{`Game ID: ${gameId}`}</b>
            {roundNumber > 0 && (
              <b
                style={{ whiteSpace: 'pre' }}
              >{`   |   Round #: ${roundNumber}`}</b>
            )}
          </Flex>
        )}
      </div>
      <Flex
        justify="center"
        align="flex-start"
        className={styles.contentContainer}
      >
        {renderGameState(gameState)}
      </Flex>
    </Stack>
  );
};
