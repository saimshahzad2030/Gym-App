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
  membershipName: string;
  nameOfMember: string;
  label: string;
  amount:number;
  paymentDate: Date | null; 
  
};

type FormDataType2 = {
 payment?:{
  membershipName: string;
  nameOfMember: string;
  label: string;
  amount:number;
  paymentDate: Date; 
 }
  
};
// Define the validation schema
const schema = yup.object().shape({
  membershipName: yup.string().required(" membershipName is required"),
  nameOfMember: yup.string().required(" name of member is required"),
  label: yup.string().required(" label is required"),
  paymentDate:yup.date().required(" label is required"), 
  amount: yup.number().required("Membership Fee is required"), 
  
});

const EditPayment:React.FC<FormDataType2  & { setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>> }> = ({ payment, setOpenEditDialog }) => {
 console.log('payment',payment)
  const [selectedOption, setSelectedOption] = React.useState<string >(payment?.membershipName || 'none');
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
    setOpenEditDialog(false)
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
      label="Member name"
      value={payment?.nameOfMember}
      placeholder="Enter Member name"
      variant="outlined"
      fullWidth
      {...register("nameOfMember")}
      error={!!errors.nameOfMember}
      helperText={errors.nameOfMember?.message} 
   sx={textFieldStyle}
    />
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.membershipName} 
    sx={{ 
      // Default Light Mode styling (border color, text, label colors)
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black', // Light mode border color (black) by default
        },
        '&:hover fieldset': {
          borderColor: 'black', // Keep the border black on hover in light mode
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black', // Focused border color in light mode
        },
      },
      '& .MuiInputBase-input': {
        color: 'black', // Light mode text color (black)
      },
      '& .MuiInputLabel-root': {
        color: 'black', // Light mode label color (black)
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'black', // Focused label color in light mode
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', // Ensure notched outline is black in light mode
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'black', // Light mode placeholder color (black)
      },

      // Dark Mode styles inside @media query
      '@media (prefers-color-scheme: dark)': {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // Dark mode border color (white)
          },
        },
        '& .MuiInputBase-input': {
          color: '#E2E2E2', // Dark mode text color (light gray)
        },
        '& .MuiInputLabel-root': {
          color: '#E2E2E2', // Dark mode label color (light gray)
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#E2E2E2', // Focused label color in dark mode
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Dark mode notched outline color (white)
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#E2E2E2', // Dark mode placeholder color (light gray)
        },
      },
    }}
  >
    <Select
      labelId="membership-label"
      {...register("membershipName")}
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        setValue("membershipName", e.target.value); // Set the value for react-hook-form
      }}
      displayEmpty
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black', // Light mode border color (black) by default
          },
          '&:hover fieldset': {
            borderColor: 'black', // Keep the border black on hover in light mode
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black', // Focused border color in light mode
            borderWidth: 1, // Ensure consistent border width
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent', // Maintain background on focus
            boxShadow: 'none', // Remove the default blue shadow
          },
        },
        '& .MuiInputBase-input': {
          color: 'black', // Text color in light mode
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Label color in light mode
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'black', // Focused label color in light mode
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'black', // Placeholder color in light mode
        },

        // Dark Mode styles for Select component
        '@media (prefers-color-scheme: dark)': {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Dark mode border color (white)
            },
          },
          '& .MuiInputBase-input': {
            color: '#E2E2E2', // Text color in dark mode (light gray)
          },
          '& .MuiInputLabel-root': {
            color: '#E2E2E2', // Label color in dark mode (light gray)
          },
        },
      }}
    >
      <MenuItem value={'none'} disabled className="text-black">
        Select Membership
      </MenuItem>
      <MenuItem value={'basic'} className="text-black">Basic</MenuItem>
      <MenuItem value={'silver'} className="text-black">Silver</MenuItem>
      <MenuItem value={'gold'} className="text-black">Gold</MenuItem>
      <MenuItem value={'premium'} className="text-black">Premium</MenuItem>
    </Select>
    {errors.membershipName && <FormHelperText>{errors.membershipName.message}</FormHelperText>}
  </FormControl>
</div>
<div className="mb-4.5">
  <TextField
    label="Label"
    value={payment?.label}

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
    value={payment?.amount}

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
          name="paymentDate"
          control={control}
          defaultValue={payment?.paymentDate || null}
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
      {errors.paymentDate && (
        <p className="text-red-500">{errors.paymentDate.message}</p>
      )}
    </div>
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Member
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Payment Updated"/>
                      
           
          </form>
        </div>
      </div>
    </div>
  );
}; 
export default EditPayment;