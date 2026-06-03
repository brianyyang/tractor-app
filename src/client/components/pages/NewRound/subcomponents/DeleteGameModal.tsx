'use client';

import { Button, Flex, Modal, Title } from '@mantine/core';

interface DeleteGameModalProps {
  handleDeleteGame: () => void;
  isOpened: boolean;
  close: () => void;
}

const buttonStyles = {
  margin: '1rem',
  padding: '0px 1rem',
};

export const DeleteGameModal = ({
  handleDeleteGame,
  isOpened,
  close,
}: DeleteGameModalProps) => {
  return (
    <Modal
      opened={isOpened}
      onClose={close}
      centered
      withCloseButton={false}
      ta='center'
      size='90vw'
      styles={{
        content: {
          paddingTop: '1rem',
          backgroundColor: '#e5e5e5ff',
          maxWidth: '500px',
        },
      }}
    >
      <Title order={6}>
        Are you sure you want to delete this game? This will delete all rounds
        for the game too.
      </Title>
      <Flex justify='center'>
        <Button style={buttonStyles} onClick={close}>
          Cancel
        </Button>
        <Button style={buttonStyles} onClick={handleDeleteGame}>
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};
