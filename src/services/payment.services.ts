import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    member_id: number,
    membership_class: 'Regular Monthly' | '3 month Cardio' | 'Cardio Monthly' | '3 Month Gym' | 'none'

    membership_amount: number,
    paid_amount: number,
    start_date: string,
    end_date: string,


}
interface editData {
    id: number;
    member_id: number,
    membership_class: 'Regular Monthly' | '3 month Cardio' | 'Cardio Monthly' | '3 Month Gym'



}


export const fetchPayments = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/membership-payment`, {
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
export const fetchPaymentsUsingSearch = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${config.url}api/membership-payment/?global_search=${searchQuery}&invoice_type=income`, {
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
        const response = await axios.post(`${config.url}api/membership-payment/?query=invoice-type-income
`,
            {
                ...data,

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
        const response = await axios.patch(`${config.url}api/membership-payment/${id}/
`,
            {
                ...data
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
        const response = await axios.delete(`${config.url}api/membership-payment/${id}/`,

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

export const downloadPdfPayment = async (id: number) => {
    try {
        const response = await axios.get(`${config.url}api/membership-payment/?query=download-receipt&mp_id=${id}
`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                responseType: 'blob', // Indicates that the response will be a binary file
            });
        // Create a Blob object from the response
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `income_report_${id}.pdf`); // Set the desired file name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up the link elemen
        // return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}