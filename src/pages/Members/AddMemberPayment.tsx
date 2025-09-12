import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import SnackbarComp from '../../components/SnackBar/Snackbar';
import dayjs from 'dayjs';
import { parse, isDate } from 'date-fns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Autocomplete,
  createTheme,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { selectFieldStyle, textFieldStyle } from '../../../constants/constants';
import { editMember, fetchMemberPayment } from '../../services/members.services';
import LoaderComp from '../../components/Loader/Loader';
import { fetchMemberships } from '../../services/memberships.services';
import { addPayment } from '../../services/payment.services';
interface MembershipData {
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
type FormDataType = {
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
};
type FormData2Type = {
  user?: {
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
  };
};
type MembershipPayment = {
  mp_id: number;
  member_info: {
    first_name: string;
    last_name: string;
    membership_valid_from: string; // YYYY-MM-DD
    membership_valid_to: string;   // YYYY-MM-DD
    membership_status: "expired" | "active" | "Continue" | string; 
    image: string; // URL
  };
  due_amount: number;
  member_id: number;
  membership_id: number;
  membership_amount: number;
  paid_amount: number;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  membership_status: "expired" | "active" | "Continue" | string;
  payment_status: string | null;
  created_date: string; // YYYY-MM-DD
  created_by: string | number | null;
  isprinted: string | boolean; // looks like b'\x01' → backend boolean-ish
  signupfee: number;
  is_active: boolean | null;
  delete_reason: string | null;
};

// Define the validation schema
const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  selected_membership: yup.string().required('Please select a membership'),
});
const AddMemberPayment: React.FC<
  FormData2Type & {
    onUpdateMember: (updatedMember: FormDataType) => void;
    setOpenPaymentDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ user, onUpdateMember, setOpenPaymentDialog }) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>(
    user?.selected_membership == 'Regular Monthly'
      ? '1'
      : user?.selected_membership == '3 month Cardio'
      ? '2'
      : user?.selected_membership == 'Cardio Monthly'
      ? '3'
      : user?.selected_membership == '3 Month Gym'
      ? '4'
      : '',
  );
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    user?.image || null,
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [messaage, setMessage] = React.useState<string>('');
  const [amountPaid, setAmountPaid] = React.useState<number>(0);
  const [memberPaymentDetails, setMemberPaymentDetails] = React.useState<MembershipPayment | null>(null);
  const [registerationAmount, setRegisterationAmount] = React.useState<number>(0);
  const [amountDue, setAmountDue] = React.useState<number>(
    user?.selected_membership == 'Regular Monthly'
      ? 3000 - amountPaid
      : user?.selected_membership == '3 month Cardio'
      ? 6000 - amountPaid
      : user?.selected_membership == 'Cardio Monthly'
      ? 6000 - amountPaid
      : user?.selected_membership == '3 Month Gym'
      ? 15000 - amountPaid
      : 0,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      selected_membership:
        user?.selected_membership == 'Regular Monthly'
          ? '1'
          : user?.selected_membership == '3 month Cardio'
          ? '2'
          : user?.selected_membership == 'Cardio Monthly'
          ? '3'
          : user?.selected_membership == '3 Month Gym'
          ? '4'
          : '',
    },
  });
  const theme = createTheme({
    palette: {
      mode: 'light', // or 'dark', dynamically set this based on your app
      primary: {
        main: '#1976d2', // Example color
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: 'white', // Set text color to white
              border: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Set label color to white
              border: 'white',
            },
          },
        },
      },
    },
  });
  // Handle image selection

  const onSubmit = async (data: FormDataType) => {
    setLoading(true);
    let mem = [
      'Regular Monthly',
      '3 month Cardio',
      'Cardio Monthly',
      '3 Month Gym',
    ];
    const formatDateToYYYYMMDD = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const edit = await addPayment({
      member_id: user?.member_id || user?.members_reg_number || 0,
      membership_class: mem[Number(selectedOption) - 1] as
        | 'Regular Monthly'
        | '3 month Cardio'
        | 'Cardio Monthly'
        | '3 Month Gym',
      paid_amount: amountPaid,
      registration_fees:registerationAmount
      // membership_amount:memberships[Number(selectedOption)].membership_amount || 0 ,
      // paid_amount:amountPaid,
      // start_date: formatDateToYYYYMMDD(data.membership_valid_from) || "",
      // end_date: formatDateToYYYYMMDD(data.membership_valid_to) || "",
    });
    setLoading(false);
    if (!edit.error) {
      // onUpdateMember({
      //   id: user?.id || 0,
      //   first_name: data?.first_name,
      //   last_name: data?.last_name,
      //   address: user?.address,
      //   selected_membership: user?.selected_membership,
      //   role_name: user?.role_name,
      //   birth_date: user?.birth_date,
      //   membership_valid_from: data?.membership_valid_from,
      //   membership_valid_to: data?.membership_valid_to,
      // });
      setMessage('Added Successfully');
      setOpen(true);
      setTimeout(() => {
        setOpenPaymentDialog(false);
      }, 1000);
    } else {
      setOpen(true);
      setMessage('Error occcurred Try again later');
    }
  };
  const [memberships, setMemberships] = React.useState<MembershipData[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchMemberships('');
      if (!fetchedData.error) {
        setMemberships(fetchedData.results);
      }
      console.log("object",Number(user?.member_id) || Number(user?.members_reg_number))
      let paymentDetails = await fetchMemberPayment(Number(user?.member_id) || Number(user?.members_reg_number));
      setMemberPaymentDetails(paymentDetails)
      setAmountPaid(paymentDetails?.paid_amount
      )
      
        setSelectedOption(paymentDetails?.membership_id)
        setValue("selected_membership",String(paymentDetails?.membership_id))
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    if (user) {
      setSelectedOption(
        memberPaymentDetails?
        String(memberPaymentDetails.membership_id):user?.selected_membership == 'Regular Monthly'
          ? '1'
          : user?.selected_membership == '3 month Cardio'
          ? '2'
          : user?.selected_membership == 'Cardio Monthly'
          ? '3'
          : user?.selected_membership == '3 Month Gym'
          ? '4'
          : ''
      );
      // setAmountPaid(user?.selected_membership?)
        setValue("selected_membership",String(memberPaymentDetails?.membership_id))

      setValue('membership_valid_from', new Date().toISOString().split("T")[0]);
const abc = memberPaymentDetails?.member_info.membership_valid_to; // string | undefined

if (abc) {
  const date = new Date(abc); // safe now

  // Add 1 month
  date.setMonth(date.getMonth() + 1);

  // Format back to YYYY-MM-DD
  const oneMonthLater = date.toISOString().split("T")[0];
console.log("oneMonthLater",oneMonthLater)
  setValue('membership_valid_to', oneMonthLater);
}

    }
  }, [user, setValue]);

  return (
    <div>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Image Upload Section */}

              {/* Other Form Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
       
                <div className="w-full xl:w-1/2 border-none">
                  <TextField
                    label="First name"
                    placeholder="Enter your first name"
                    variant="outlined"
                    fullWidth
                    value={user?.first_name}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    sx={textFieldStyle}
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <TextField
                    label="Last name"
                    placeholder="Enter your last name"
                    variant="outlined"
                    value={user?.last_name}
                    fullWidth
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    sx={textFieldStyle}
                  />
                </div>
              </div>
              <div className="mb-4.5">
                <FormControl
                  fullWidth
                  error={!!errors.selected_membership}
                  sx={selectFieldStyle}
                >
                  <Select
                    labelId="membership-label"
                    {...register('selected_membership')}
                   value={selectedOption || ''}
                    onChange={(e) => {
                      setValue('selected_membership', e.target.value);

                      setSelectedOption(e.target.value);
                      // setAmountDue(0)
                      setAmountDue(
                       0
                      );
                      setAmountPaid(  memberships[Number(e.target.value)-1].signup_fee  || 0 +  (memberships[Number(e.target.value)-1].membership_amount || 0) )
                      const today = new Date();
const abc = memberPaymentDetails?.member_info?.membership_valid_to; // string | undefined

if (abc) {
  console.log('object')
  const date = new Date(abc); // safe now
date.setDate(
                        today.getDate() +
                          (memberships[Number(e.target.value) - 1]
                            .membership_length || 0),
                      );
 
  // Format back to YYYY-MM-DD
  const oneMonthLater = date.toISOString().split("T")[0]; 
  setValue('membership_valid_to', oneMonthLater);
}

                      // Calculate the "membership_valid_to" date
                      const validToDate = new Date();
                      validToDate.setDate(
                        today.getDate() +
                          (memberships[Number(e.target.value) - 1]
                            .membership_length || 0),
                      );

                      // Update the "membership_valid_from" and "membership_valid_to" fields
                      setValue('membership_valid_from', today.toISOString());
                      setValue(
                        'membership_valid_to',
                        validToDate.toISOString(),
                      );
                    }}
                    displayEmpty
                    sx={selectFieldStyle}
                  >
                    <MenuItem value={''} disabled className="text-black">
                      Select membership
                    </MenuItem>
                    <MenuItem value={'1'} className="text-black">
                      Regular Monthly
                    </MenuItem>
                    <MenuItem value={'2'} className="text-black">
                      Cardio Monthly
                    </MenuItem>
                    <MenuItem value={'3'} className="text-black">
                      3 Months Gym
                    </MenuItem>
                    <MenuItem value={'4'} className="text-black">
                      3 Months Cardio
                    </MenuItem>
                  </Select>
                  {errors.selected_membership && (
                    <FormHelperText>
                      {errors.selected_membership.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="mb-4.5">
                <TextField
                  label="Registration Amount"
                  placeholder="Enter Registration Amount"
                  variant="outlined"
                  value={registerationAmount}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    setRegisterationAmount(inputValue);

                    const membershipAmount = Number(
                      memberships[Number(selectedOption) - 1].membership_amount,
                    );
                  //  setAmountPaid(memberPaymentDetails?.paid_amount? memberPaymentDetails?.paid_amount+ inputValue:membershipAmount+inputValue );
                
                  }}
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  sx={textFieldStyle}
                />
              </div>
              <div className="mb-4.5">
                <TextField
                  label="Amount Paid"
                  placeholder="Enter Amount Paid"
                  variant="outlined"
                  value={amountPaid}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    setAmountPaid(inputValue);

                    const membershipAmount = Number(
                      memberships[Number(selectedOption) - 1].membership_amount,
                    );
                    const due = membershipAmount - inputValue;

                    setAmountDue(due > 0 ? due : 0);
                  }}
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  sx={textFieldStyle}
                />
              </div>
              <div className="mb-4.5">
                <TextField
                  label="Due Amount"
                  placeholder="Enter Due Amount"
                  variant="outlined"
                  value={amountDue}
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  sx={textFieldStyle}
                />
              </div>

              <div className="mb-4.5 flex flex-col items-center w-full ">
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="membership_valid_from"
                      control={control}
                      defaultValue={user?.membership_valid_from}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          className="w-full"
                          label="Membership Starting from"
                          value={value ? dayjs(value) : null}
                          onChange={(date) =>
                            onChange(date ? date.toDate() : null)
                          }
                          sx={textFieldStyle}
                          slotProps={{
                            textField: {
                              InputProps: {
                                sx: {
                                  svg: {
                                    color: (theme) =>
                                      theme.palette.mode === 'dark'
                                        ? 'white'
                                        : 'gray',
                                  },
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
                {errors.membership_valid_from && (
                  <p className="text-red-500">
                    {errors.membership_valid_from.message}
                  </p>
                )}
              </div>
              <div className="mb-4.5 flex flex-col items-center w-full ">
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="membership_valid_to"
                      control={control}
                      defaultValue={user?.membership_valid_to}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          className="w-full"
                          label="Membership Valid till"
                          value={value ? dayjs(value) : null}
                          onChange={(date) =>
                            onChange(date ? date.toDate() : null)
                          }
                          sx={textFieldStyle}
                          slotProps={{
                            textField: {
                              InputProps: {
                                sx: {
                                  svg: {
                                    color: (theme) =>
                                      theme.palette.mode === 'dark'
                                        ? 'white'
                                        : 'gray',
                                  },
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
                {errors.membership_valid_to && (
                  <p className="text-red-500">
                    {errors.membership_valid_to.message}
                  </p>
                )}
              </div>

              <div className=" ">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {loading ? <LoaderComp /> : 'Add Payment'}
                </button>
              </div>
            </div>
            <SnackbarComp open={open} setOpen={setOpen} message={messaage} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddMemberPayment;
