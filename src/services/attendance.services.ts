


import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
import Memberships from '../components/Tables/Memeberships';



export const fetchAttendance = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/inout`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}

export const fetchSpecificMemberAttendance = async (memberId:number | string) => {
    try {
        const response = await axios.get(`${config.url}api/inout/attendance/${Number(memberId)}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}