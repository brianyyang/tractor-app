/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerData } from '@/pages/api/players';
import axios from 'axios';
const API_URL = '/api/players';

// retrieve all players
export const getAllPlayers = async () => {
  try {
    const response = await axios.get(API_URL);
    const data: PlayerData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve players',
    );
  }
};

// create a player
export const createPlayer = async (playerName: string) => {
  try {
    const response = await axios.post(API_URL, { playerName: playerName });
    const data: PlayerData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        'Failed to create player: please notify Brian.',
    );
  }
};
