import axios from 'axios'
import { config } from '../config/config';

type LoginData = {
  username: string;
  password: string;
}

export const adminLogin = async (data: LoginData) => {
  try {
    const response = await axios.post(`${config.url}api/token/`, {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return { error: error.response?.data.detail }
  }
}