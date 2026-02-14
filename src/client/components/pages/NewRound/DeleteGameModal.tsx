import { Modal } from '@mantine/core';

interface DeleteGameModalProps {
  handleDeleteGame: () => void;
  isOpened: boolean;
  close: () => void;
}

export const DeleteGameModal = ({
  handleDeleteGame,
  isOpened,
  close,
}: DeleteGameModalProps) => {
  return <Modal opened={isOpened} onClose={close}></Modal>;
};
