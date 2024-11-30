import React, { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Controller, useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { Autocomplete, createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectFieldStyle, textFieldStyle } from "../../../constants/constants";
import { addPayment } from "../../services/payment.services";
import { fetchMembers } from "../../services/members.services";
 
type FormDataType = {
  membership_name: string;
    name_of_member: string |   null;
    label: string;
    member_id:number;
    amount: string | null;
    payment_date: Date | null;
  
};

interface memberData {
  
      
    
  id: number;
  first_name: string;
  last_name: string;
  phone:number;
  image:string;
  joining_date:Date;
  dob:Date;
  address:string;
  membership:string;
  membership_starting_date:Date;
  membership_ending_date:Date;
   
}
// Define the validation schema
const schema = yup.object().shape({
  membership_name: yup.string().required(" membershipName is required"),
  name_of_member: yup.string().required(" name of member is required"),
  label: yup.string().required(" label is required"), 
  member_id: yup.number(), 
  payment_date:yup.date().required(" label is required"), 
  amount: yup.number().required("Membership Fee is required"), 
  
});

const AddPayment = () => {
  const [selectedOption, setSelectedOption] = React.useState<string >('none');
   const [open,setOpen] = React.useState<boolean>(false) 
   const [message,setMessage] = React.useState<string>("") 

  const { register, handleSubmit, formState: { errors }, setValue ,control ,getValues,reset} = useForm<FormDataType>({
    resolver: yupResolver(schema),
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
 
  // Handle form submission
  const onSubmit = async(data: FormDataType) => {
    const add = await addPayment(data) 
    if(!add.error){
      reset({
        membership_name:"",
        name_of_member:null,
  label:"",
  amount: null,
  payment_date:null, 
      }); 
      setValue('name_of_member',null)
      setMessage('payment Added Successfully')
      setSelectedOption('none'); 
      setOpen(true)
    }
    else{
      setMessage('Unexpected error occured') 
      setOpen(true)
    }
  };
  const [members,setMembers] = React.useState<memberData[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const members = await fetchMembers();
      if (!members.error) {
        console.log(members)
        setMembers(members);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Breadcrumb pageName="Payment" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Payment Form</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onError={(err)=>{console.log(err)}}>
            <div className="p-6.5">
             

              {/* Other Form Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
  <div className="w-full xl:w-full border-none">
  <Autocomplete
  disablePortal
  options={members}
  getOptionLabel={(option) => option.first_name} // Specify how to display options
  sx={{ width: '100%' }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Member name"
      placeholder="Enter Member name"
      variant="outlined"
      error={!!errors.name_of_member}
      helperText={errors.name_of_member?.message}
      sx={textFieldStyle}
    />
  )}
  onChange={(event, value) => {
    setValue("name_of_member", `${value?.first_name} ${value?.last_name}`); // Update react-hook-form with selected value
 
     setValue("member_id",value?.id || 0)
  }}
/>
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.membership_name} 
      sx={ selectFieldStyle}
>
     <Select
      labelId="membership-label"
      {...register("membership_name")}
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        setValue("membership_name", e.target.value); // Set the value for react-hook-form
      }}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={'none'} disabled className="text-black">
        Select Membership
      </MenuItem>
      <MenuItem value={'basic'}  className="text-black">Basic</MenuItem>
      <MenuItem value={'silver'} className="text-black">Silver</MenuItem>
      <MenuItem value={'gold'}  className="text-black">Gold</MenuItem>
      <MenuItem value={'premium'}  className="text-black">Premium</MenuItem>
    </Select>
    {errors.membership_name && <FormHelperText>{errors.membership_name.message}</FormHelperText>}
  </FormControl>
</div>
<div className="mb-4.5">
  <TextField
    label="Label"
    placeholder="Enter Label"
    variant="outlined"
    fullWidth
    {...register("label")}
    error={!!errors.label}
    helperText={errors.label?.message}
    sx={textFieldStyle}

  />
</div>

<div className="mb-4.5">
  <TextField
    label="Amount"
    placeholder="Enter Amount"
    variant="outlined"
    fullWidth
    {...register("amount")}
    error={!!errors.amount}
    helperText={errors.amount?.message}
    sx={textFieldStyle}

  />
</div>
<div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="payment_date"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Payment Date"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={textFieldStyle}

              
            />
          )}
        />
      </LocalizationProvider>
      </ThemeProvider>
      {errors.payment_date && (
        <p className="text-red-500">{errors.payment_date.message}</p>
      )}
    </div>
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Member
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
export default AddPayment;