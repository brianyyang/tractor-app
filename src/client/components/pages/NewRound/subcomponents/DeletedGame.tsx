import { GameState, useGame } from '@/client/contexts/GameContext';
import { Stack, Title, Button } from '@mantine/core';

const showDetailsButtonStyles = {
  marginLeft: '1rem',
  marginTop: '1rem',
};

export const DeletedGame = () => {
  const { setGameState } = useGame();
  return (
    <Stack align='center'>
      <Title order={4}>Game deleted successfully!</Title>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={showDetailsButtonStyles}
        onClick={() => {
          setGameState(GameState.Home);
        }}
      >
        Return to Homepage
      </Button>
    </Stack>
  );
};
