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
import { selectFieldStyle, textFieldStyle } from "../../../constants/constants";
import { editExpense } from "../../services/expenses.services";
import { editIncome } from "../../services/incomes.services";
 
type FormDataType = {
  id:number;
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
type FormDataType2 = {
  expense?:{
    id:number;
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
  }
 
};
 
// Define the validation schema
const schema = yup.object().shape({
  invoice_type: yup.string().required(" Invoice type is required"),   
  invoice_label: yup.string().required(" label is required"),
  supplier_name: yup.string().required(" Supplier Name is required"), 
  payment_status:  yup.string().required(" Payment Status is required"),
  total_amount:  yup.number().required(" Total Amount is required"),
  receiver_id:  yup.number().required(" Reciever id is required"),
  invoice_date: yup.date().required(" label is required"),
  is_active: yup.number().required('Required'), 
  
});

const EditPayment:React.FC<FormDataType2  & { setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  onUpdateExpense: (updatedExpense: FormDataType) => void;

 }> = ({ expense, setOpenEditDialog ,onUpdateExpense}) => {
 
   const [open,setOpen] = React.useState<boolean>(false) 
   const [loading,setLoading] = React.useState<boolean>(false) 

  const { register, handleSubmit, formState: { errors }, setValue ,control ,getValues} = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: { 
     ...expense ,
     invoice_type: expense?.invoice_type.toLowerCase() as "income" | "expense",
     is_active: expense?.is_active as 0 |1,
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
 
  // Handle form submission
  const onSubmit = async(data: FormDataType) => {
    console.log('first')
    setLoading(true)
    const edit = await editIncome(expense?.id || 0,data) 
    setLoading(false)
    if(!edit.error){
     
    
    onUpdateExpense({
      ...data,
      id: expense?.id || 0,
    })
    setOpen(true)
    setTimeout(()=>{
    setOpenEditDialog(false)

    },1000)
  }
  };
   
  return (
    <div>
       <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Payment Form</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onError={(err)=>{console.log(err)}}>
          <div className="p-6.5">
             

             {/* Other Form Fields */}
             <div className="mb-4.5">
             <FormControl fullWidth error={!!errors.invoice_type} 
    sx={ selectFieldStyle}
    
    >
     <Select
      labelId="invoice_type-label"
      {...register("invoice_type")}
      defaultValue={ expense?.invoice_type.toLowerCase() || ''}
      onChange={(e) => setValue("invoice_type", e.target.value as "expense" | "income")}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={""} disabled className="text-black">
        Select Invoice Type 
      </MenuItem>
      <MenuItem value={'income'}  className="text-black">Income</MenuItem>
      <MenuItem value={'expense'}  className="text-black">Expense</MenuItem> 
    </Select>
    {errors.invoice_type && <FormHelperText>{errors.invoice_type.message}</FormHelperText>}
  </FormControl>
 
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
<FormControl fullWidth error={!!errors.payment_status} 
    sx={ selectFieldStyle}
    
    >
     <Select
      labelId="invoice_type-label"
      {...register("payment_status")}
      defaultValue={ expense?.payment_status || ''}
      onChange={(e) => setValue("payment_status", e.target.value as "Paid" | "Unpaid" | "Pending")}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={""} disabled className="text-black">
        Select Payment Status 
      </MenuItem>
      <MenuItem value={'Paid'}  className="text-black">Paid</MenuItem>
      <MenuItem value={'Unpaid'}  className="text-black">Unpaid</MenuItem> 
      <MenuItem value={'Pending'}  className="text-black">Pending</MenuItem> 
    </Select>
    {errors.payment_status && <FormHelperText>{errors.payment_status.message}</FormHelperText>}
  </FormControl>
 
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
   <FormControl fullWidth error={!!errors.is_active} 
    sx={ selectFieldStyle}
    
    >
   <Select
      labelId="is_active-label"
      {...register("is_active")}
      defaultValue={ Number(expense?.is_active)  as 0 |1 }
      onChange={(e) => setValue("is_active", Number(e.target.value) as 0 |1)}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={""} disabled className="text-black">
        Select Active Status 
      </MenuItem>
      <MenuItem value={1}  className="text-black">True</MenuItem>
      <MenuItem value={0}  className="text-black">False</MenuItem> 
    </Select>
    {errors.is_active && <FormHelperText>{errors.is_active.message}</FormHelperText>}
  </FormControl>
</div>
              <div className=" ">
              <button
             
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Edit Income
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Expense Updated"/>
                      
           
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditPayment;