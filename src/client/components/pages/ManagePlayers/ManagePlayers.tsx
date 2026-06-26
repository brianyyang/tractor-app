'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useEffect, useState } from 'react';
import { Button, Flex, Loader, Stack, Title } from '@mantine/core';
import { IconUsersPlus } from '@tabler/icons-react';
import {
  createPlayer,
  deletePlayers,
  getAllPlayers,
} from '@/client/apis/playerAPI';
import { StyledTextInput } from '../../TextInputs/StyledTextInput';
import { StyledMultiSelect } from '../../Selects/StyledMultiSelect';
import { PlayerData } from '@/pages/api/players';
import { Player, fromIPlayer } from '@/types/player';
import { useDisclosure } from '@mantine/hooks';
import { DeletePlayersModal } from './DeletePlayersModal';

export const ManagePlayers = () => {
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [playersToDelete, setPlayersToDelete] = useState<Player[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [deleteModalOpen, { close, open }] = useDisclosure(false);

  const submitButtonStyles = {
    marginTop: '1rem',
  } as CSSProperties;

  useEffect(() => {
    const fetchPlayers = async () => {
      const response: PlayerData = await getAllPlayers();
      if (response.players) {
        setAvailablePlayers(
          response.players.map((iPlayer) => fromIPlayer(iPlayer)),
        );
      } else {
        setAvailablePlayers([]);
      }
    };

    fetchPlayers();
    setDataLoading(false);
  }, [responseMsg, errorMsg]);

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

  const handlePlayerChange = (values: string[]) => {
    const selectedPlayers = availablePlayers.filter((player) =>
      values.includes(player.name),
    );
    setPlayersToDelete(selectedPlayers);
  };

  const handleDeletePlayers = async () => {
    try {
      if (playersToDelete.length > 0) {
        await deletePlayers(playersToDelete.map((player) => player.name));
        setResponseMsg(
          `${playersToDelete
            .map((player) => player.name)
            .join(
              ', ',
            )} ${playersToDelete.length === 1 ? 'has' : 'have'} been successfully deleted!`,
        );
        setPlayersToDelete([]);
      }
      close();
    } catch (err) {
      console.error('Error deleting players:', err);
    }
  };

  return dataLoading ? (
    <Loader />
  ) : errorMsg !== '' ? (
    <Stack align='center'>
      <Title order={4}>{errorMsg}</Title>
      <Button
        variant='light'
        color='white'
        w='100%'
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
    <Stack align='center'>
      {responseMsg && (
        <Title order={4} mb='1rem'>
          {responseMsg}
        </Title>
      )}
      <Flex align='center' justify='space-between' mt='1rem' w='100%'>
        <b>Player Name</b>
        <IconUsersPlus size={28} />
      </Flex>
      <StyledTextInput
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        w='100%'
        mt='1rem'
      />
      <Button
        variant='light'
        color='white'
        w='100%'
        style={submitButtonStyles}
        onClick={() => {
          handleAddPlayer();
        }}
      >
        Add Player
      </Button>

      <Flex align='center' justify='space-between' mt='1rem' w='100%'>
        <b>Player Names</b>
        <IconUsersPlus size={28} />
      </Flex>
      <StyledMultiSelect
        data={availablePlayers.map((player) => player.name)}
        value={playersToDelete.map((player) => player.name)}
        onChange={handlePlayerChange}
        w={246}
      />
      <Button
        variant='light'
        color='white'
        w='100%'
        style={submitButtonStyles}
        onClick={() => {
          open();
        }}
      >
        Delete Players
      </Button>
      <DeletePlayersModal
        handleDeletePlayers={handleDeletePlayers}
        isOpened={deleteModalOpen}
        close={close}
      />
    </Stack>
  );
};
