import axios from 'axios';
import { Player } from '@/types/player';
import { PlayingCard, playingCardToString } from '@/types/playingCard';
import { GameData } from '@/pages/api/games';

const API_URL = '/api/games';

// create a game
export const createGame = async (
  players: Player[],
  startingCard: PlayingCard
) => {
  const gameData = {
    players: players.map((player) => player.name),
    startingCard: playingCardToString(startingCard),
  };
  try {
    const response = await axios.post(API_URL, gameData);
    const data: GameData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create game');
  }
};

// retrieve game by ID
export const getGameByID = async (gameId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${gameId}`);
    const data: GameData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve game');
  }
};

// retrieve 20 games by page number
export const getGamesPaginated = async (pageNumber: number) => {
  try {
    const response = await axios.get(`${API_URL}?page=${pageNumber}`);
    const data: GameData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve games'
    );
  }
};
