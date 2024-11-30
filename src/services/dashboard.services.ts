import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {

    year: string,
    total_revenue: number | null,
    total_expenses: number | null,
    profit: null

}


export const fetchDashboardMonthlyIncomeExpense = async () => {
    try {
        const response: { status: number, data: { monthly_data: Data[] } } = await axios.get(`${config.url}api/income-expense/?query=monthly-income-expense-profit`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        }
        );
        return { status: response.status, data: response.data.monthly_data };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}

export const fetchDashboardTotalMembers = async () => {
    try {
        const totalMemberResponse: { status: number, data: { total_members: number } } = await axios.get(`${config.url}api/members/?query=total-members`,

            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        const totalIncomeExpenseResponse: { status: number, data: { total_revenue: number, total_expenses: number } } = await axios.get(`${config.url}api/income-expense/?query=income-expense`,

            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        return { totalIncomeExpenseResponseData: totalIncomeExpenseResponse.data, totalMemberResponseData: totalMemberResponse.data.total_members, status: totalIncomeExpenseResponse.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}
