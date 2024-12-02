
import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    year: number;
    month: number;
    profit: number;
    total_revenue: number;
    total_expenses: number;

}



export const fetchProfitLossReport = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/income-expense/?query=monthly-income-expense-profit`, {
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