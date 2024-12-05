import React from "react";
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
import { textFieldStyle } from "../../../constants/constants";
import { addExpense } from "../../services/expenses.services";
import { addIncome } from "../../services/incomes.services";
import { addPayment } from "../../services/payment.services";
 
type FormDataType = {
  member_id:number;
  membership_class: 'Regular Monthly' | '3 month Cardio' | 'Cardio Monthly' | '3 Month Gym' | 'none';

};

 
// Define the validation schema
const schema = yup.object().shape({   
  member_id: yup.number().required("Member Id is required"),
  membership_class:  yup.string().required("Membership class is required")
 
 
});

const AddPayment = () => {
  const [selectedOption, setSelectedOption] = React.useState<string >('none');
   const [open,setOpen] = React.useState<boolean>(false) 
   const [message,setMessage] = React.useState<string>("") 

  const { register, handleSubmit, formState: { errors }, setValue ,control ,reset,getValues} = useForm<FormDataType>({
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
       member_id:0,
       membership_class:'none'
      }); 
       
      setMessage('Payment Added Successfully') 
      setOpen(true)
    }
    else{
      setMessage('Unexpected error occured') 
      setOpen(true)
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Payment" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Expense Form</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onError={(err)=>{console.log(err)}}>
            <div className="p-6.5">
             

              {/* Other Form Fields */}
          
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
             
  <div className="w-full xl:w-full border-none">
    <TextField
      label="Member Id"
      placeholder="Enter Member Id"
      variant="outlined"
      fullWidth
      {...register("member_id")}
      error={!!errors.member_id}
      helperText={errors.member_id?.message} 
      sx={textFieldStyle}
    />
  </div>

  
</div>
  
<div className="mb-4.5">
 
 <Autocomplete
 disablePortal
//  membership_class: 'Regular Monthly' | '3 month Cardio' | 'Cardio Monthly' | '3 Month Gym' | 'none'
// 
 options={[{name:'Regular Monthly',value: "Regular Monthly" as const},{name:'3 month Cardio',value:"3 month Cardio" as const},{name:'Cardio Monthly',value:"Cardio Monthly" as const} ,{name:'3 Month Gym',value:"3 Month Gym" as const} ]}
 getOptionLabel={(option) => option?.name} // Specify how to display options
 sx={{ width: '100%' }}
 renderInput={(params) => (
   <TextField
     {...params}
     label="Membership Class"
     placeholder="Enter Membership Class"
     variant="outlined"
     error={!!errors.membership_class}
     helperText={errors.membership_class?.message}
     sx={textFieldStyle}
   />
 )}
 onChange={(event, value) => {
   setValue("membership_class",(value?.value || "none") as 'Regular Monthly' | '3 month Cardio' | 'Cardio Monthly' | '3 Month Gym') }}
/>
</div> 
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Payment
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