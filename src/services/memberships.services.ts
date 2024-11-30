import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';

interface Data {
    membership_label: string;
    membership_cat_id?: number;
    membership_length: number;
    membership_class_limit?: string | null;
    limit_days?: number;
    limitation?: string | null;
    install_plan_id?: number;
    membership_amount: number;
    membership_class?: string | null;
    installment_amount?: number;
    signup_fee: number;
    gmgt_membershipimage?: string;
    created_date?: string;
    created_by_id?: number;
    membership_description?: string | null;

}
interface editData {
    id: number;
    membership_label?: string;
    membership_cat_id?: number;
    membership_length?: number;
    membership_class_limit?: string | null;
    limit_days?: number;
    limitation?: string | null;
    install_plan_id?: number;
    membership_amount?: number;
    membership_class?: string | null;
    installment_amount?: number;
    signup_fee?: number;
    gmgt_membershipimage?: string;
    created_date?: string;
    created_by_id?: number;
    membership_description?: string | null;


}

export const fetchMemberships = async (url: string) => {
    try {
        // const response = await axios.get(url ? url : `${config.url}api/memberships`, {
        //     headers: {
        //         'Authorization': `Bearer ${Cookies.get('token')}`
        //     }
        // }
        // );
        const response = await axios.get(url ? url : `${config.url}api/membership`, {
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

export const addMembership = async (data: Data) => {
    try {
        const date = new Date();
        const created_date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const response = await axios.post(`${config.url}api/membership/`,
            {
                membership_label: data?.membership_label,
                membership_length: data?.membership_length,
                membership_amount: data?.membership_amount,
                signup_fee: data?.signup_fee,
                membership_description: data?.membership_description,

                created_date
            }
            ,
            {
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

export const editMembership = async (id: number, data: editData) => {
    try {
        const response = await axios.patch(`${config.url}api/membership/${id}/`,
            {
                membership_label: data?.membership_label,
                membership_length: data?.membership_length,
                membership_amount: data?.membership_amount,
                signup_fee: data?.signup_fee,
                membership_description: data?.membership_description
            }
            ,
            {
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

export const deleteMembership = async (id: number) => {
    try {
        const response = await axios.delete(`${config.url}api/membership/${id}/`
            ,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }

        );
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}