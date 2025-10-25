import axios from 'axios';
import { RoundData } from '@/pages/api/games/[gameId]/rounds';
import { Player } from '@/types/player';

const API_URL = '/api/games/';

// create a round for game
export const createRound = async (
  gameId: number,
  winningTeam: Player[],
  otherTeam: Player[],
  pointsScored: number,
  dealer: Player
) => {
  const roundBody = {
    winningTeam: winningTeam.map((player) => player.name),
    otherTeam: otherTeam.map((player) => player.name),
    pointsScored: pointsScored,
    dealer: dealer.name,
  };
  try {
    const response = await axios.post(`${API_URL}/${gameId}/rounds`, roundBody);
    const data: RoundData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create round');
  }
};

// retrieve round by ID for game
export const getRoundByID = async (gameId: number, roundId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${gameId}/rounds/${roundId}`);
    const data: RoundData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve round'
    );
  }
};

// retrieve all rounds for a game
export const getAllRoundsByID = async (gameId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${gameId}/rounds`);
    const data: RoundData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve games'
    );
  }
};
