'use client';

import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { useGame } from '@/client/contexts/GameContext';
import { Player } from '@/types/player';
import {
  createRound,
  editRound,
  getAllRoundsByID,
} from '@/client/apis/roundAPI';
import { fromIRound, Round } from '@/types/round';
import { PlayerRoundTable } from '../../Tables/PlayerRoundTable/PlayerRoundTable';
import { RoundTable } from '../../Tables/RoundTable/RoundTable';
import { deleteGameById, endGameById } from '@/client/apis/gameAPI';
import { useDisclosure } from '@mantine/hooks';
import { DeleteGameModal } from './subcomponents/DeleteGameModal';
import { EndGameModal } from './subcomponents/EndGameModal';
import { areFieldsValid } from './NewRoundUtils';
import { DeletedGame } from './subcomponents/DeletedGame';
import { NewRoundInputs } from './subcomponents/NewRoundInputs';
import { NewRoundButtons } from './subcomponents/NewRoundButtons';

export const NewRound = () => {
  const {
    gameId,
    players,
    roundNumber,
    setRoundNumber,
    startingRank,
    gameEnded,
    setGameEnded,
    clearGameState,
  } = useGame();
  const [dealerTeam, setDealerTeam] = useState<Player[]>([]);
  const [pointsScored, setPointsScored] = useState<string>('0');
  const [dealer, setDealer] = useState<Player>();
  const [dealerKey, setDealerKey] = useState<number>(0); // used to remount component on submit
  const [showGameDetails, setShowGameDetails] = useState<boolean>(false);
  const [endModalOpen, { close: closeEnd, open: openEnd }] =
    useDisclosure(false);
  const [deleteModalOpen, { close: closeDelete, open: openDelete }] =
    useDisclosure(false);
  const [gameDeleted, setGameDeleted] = useState<boolean>(false);

  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  const isEditingRound = useMemo(() => {
    return !loading && !gameDeleted && roundNumber !== rounds.length + 1;
  }, [roundNumber, rounds]);

  useEffect(() => {
    handleLoadRounds();
  }, [gameId, roundNumber]);

  const handleLoadRounds = () => {
    getAllRoundsByID(gameId)
      .then((data) => {
        if (data.rounds) {
          setRounds(data.rounds.map((iRound) => fromIRound(iRound)));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isEditingRound) {
      const roundToEdit = rounds[roundNumber - 1];
      setDealerTeam(
        players.filter((player) =>
          roundToEdit.dealerTeam.includes(player.name),
        ),
      );
      setPointsScored(String(roundToEdit.pointsScored));
      setDealer(players.find((player) => player.name === roundToEdit.dealer));
    }
  }, [isEditingRound, roundNumber]);

  const otherTeam = useMemo(() => {
    return players.filter((player) => !dealerTeam.includes(player));
  }, [dealerTeam]);

  const handleDealerTeamChange = (values: string[]) => {
    const selectedPlayers = players.filter((player) =>
      values.includes(player.name),
    );
    setDealerTeam(selectedPlayers);
  };

  const resetRoundFields = () => {
    setDealerTeam([]);
    setPointsScored('0');
    setDealer(undefined);
    setDealerKey((k) => k + 1);
  };

  const submitButtonStyles = {
    marginLeft: '1rem',
    marginTop: '2rem',
    pointerEvents: !areFieldsValid(dealerTeam, otherTeam, pointsScored, dealer)
      ? 'none'
      : undefined,
    opacity: !areFieldsValid(dealerTeam, otherTeam, pointsScored, dealer)
      ? '0.8'
      : '1',
  } as CSSProperties;

  const showDetailsButtonStyles = {
    marginLeft: '1rem',
    marginTop: '1rem',
  };

  const handleCreateRound = async () => {
    try {
      if (dealerTeam.length > 0 && dealer) {
        const roundData = await createRound(
          gameId,
          dealerTeam,
          otherTeam,
          Number(pointsScored),
          dealer,
        );
        if (roundData.round) {
          const createdRound = fromIRound(roundData.round);
          setRoundNumber(createdRound.roundId + 1);
          setLoading(true);
          resetRoundFields();
        }
      }
    } catch (err) {
      console.error('Error creating round:', err);
    }
  };

  const handleEditRound = async () => {
    try {
      if (dealerTeam.length > 0 && dealer) {
        const roundData = await editRound(
          gameId,
          roundNumber,
          dealerTeam,
          otherTeam,
          Number(pointsScored),
          dealer,
        );
        if (roundData.round) {
          handleLoadRounds();
        }
      }
    } catch (err) {
      console.error('Error editing round:', err);
    }
  };

  const handleEndGame = async () => {
    try {
      await endGameById(String(gameId));
      setGameEnded(true);
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  const handleDeleteGame = async () => {
    try {
      await deleteGameById(String(gameId));
      resetRoundFields();
      close();
      clearGameState();
      setGameDeleted(true);
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  return (
    <Stack>
      {gameDeleted ? (
        <DeletedGame />
      ) : showGameDetails ? (
        <>
          <RoundTable gameId={gameId} />
          <Button
            variant='light'
            color='indigo'
            w={246}
            style={showDetailsButtonStyles}
            onClick={() => setShowGameDetails(false)}
          >
            Back
          </Button>
        </>
      ) : (
        <PlayerRoundTable
          pastRounds={rounds}
          startingRank={startingRank}
          isGameEnded={gameEnded}
        />
      )}
      {!showGameDetails && !gameDeleted && !gameEnded && (
        <>
          <NewRoundInputs
            players={players}
            dealerTeam={dealerTeam}
            otherTeam={otherTeam}
            handleDealerTeamChange={handleDealerTeamChange}
            pointsScored={pointsScored}
            setPointsScored={setPointsScored}
            dealer={dealer}
            setDealer={setDealer}
            dealerKey={dealerKey}
          />
          <NewRoundButtons
            isEditingRound={isEditingRound}
            handleEditRound={handleEditRound}
            handleCreateRound={handleCreateRound}
            setShowGameDetails={setShowGameDetails}
            openEnd={openEnd}
            openDelete={openDelete}
            submitButtonStyles={submitButtonStyles}
          />
          <EndGameModal
            handleEndGame={handleEndGame}
            isOpened={endModalOpen}
            close={closeEnd}
          />
          <DeleteGameModal
            handleDeleteGame={handleDeleteGame}
            isOpened={deleteModalOpen}
            close={closeDelete}
          />
        </>
      )}
    </Stack>
  );
};
