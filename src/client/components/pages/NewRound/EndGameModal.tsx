import { Button, Flex, Modal, Title } from '@mantine/core';

interface EndGameModalProps {
  handleEndGame: () => void;
  isOpened: boolean;
  close: () => void;
}

const buttonStyles = {
  margin: '1rem',
  padding: '0px 1rem',
};

export const EndGameModal = ({
  handleEndGame,
  isOpened,
  close,
}: EndGameModalProps) => {
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
        Are you sure you want to end this game? You will not be able to add new
        rounds, but you will still be able to edit old rounds.
      </Title>
      <Flex justify='center'>
        <Button style={buttonStyles} onClick={close}>
          Cancel
        </Button>
        <Button style={buttonStyles} onClick={handleEndGame}>
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};
