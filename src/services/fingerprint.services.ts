import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    finger_mode: string,
    member_id: number


}

export const fetchFingerprint = async () => {
    try {
        const response = await axios.get(`${config.url}api/finger-mode/`
        );
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}
export const addFingerprint = async (data: Data) => {
    try {
        const response = await axios.post(`${config.url}api/finger-mode/`,

            {
                ...data,
                finger_mode: 'fingerprint'

            }
        );
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}