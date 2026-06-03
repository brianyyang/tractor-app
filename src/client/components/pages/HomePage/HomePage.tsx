'use client';

import { Button, Stack, Title, Flex } from '@mantine/core';
import { useGame, GameState } from '@/client/contexts/GameContext';
import { NewGame } from '../NewGame/NewGame';
import { NewRound } from '../NewRound/NewRound';
import styles from './HomePage.module.css';
import { GameHistory } from '../GameHistory/GameHistory';
import { ManagePlayers } from '../ManagePlayers/ManagePlayers';
import { ResumeGame } from '../ResumeGame/ResumeGame';

export const HomePage = () => {
  const { gameState, setGameState, gameId, roundNumber, clearGameState } =
    useGame();

  const renderGameState = (gameState: GameState) => {
    switch (gameState) {
      case GameState.Home:
        return (
          <Stack align='center'>
            <div>
              <Button
                className={styles.button}
                variant='light'
                color='indigo'
                onClick={() => setGameState(GameState.NewGame)}
              >
                New Game
              </Button>
              <Button
                className={styles.button}
                variant='light'
                color='indigo'
                onClick={() => setGameState(GameState.ResumeGame)}
              >
                Resume Game
              </Button>
            </div>
            <Button
              className={styles.button}
              style={{ width: '50%' }}
              variant='light'
              color='indigo'
              onClick={() => setGameState(GameState.GameHistory)}
            >
              Past Games
            </Button>
            <Button
              className={styles.button}
              style={{ width: '60%' }}
              variant='light'
              color='indigo'
              onClick={() => setGameState(GameState.ManagePlayers)}
            >
              Manage Players
            </Button>
          </Stack>
        );

      case GameState.NewGame:
        return <NewGame />;

      case GameState.NewRound:
        return <NewRound />;

      case GameState.GameHistory:
        return <GameHistory />;

      case GameState.ManagePlayers:
        return <ManagePlayers />;

      case GameState.ResumeGame:
        return <ResumeGame />;

      default:
        return <Title>This page is unimplemented</Title>;
    }
  };

  return (
    <Stack align='center' justify='center' className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <Title
          className={styles.title}
          onClick={() => {
            clearGameState();
            setGameState(GameState.Home);
          }}
        >
          Tractor
        </Title>
        {gameId > 0 && (
          <Flex justify='center' mt='1rem'>
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
        justify='center'
        align='flex-start'
        className={styles.contentContainer}
      >
        {renderGameState(gameState)}
      </Flex>
    </Stack>
  );
};
