'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useState } from 'react';
import { Button, Flex, Stack, Title } from '@mantine/core';
import { IconUsersPlus } from '@tabler/icons-react';
import { createPlayer } from '@/client/apis/playerAPI';
import { StyledTextInput } from '../../TextInputs/StyledTextInput';

export const AddPlayers = () => {
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [playerName, setPlayerName] = useState('');
  const submitButtonStyles = {
    marginLeft: '1rem',
    marginTop: '2rem',
  } as CSSProperties;

  const handleAddPlayer = async () => {
    try {
      if (playerName !== '') {
        const playerData = await createPlayer(playerName);
        if (playerData.player) {
          setResponseMsg(playerName + ' successfully added!');
          setPlayerName('');
        }
      }
    } catch (err: any) {
      console.error('Error creating game:', err);
      setErrorMsg(err.message);
    }
  };

  return errorMsg !== '' ? (
    <Stack align='center'>
      <Title order={4}>{errorMsg}</Title>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={submitButtonStyles}
        onClick={() => {
          setErrorMsg('');
          setPlayerName('');
        }}
      >
        Continue
      </Button>
    </Stack>
  ) : (
    <Stack>
      {responseMsg && (
        <Title order={4} m={'0 0 0 1rem'}>
          {responseMsg}
        </Title>
      )}
      <Flex
        align='center'
        justify='space-between'
        style={{ margin: '2rem 1rem 0 1rem' }}
      >
        <b>Player Name</b>
        <IconUsersPlus size={28} style={{ marginRight: '-4px' }} />
      </Flex>
      <StyledTextInput
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        w={246}
        style={{ margin: '1rem 1rem 0 1rem' }}
      />
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={submitButtonStyles}
        onClick={() => {
          handleAddPlayer();
        }}
      >
        Add Player
      </Button>
    </Stack>
  );
};
