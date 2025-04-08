import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
interface Data {
    invoice_type: 'income'; // Specifies the type of invoice (e.g., 'expense')
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


export const fetchIncomes = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/income-expense/?query=invoice-type-income`, {
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
export const fetchIncomesUsingSearch = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${config.url}api/income-expense/?global_search=${searchQuery}&invoice_type=income`, {
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
export const addIncome = async (data: Data) => {
    try {
        const response = await axios.post(`${config.url}api/income-expense/?query=invoice-type-income
`,
            {
                ...data,
                invoice_type: 'income',
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

export const editIncome = async (id: number, data: editData) => {
    try {
        const response = await axios.patch(`${config.url}api/income-expense/${id}/
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


export const deleteIncome = async (id: number) => {
    try {
        const response = await axios.patch(
            `${config.url}api/membership-payment/${id}/`,
            {
                is_active: 0  
            },
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

export const downloadPdfIncome = async (id: number) => {
    try {
        const response = await axios.get(`${config.url}api/income-expense/?query=download-receipt&income_id=${id}
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