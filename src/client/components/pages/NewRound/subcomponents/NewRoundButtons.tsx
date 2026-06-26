'use client';

import { Button, Stack } from '@mantine/core';
import { CSSProperties } from 'react';

interface NewRoundButtonsProps {
  isEditingRound: boolean;
  handleEditRound: () => void;
  handleCreateRound: () => void;
  handleReturnToNewRound: () => void;
  setShowGameDetails: (showGameDetails: boolean) => void;
  openEnd: () => void;
  openDelete: () => void;
  submitButtonStyles: CSSProperties;
}

const showDetailsButtonStyles = {
  marginTop: '1rem',
};

const deleteGameButtonStyles = {
  marginTop: '1rem',
  marginBottom: '2rem',
};

export const NewRoundButtons = (props: NewRoundButtonsProps) => {
  const {
    isEditingRound,
    handleEditRound,
    handleCreateRound,
    handleReturnToNewRound,
    setShowGameDetails,
    openEnd,
    openDelete,
    submitButtonStyles,
  } = props;

  return (
    <Stack align='center'>
      <Button
        variant='light'
        color='white'
        w={246}
        style={submitButtonStyles}
        onClick={isEditingRound ? handleEditRound : handleCreateRound}
      >
        {isEditingRound ? 'Edit Round' : 'Add Round'}
      </Button>
      {isEditingRound && (
        <Button
          variant='light'
          color='white'
          w={246}
          style={showDetailsButtonStyles}
          onClick={handleReturnToNewRound}
        >
          Return to New Round
        </Button>
      )}
      <Button
        variant='light'
        color='white'
        w={246}
        style={showDetailsButtonStyles}
        onClick={() => setShowGameDetails(true)}
      >
        Show Game Details
      </Button>
      <Button
        variant='light'
        color='white'
        w={246}
        style={showDetailsButtonStyles}
        onClick={openEnd}
      >
        End Game
      </Button>
      <Button
        variant='light'
        color='white'
        w={246}
        style={deleteGameButtonStyles}
        onClick={openDelete}
      >
        Delete Game
      </Button>
    </Stack>
  );
};
