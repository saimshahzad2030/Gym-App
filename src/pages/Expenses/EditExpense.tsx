import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Controller, useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { textFieldStyle } from "../../../constants/constants";
 
type FormDataType = {
  label: string;
  amount:number;
  paymentDate: Date | null;  
    expenseName: string; 
 
};
type FormDataType2 = {
  expense?:{
    label: string;
  amount:number;
  paymentDate: Date | null;  
    expenseName: string; 
  }
 
};
 
// Define the validation schema
const schema = yup.object().shape({
  expenseName: yup.string().required(" membershipName is required"), 
  label: yup.string().required(" label is required"),
  paymentDate:yup.date().required(" label is required"), 
  amount: yup.number().required("Membership Fee is required"), 
  
});

const EditExpense:React.FC<FormDataType2  & { setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>> }> = ({ expense, setOpenEditDialog }) => {
 
   const [open,setOpen] = React.useState<boolean>(false) 

  const { register, handleSubmit, formState: { errors }, setValue ,control ,getValues} = useForm<FormDataType>({
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
  const onSubmit = (data: FormDataType) => {
    setOpen(true)
    console.log("Form data:", data);
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
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
  <div className="w-full xl:w-full border-none">
    <TextField
      label="Expense name"
      value={expense?.expenseName}
      placeholder="Enter Expense name"
      variant="outlined"
      fullWidth
      {...register("expenseName")}
      error={!!errors.expenseName}
      helperText={errors.expenseName?.message} 
      sx={textFieldStyle}
    />
  </div>

  
</div>
 
<div className="mb-4.5">
  <TextField
    label="Label"
    value={expense?.label}

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
    label="Expense Amount"
    value={expense?.amount}

    placeholder="Enter Expense Amount"
    variant="outlined"
    fullWidth
    {...register("amount")}
    error={!!errors.amount}
    helperText={errors.amount?.message}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#0f172a', // Default light mode border color
          '.dark &': {
            borderColor: 'white', // Example dark mode border color using Tailwind color
          },
        },
        '&:hover fieldset': {
          borderColor: '#0f172a',
          '.dark &': {
            borderColor: 'white',
          },
        },
        '&.Mui-focused fieldset': {
          borderColor: '#0f172a',
          '.dark &': {
            borderColor: 'white',
          },
        },
      },
      '& .MuiInputBase-input': {
        color: '#0f172a',
        '.dark &': {
          color: 'white', // Example dark mode text color
        },
      },
      '& .MuiInputLabel-root': {
        color: '#0f172a',
        '.dark &': {
          color: 'white',
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#0f172a',
        '.dark &': {
          color: 'white',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0f172a',
        '.dark &': {
          borderColor: 'white',
        },
      },
      '& .MuiInputBase-input::placeholder': {
        color: '#0f172a',
        '.dark &': {
          color: 'white',
        },
      },
    }}
  />
</div>
<div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="paymentDate"
          control={control}
          defaultValue={expense?.paymentDate || null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Payment Date"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#0f172a', // Default light mode border color
                    '.dark &': {
                      borderColor: 'white', // Example dark mode border color using Tailwind color
                    },
                  },
                  '&:hover fieldset': {
                    borderColor: '#0f172a',
                    '.dark &': {
                      borderColor: 'white',
                    },
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0f172a',
                    '.dark &': {
                      borderColor: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#0f172a',
                  '.dark &': {
                    color: 'white', // Example dark mode text color
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#0f172a',
                  '.dark &': {
                    color: 'white',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#0f172a',
                  '.dark &': {
                    color: 'white',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f172a',
                  '.dark &': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#0f172a',
                  '.dark &': {
                    color: 'white',
                  },
                },
              }}
              
            />
          )}
        />
      </LocalizationProvider>
      </ThemeProvider>
      {errors.paymentDate && (
        <p className="text-red-500">{errors.paymentDate.message}</p>
      )}
    </div>
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Expense
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
export default EditExpense;