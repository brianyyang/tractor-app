import axios from 'axios';
import { Player } from '@/types/player';
import { PlayingCard } from '@/types/playingCard';

const API_URL = '/api/games';

// create a game
export const createGame = async (
  players: Player[],
  startingCard: PlayingCard
) => {
  const gameData = {
    players: players,
    startingCard: startingCard,
  };
  try {
    const response = await axios.post(API_URL, gameData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create game');
  }
};

// retrieve game by ID
export const getGameByID = async (gameId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${gameId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve game');
  }
};
