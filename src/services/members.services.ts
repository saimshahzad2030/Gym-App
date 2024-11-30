import axios from 'axios'
import { config } from '../config/config';
import Cookies from 'js-cookie';
import { string } from 'yup';
interface Data {
    activated?: number;
    role_name?: string;
    member_id?: string;
    token?: string;
    is_exist?: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    member_type?: string;
    role?: number;
    s_specialization?: string;
    gender: string;
    birth_date: string; // Format: YYYY-MM-DD
    assign_class?: number;
    assign_group?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    mobile: number;
    phone?: string;
    email?: string;
    weight?: string;
    height?: string;
    chest?: string;
    waist?: string;
    thing?: string;
    arms?: string;
    fat?: string;
    username?: string;
    password?: string;
    image: string;
    assign_staff_mem?: number;
    intrested_area?: number;
    g_source?: number;
    referrer_by?: number;
    inquiry_date?: string; // Format: YYYY-MM-DD
    trial_end_date?: string; // Format: YYYY-MM-DD
    selected_membership: string;
    membership_status?: string;
    membership_valid_from?: string; // Format: YYYY-MM-DD
    membership_valid_to?: string; // Format: YYYY-MM-DD
    first_pay_date?: string; // Format: YYYY-MM-DD
    created_by?: number;
    created_date?: string; // Format: YYYY-MM-DD
    alert_sent?: number;
    admin_alert?: number;
    alert_send_date?: string; // Format: YYYY-MM-DD
    members_reg_number?: string;
    fingerprint?: string;



}
interface editData {

    id: number;
    activated?: number;
    role_name?: string;
    member_id?: string;
    token?: string;
    is_exist?: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    member_type?: string;
    role?: number;
    s_specialization?: string;
    gender: string;
    birth_date: string; // Format: YYYY-MM-DD
    assign_class?: number;
    assign_group?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    mobile: number;
    phone?: string;
    email?: string;
    weight?: string;
    height?: string;
    chest?: string;
    waist?: string;
    thing?: string;
    arms?: string;
    fat?: string;
    username?: string;
    password?: string;
    image: string;
    assign_staff_mem?: number;
    intrested_area?: number;
    g_source?: number;
    referrer_by?: number;
    inquiry_date?: string; // Format: YYYY-MM-DD
    trial_end_date?: string; // Format: YYYY-MM-DD
    selected_membership?: string;
    membership_status?: string;
    membership_valid_from?: string; // Format: YYYY-MM-DD
    membership_valid_to?: string; // Format: YYYY-MM-DD
    first_pay_date?: string; // Format: YYYY-MM-DD
    created_by?: number;
    created_date?: string; // Format: YYYY-MM-DD
    alert_sent?: number;
    admin_alert?: number;
    alert_send_date?: string; // Format: YYYY-MM-DD
    members_reg_number?: string;
    fingerprint?: string;




}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract only the 'YYYY-MM-DD' part
};
export const fetchMembers = async (url: string) => {
    try {
        const response = await axios.get(url ? url : `${config.url}api/members`
            , {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }
        );
        // const response = await axios.get(`${config.url}api/members`
        // );
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}
export const fetchMembersUsingSearch = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${config.url}api/members/?global_search=${searchQuery}`
            , {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }
        );
        // const response = await axios.get(`${config.url}api/members`
        // );
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail }
    }

}
export const addMember = async (data: Data) => {
    try {
        const formData = new FormData();
        // formData.append("first_name", data.first_name);
        // formData.append("last_name", data.last_name);
        // formData.append("phone", data.phone.toString());
        // formData.append("image", data.image[0]); // Assuming `image` is a FileList
        // formData.append("joining_date", data.joining_date.toISOString());
        // formData.append("dob", formatDate(data.dob));
        // formData.append("address", data.address);
        // formData.append("membership", data.membership);
        // formData.append("membership_starting_date", formatDate(data.membership_starting_date));
        // formData.append("membership_ending_date", formatDate(data.membership_ending_date));

        // Loop through each key in the `data` object
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Handle special cases like date formatting
                if (key === 'birth_date' || key === 'membership_valid_from' || key === 'membership_valid_to') {
                    formData.append(key, formatDate(value as string));
                } else if (key === 'image') {
                    // Handle file uploads
                    formData.append(key, (value as FileList)[0]); // Assuming image is a FileList
                } else {
                    formData.append(key, value.toString());
                }
            }
        });
        formData.append("is_exist", "1");

        const response = await axios.post(`${config.url}api/members/`, formData
            , {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );


        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return {
            error: error.response.data.phone[0] ||
                error.response.data.first_name[0] ||
                error.response.data.last_name[0] ||

                error.response.data.address[0] ||
                'UnExpected Error occurred'
        }
    }

}

export const editMember = async (id: number, data: editData) => {
    try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Handle special cases like date formatting
                if (key === 'birth_date' || key === 'membership_valid_from' || key === 'membership_valid_to') {
                    formData.append(key, formatDate(value as string));
                } else if (key === 'image') {
                    if (value instanceof FileList && value[0]) {
                        formData.append(key, value[0]); // Add the file
                    }
                } else {
                    formData.append(key, value.toString());
                }
            }
        });
        const response = await axios.patch(`${config.url}api/members/${id}/`, formData
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
export const deleteMember = async (id: number) => {
    try {
        const response = await axios.delete(`${config.url}api/members/${id}/`,

            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { error: error.response?.data.detail, status: error?.response?.status }
    }

}