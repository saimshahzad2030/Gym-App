import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';

export const authGuard = async () => {
    try {
        const response = await axios.get(`${config.url}api/auth-check/`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }
}