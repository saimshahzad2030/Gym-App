import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    invoice_type: 'expense' | 'income'; // Specifies the type of invoice (e.g., 'expense')
    invoice_label: string | null; // Optional label for the invoice
    supplier_name: string; // Name of the supplier
    entry: string; // JSON string representing an array of entries
    payment_status: 'Paid' | 'Unpaid' | 'Pending'; // Status of the payment
    total_amount: number; // Total amount for the invoice
    receiver_id: number | null; // ID of the receiver (nullable)
    invoice_date: string; // Date of the invoice in ISO format (e.g., "YYYY-MM-DD")
    is_active: 0 | 1; // Indicates if the invoice is active (1 = active, 0 = inactive)
    delete_reason: string | null; // Reason for deletion (nullable)
    mp_id: number | null; // Additional field for mapping purposes (nullable)

}
interface editData {
    id: number; // Unique identifier for the invoice
    invoice_type: 'expense' | 'income'; // Specifies the type of invoice (e.g., 'expense')
    invoice_label: string | null; // Optional label for the invoice
    supplier_name: string; // Name of the supplier
    entry: string; // JSON string representing an array of entries
    payment_status: 'Paid' | 'Unpaid' | 'Pending'; // Status of the payment
    total_amount: number; // Total amount for the invoice
    receiver_id: number | null; // ID of the receiver (nullable)
    invoice_date: string; // Date of the invoice in ISO format (e.g., "YYYY-MM-DD")
    is_active: 0 | 1; // Indicates if the invoice is active (1 = active, 0 = inactive)
    delete_reason: string | null; // Reason for deletion (nullable)
    mp_id: number | null; // Additional field for mapping purposes (nullable)



}


export const fetchExpenses = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/income-expense/?query=invoice-type-expense`, {
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
export const fetchExpensesUsingSearch = async () => {
    try {
        const response = await axios.get(`${config.url}api/income-expense/?query=invoice-type-expense`, {
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
export const addExpense = async (data: Data) => {
    try {
        const response = await axios.post(`${config.url}api/income-expense/?query=invoice-type-expense
`,
            {
                ...data,
                invoice_date: new Date(data.invoice_date).toISOString().split('T')[0], // Ensure YYYY-MM-DD format

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

export const editExpense = async (id: number, data: editData) => {
    try {
        const response = await axios.patch(`${config.url}api/expenses/${id}/`,
            {
                expense_name: data.expense_name,
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


export const deleteExpense = async (id: number) => {
    try {
        const response = await axios.delete(`${config.url}api/expenses/${id}/`,

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