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
 
type FormDataType = {
  invoice_type: 'expense' | 'income';  
  invoice_label: string | null ;
  supplier_name: string;  
  entry: string; 
  payment_status: 'Paid' | 'Unpaid' | 'Pending'; 
  total_amount: number; 
  receiver_id: number | null; 
  invoice_date: string; 
  is_active: 0 | 1; 
  delete_reason: string | null; 
  mp_id: number | null; 
};

 
// Define the validation schema
const schema = yup.object().shape({
  invoice_type: yup.string().required(" Invoice type is required"),   
  invoice_label: yup.string().required(" label is required"),
  supplier_name: yup.string().required(" Supplier Name is required"),  
  entry:  yup.string() ,
  payment_status:  yup.string().required(" Payment Status is required"),
  total_amount:  yup.number().required(" Total Amount is required"),
  receiver_id:  yup.number().required(" Reciever id is required"),
  invoice_date: yup.date().required(" label is required"),
  is_active: yup.number().required('Required'),
  delete_reason:yup.string() ,
  mp_id: yup.number() ,
 
});

const AddExpense = () => {
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
    const add = await addExpense(data) 
    if(!add.error){
      reset({
        invoice_type:'income',
        invoice_label:"",
        supplier_name:"",
        entry:"",
        payment_status:"Pending",
        total_amount:0,
        receiver_id:  null,
        invoice_date: undefined,
        is_active:0,
        delete_reason:"",
        mp_id: 0 
      }); 
       
      setMessage('payment Added Successfully') 
      setOpen(true)
    }
    else{
      setMessage('Unexpected error occured') 
      setOpen(true)
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Expense" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Payment Form</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onError={(err)=>{console.log(err)}}>
            <div className="p-6.5">
             

              {/* Other Form Fields */}
              <div className="mb-4.5">
 
 <Autocomplete
 disablePortal
 options={[{name:'Income',value:"income" as const},{name:'Expense',value:"expense" as const} ]}
 getOptionLabel={(option) => option?.name} // Specify how to display options
 sx={{ width: '100%' }}
 renderInput={(params) => (
   <TextField
     {...params}
     label="Type"
     placeholder="Enter Type"
     variant="outlined"
     error={!!errors.invoice_type}
     helperText={errors.invoice_type?.message}
     sx={textFieldStyle}
   />
 )}
 onChange={(event, value) => {
   setValue("invoice_type", (value?.value || "income") as "income" | "expense");  }}
/>
</div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
             
  <div className="w-full xl:w-full border-none">
    <TextField
      label="Expense Label"
      placeholder="Enter Expense Label"
      variant="outlined"
      fullWidth
      {...register("invoice_label")}
      error={!!errors.invoice_label}
      helperText={errors.invoice_label?.message} 
      sx={textFieldStyle}
    />
  </div>

  
</div>
 
<div className="mb-4.5">
  <TextField
    label="Supplier Name"
    placeholder="Enter Supplier Name"
    variant="outlined"
    fullWidth
    {...register("supplier_name")}
    error={!!errors.supplier_name}
    helperText={errors.supplier_name?.message}
    sx={textFieldStyle}
  />
</div>
<div className="mb-4.5">
 
 <Autocomplete
 disablePortal
 options={[{name:'Paid',value: "Paid" as const},{name:'Unpaid',value:"Unpaid" as const},{name:'Pending',value:"Pending" as const} ]}
 getOptionLabel={(option) => option?.name} // Specify how to display options
 sx={{ width: '100%' }}
 renderInput={(params) => (
   <TextField
     {...params}
     label="Payment Status"
     placeholder="Enter Payment Status"
     variant="outlined"
     error={!!errors.payment_status}
     helperText={errors.payment_status?.message}
     sx={textFieldStyle}
   />
 )}
 onChange={(event, value) => {
   setValue("payment_status",(value?.value || "Unpaid") as "Paid" | "Unpaid" | "Pending") }}
/>
</div>
<div className="mb-4.5">
  <TextField
    label="Expense Amount"
    placeholder="Enter Expense Amount"
    variant="outlined"
    fullWidth
    {...register("total_amount")}
    error={!!errors.total_amount}
    helperText={errors.total_amount?.message}
    sx={textFieldStyle}
  />
</div>
<div className="mb-4.5">
  <TextField
    label="Expense Reciever Id"
    placeholder="Enter Reciever Id"
    variant="outlined"
    fullWidth
    {...register("receiver_id")}
    error={!!errors.receiver_id}
    helperText={errors.receiver_id?.message}
    sx={textFieldStyle}
  />
</div>
<div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="invoice_date"
          control={control}
          defaultValue={""}
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
      {errors.invoice_date && (
        <p className="text-red-500">{errors.invoice_date.message}</p>
      )}
    </div>
    <div className="mb-4.5">
 
 <Autocomplete
 disablePortal
 options={[{name:'False',value: 0 as const},{name:'True',value:1 as const}  ]}
 getOptionLabel={(option) => option?.name} // Specify how to display options
 sx={{ width: '100%' }}
 renderInput={(params) => (
   <TextField
     {...params}
     label="Is Active"
     placeholder="Is Active"
     variant="outlined"
     error={!!errors.is_active}
     helperText={errors.is_active?.message}
     sx={textFieldStyle}
   />
 )}
 onChange={(event, value) => {
   setValue("is_active",(value?.value || 0) as 0 |1 ) }}
/>
</div>

              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Expense
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
export default AddExpense;