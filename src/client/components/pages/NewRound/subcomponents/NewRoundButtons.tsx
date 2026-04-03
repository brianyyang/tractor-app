import { Box, Button } from '@mantine/core';
import { CSSProperties } from 'react';

interface NewRoundButtonsProps {
  isEditingRound: boolean;
  handleEditRound: () => void;
  handleCreateRound: () => void;
  setShowGameDetails: (showGameDetails: boolean) => void;
  openEnd: () => void;
  openDelete: () => void;
  submitButtonStyles: CSSProperties;
}

const showDetailsButtonStyles = {
  marginLeft: '1rem',
  marginTop: '1rem',
};

const deleteGameButtonStyles = {
  marginLeft: '1rem',
  marginTop: '1rem',
  marginBottom: '2rem',
};

export const NewRoundButtons = (props: NewRoundButtonsProps) => {
  const {
    isEditingRound,
    handleEditRound,
    handleCreateRound,
    setShowGameDetails,
    openEnd,
    openDelete,
    submitButtonStyles,
  } = props;

  return (
    <Box>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={submitButtonStyles}
        onClick={isEditingRound ? handleEditRound : handleCreateRound}
      >
        {isEditingRound ? 'Edit Round' : 'Add Round'}
      </Button>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={showDetailsButtonStyles}
        onClick={() => setShowGameDetails(true)}
      >
        Show Game Details
      </Button>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={showDetailsButtonStyles}
        onClick={openEnd}
      >
        End Game
      </Button>
      <Button
        variant='light'
        color='indigo'
        w={246}
        style={deleteGameButtonStyles}
        onClick={openDelete}
      >
        Delete Game
      </Button>
    </Box>
  );
};
