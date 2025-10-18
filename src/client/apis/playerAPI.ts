import { PlayerData } from '@/pages/api/players';
import axios from 'axios';
const API_URL = '/api/players';

// retrieve all players
export const getAllPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    const data: PlayerData = response.data;
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve games'
    );
  }
};
