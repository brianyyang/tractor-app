'use client';

import { useState } from 'react';
import { Button, Flex, Stack, Title } from '@mantine/core';
import styles from './page.module.css';
import { NewGame } from '@/components/NewGame/NewGame';

export default function Home() {
  const [creatingNewGame, setCreatingNewGame] = useState(false);

  return (
    <Stack align="center" justify="center" className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Tractor</Title>
      </div>
      <Flex
        justify="center"
        align="flex-start"
        className={styles.contentContainer}
      >
        {creatingNewGame ? (
          <NewGame />
        ) : (
          <>
            <Button
              className={styles.button}
              variant="light"
              color="indigo"
              onClick={() => setCreatingNewGame(true)}
            >
              New Game
            </Button>
            <Button className={styles.button} variant="light" color="indigo">
              Past Games
            </Button>
          </>
        )}
      </Flex>
    </Stack>
  );
}
