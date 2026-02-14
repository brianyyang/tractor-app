import { Button, Flex, Modal, Title } from '@mantine/core';

interface DeletePlayersModalProps {
  handleDeletePlayers: () => void;
  isOpened: boolean;
  close: () => void;
}

const buttonStyles = {
  margin: '1rem',
  padding: '0px 1rem',
};

export const DeletePlayersModal = ({
  handleDeletePlayers,
  isOpened,
  close,
}: DeletePlayersModalProps) => {
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
        Are you sure you want to delete these players? This will delete all
        games and rounds that the players were in too.
      </Title>
      <Flex justify='center'>
        <Button style={buttonStyles} onClick={close}>
          Cancel
        </Button>
        <Button style={buttonStyles} onClick={handleDeletePlayers}>
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};
