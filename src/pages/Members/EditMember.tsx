import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm ,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from '@mui/icons-material/Edit';
import SnackbarComp from "../../components/SnackBar/Snackbar";
import dayjs from "dayjs";
import { parse,isDate } from "date-fns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react"; 
import { selectFieldStyle, textFieldStyle } from "../../../constants/constants";
import { editMember, fetchMemberPayment } from "../../services/members.services"; 
import LoaderComp from "../../components/Loader/Loader";
import { fetchMemberships } from "../../services/memberships.services";
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
   id:number;
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
    id:number;
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
};
 
 
// Define the validation schema
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  address:yup.string().required("Address is required"),
  mobile: yup
  .number()
  .typeError("Phone number must be a number")
  .required("Phone number is required"),
  selected_membership: yup.string().required("Please select a membership"),
  role_name: yup.string().required("Please select type of Member"),
  gender: yup.string().required("Please select gender of member"),
  image: yup
    .mixed<FileList>()
    .nullable() ,
    birth_date: yup.date().transform((value, originalValue) => {
      if (isDate(originalValue)) return originalValue; // Already a valid Date
      return parse(originalValue, 'dd/MM/yyyy', new Date());
    })
    .typeError('Invalid date format')
    .typeError('Invalid date format')
    .required('Date is required'),
    membership_valid_from: yup.date().transform((value, originalValue) => {
      if (isDate(originalValue)) return originalValue; // Already a valid Date
      return parse(originalValue, 'dd/MM/yyyy', new Date());
    })
    .typeError('Invalid date format').required('Membership Starting Date is required'),
    membership_valid_to: yup.date().transform((value, originalValue) => {
      if (isDate(originalValue)) return originalValue; // Already a valid Date
      return parse(originalValue, 'dd/MM/yyyy', new Date());
    })
    .typeError('Invalid date format').required('Membership Ending Date is required')
});
const EditMember:React.FC<FormData2Type  & {
  
  onUpdateMember: (updatedMember: FormDataType) => void;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>> }> = ({ user,onUpdateMember , setOpenEditDialog }) => {
  const [loading,setLoading] = React.useState(false)
  // const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(user?.image || null);
  const [open,setOpen] = React.useState<boolean>(false) 
  const [message,setMessage] = React.useState< string>("") 

  const { register, handleSubmit, formState: { errors }, setValue ,control } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name:user?.first_name,
  last_name: user?.last_name,
  address:user?.address,
  mobile:user?.mobile,
  selected_membership:user?.selected_membership,
  role_name:user?.role_name,
  gender: user?.gender,
  image: user?.image,
    birth_date:user?.birth_date,
    membership_valid_from:user?.membership_valid_from,
    membership_valid_to: user?.membership_valid_to

    },
  });
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: "white", // Set text color to white
              border:'white'
            },
            "& .MuiInputLabel-root": {
              color: "white", // Set label color to white
              border:'white'

            },
          },
        },
      },
    },
  });
  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
      setValue("image", fileList); // Set the file input value
    } else {
      setValue("image", null); // Set to null if no file is selected
    }
  };

  const onSubmit = async(data: FormDataType) => { 
    console.log(data)
    const transformedData = {
      ...data,
      phone: Number(data.phone), // Ensure phone is sent as a number
    };
    setLoading(true)
    const edit = await editMember(user?.id || 0,transformedData);
    console.log(edit)
    setLoading(false)
    if(!edit.error){
      console.log("object")
      onUpdateMember({
        id:edit.member_id,
        member_id:edit.member_id,
        first_name:data?.first_name,
        last_name: data?.last_name,
        address:data?.address,
        mobile:edit?.mobile,
        membership_status:edit.membership_status,
        selected_membership:edit?.selected_membership,
        role_name:edit?.role_name,
        gender: edit?.gender,
        image: edit?.image,
          birth_date:edit?.birth_date,
          membership_valid_from:edit?.membership_valid_from,
          membership_valid_to: edit?.membership_valid_to
      })
      setOpen(true);
      setMessage("Edited Succesfullly")
      setTimeout(()=>{
        setOpenEditDialog(false)
        },1000)
    }
    else{
      setOpen(true);
      setMessage(edit.error)
    }
    
  };type MembershipPayment = {
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
    const [selectedOption, setSelectedOption] = React.useState<string>(
      user?.selected_membership == 'Regular Monthly'
        ? '1'
        : user?.selected_membership == '3 month Cardio'
        ? '2'
        : user?.selected_membership == 'Cardio Monthly'
        ? '6'
        : user?.selected_membership == '3 Month Gym'
        ? '7'
        : '',
    );
     const [memberPaymentDetails, setMemberPaymentDetails] = React.useState<MembershipPayment | null>(null);
      
  const [memberships,setMemberships] = React.useState<MembershipData[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchMemberships('');
      if (!fetchedData.error) {
        setMemberships(fetchedData.results);
      } 
      let paymentDetails = await fetchMemberPayment(Number(user?.member_id) || Number(user?.members_reg_number));
      setMemberPaymentDetails(paymentDetails)
      // setValue('membership_valid_from', new Date(paymentDetails).toISOString().split("T")[0]);
      // setValue('membership_valid_to', new Date(paymentDetails).toISOString().split("T")[0]);
      
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
          ? '6'
          : user?.selected_membership == '3 Month Gym'
          ? '7'
          : ''
      );
      // setAmountPaid(user?.selected_membership?)
        setValue("selected_membership",String(memberPaymentDetails?.membership_id))

// const abc = memberPaymentDetails?.member_info.membership_valid_to; // string | undefined

// if (abc) {
//   const date = new Date(abc); // safe now

//   // Add 1 month
//   date.setMonth(date.getMonth() + 1);

//   // Format back to YYYY-MM-DD
//   const oneMonthLater = date.toISOString().split("T")[0];
// console.log("oneMonthLater",oneMonthLater)
//   setValue('membership_valid_to', oneMonthLater);
// }

    }
  }, [user, setValue]);

  return (
    <div>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Image Upload Section */}
              <div className="mb-4.5 flex flex-col items-center">
                <label className="mb-2.5 block text-black dark:text-white">
                  Profile Image
                </label>
                <div className="relative w-32 h-32 rounded-full border border-dashed border-gray-400 flex items-center justify-center">
                  {imagePreview ? (
                    <div className="flex flex-col items-center w-32 h-32  rounded-full overflow-hidden justify-center">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="z-100 absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1"
                    onClick={() => setImagePreview(null)}
                  > 
                    <EditIcon  className="text-black"/>
                  </button>
                </div>
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>

              {/* Other Form Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
  <div className="w-full xl:w-1/2 border-none">
    <TextField
      label="First name"
      placeholder="Enter your first name"
      variant="outlined" 
      fullWidth
      {...register("first_name")}
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
      fullWidth 

      {...register("last_name")}
      error={!!errors.last_name}
      helperText={errors.last_name?.message}
      sx={textFieldStyle}

    />
  </div>
</div>

<div className="mb-4.5">
  <TextField
    label="Phone"
    placeholder="Enter phone"
    variant="outlined" 

    fullWidth
    {...register("mobile")}
    error={!!errors.mobile}
    helperText={errors.mobile?.message}
    sx={textFieldStyle}

  />
</div>
{/* <div className="mb-4.5">
<FormControl fullWidth error={!!errors.gender} 
    sx={ selectFieldStyle}
    
    >
     <Select
      labelId="membership-label"
      {...register("gender")}
      defaultValue={user?.gender.toLowerCase() || ''}
      onChange={(e) => setValue("gender", e.target.value)}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={''} disabled className="text-black">
        Select Member's Gender
      </MenuItem>
      <MenuItem value={'male'}  className="text-black">Male</MenuItem>
      <MenuItem value={'female'}  className="text-black">Female</MenuItem>
       
    </Select>
    {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
  </FormControl>
  
</div> */}
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
console.log(e.target.value,"e.target.value")
                      setSelectedOption(e.target.value);
                      // setAmountDue(0)
                      
                      let memToFInd = memberships.find((m)=>m.id==e.target.value)
                      console.log(memberships.find((m)=>m.id==e.target.value),"sdsad")
                       const today = new Date();
const abc = memberPaymentDetails?.member_info?.membership_valid_to; // string | undefined

if (abc) {
  console.log('object')
  const date = new Date(abc); // safe now
date.setDate(
                        today.getDate() +
                          (memToFInd.membership_length || 0),
                      );
 
  // Format back to YYYY-MM-DD
  const oneMonthLater = date.toISOString().split("T")[0]; 
  setValue('membership_valid_to', oneMonthLater);
}

                      // Calculate the "membership_valid_to" date
                      const validToDate = new Date();
                      validToDate.setDate(
                        today.getDate() +
                          (memToFInd.membership_length || 0),
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
                    <MenuItem value={'6'} className="text-black">
                      3 Months Gym
                    </MenuItem>
                    <MenuItem value={'7'} className="text-black">
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
<FormControl fullWidth error={!!errors.role_name} 
    sx={ selectFieldStyle}
    
    >
     <Select
      labelId="member-label"
      {...register("role_name")}
      defaultValue={user?.role_name || 'admin'}
      onChange={(e) => setValue("role_name", e.target.value)}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={""} disabled className="text-black">
        Select membership duration
      </MenuItem>
      <MenuItem value={'admin'}  className="text-black">Admin</MenuItem>
      <MenuItem value={'member'}  className="text-black">Member</MenuItem>
      <MenuItem value={'staff_member'}  className="text-black">Staff Member</MenuItem> 
    </Select>
    {errors.role_name && <FormHelperText>{errors.role_name.message}</FormHelperText>}
  </FormControl>
  {/* <Autocomplete
  disablePortal
  options={[{name:'Admin',value:'admin'},{name:'Member',value:'member'},{name:'Staff Member',value:'staff_member'}]}
  getOptionLabel={(option) => option.name} // Specify how to display options
  sx={{ width: '100%' }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Type"
      defaultValue={user?.role_name}
      placeholder="Enter Type"
      variant="outlined"
      error={!!errors.role_name}
      helperText={errors.role_name?.message}
      sx={textFieldStyle}
    />
  )}
  onChange={(event, value) => {
    setValue("role_name", value?.value || "member");  }}
/> */}
</div>
<div className="mb-4.5">
  <TextField
    label="Address"
    placeholder="Enter Address"
    variant="outlined"
    fullWidth 

    {...register("address")}
    error={!!errors.address}
    helperText={errors.address?.message}
    sx={textFieldStyle}

  />
</div>

 
              <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="membership_valid_from"
          control={control}
          defaultValue={memberPaymentDetails?.member_info.membership_valid_from}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Membership Starting from"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={textFieldStyle}
              slotProps={{
                textField: {
                  InputProps: {
                    sx: {
                      svg: {
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? 'white' : 'gray',
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
        <p className="text-red-500">{errors.membership_valid_from.message}</p>
      )}
    </div>
    <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="membership_valid_to"
          control={control}
          defaultValue={memberPaymentDetails?.member_info.membership_valid_to}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Membership Valid till"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={textFieldStyle}
              slotProps={{
                textField: {
                  InputProps: {
                    sx: {
                      svg: {
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? 'white' : 'gray',
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
        <p className="text-red-500">{errors.membership_valid_to.message}</p>
      )}
    </div>
    <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="birth_date"
          control={control}
          defaultValue={user?.birth_date}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Date of birth"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={textFieldStyle}
              slotProps={{
                textField: {
                  InputProps: {
                    sx: {
                      svg: {
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? 'white' : 'gray',
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
      {errors.birth_date && (
        <p className="text-red-500">{errors.birth_date.message}</p>
      )}
    </div>
             
            <div className=" ">
              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              {loading?<LoaderComp/>:'Save Changes'}
              </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message={message}/>
      </form>
        </div>
      </div>
    </div>
  );
};
export default EditMember;