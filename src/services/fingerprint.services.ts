import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    mode: 'attendance' | 'register',
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
                ...data

            }
        );
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}

export const registerMemberFingerprint = async (code: String) => {
    try {
        const response = await axios.post(`${config.url}api/members/${code}/enroll-device/`,

            {} 
            , {
                            headers: {
                                'Authorization': `Bearer ${Cookies.get('token')}`,
                                'Content-Type': 'multipart/form-data',
                            },
                        }
        );
        return { data: response.data, status: response.status };
    } catch (error) { 
        return { error: error.response?.data.error || error.response?.data.details|| "Error Occured. Try Again Later",status:error.response.status }
    }

}