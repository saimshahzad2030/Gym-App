import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
import AddPayment from '../pages/Payments/AddPayment';
interface Data {
    membership_name: string;
    name_of_member: string;
    member_id: Number;
    label: string;
    amount: string;
    payment_date: Date | null;


}
interface editData {
    id: number;
    membership_name: string;
    member_id: number;
    name_of_member: string;
    label: string;
    amount: string;
    payment_date: Date | null;


}


export const fetchPayments = async () => {
    try {
        const response = await axios.get(`${config.url}api/payments`, {
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

export const addPayment = async (data: Data) => {
    try {
        const response = await axios.post(`${config.url}api/payments/`,
            {
                membership_name: data.membership_name,
                name_of_member: data.name_of_member,
                member_id: data.member_id,
                label: data.label,
                amount: data.amount,
                payment_date: data.payment_date,

            },
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

export const editPayment = async (id: number, data: editData) => {
    try {
        const response = await axios.patch(`${config.url}api/payments/${id}/`,
            {
                membership_name: data.membership_name,
                name_of_member: data.name_of_member,
                label: data.label,
                amount: data.amount,
                payment_date: data.payment_date,
            },
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


export const deletePayment = async (id: number) => {
    try {
        const response = await axios.delete(`${config.url}api/payments/${id}/`,

            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        return { data: response.data, status: response.status };

    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}