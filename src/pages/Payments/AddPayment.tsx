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
 
type FormDataType = {
  membershipName: string;
  nameOfMember: string;
  label: string;
  amount:number;
  paymentDate: Date | null; 
  
};

 
// Define the validation schema
const schema = yup.object().shape({
  membershipName: yup.string().required(" membershipName is required"),
  nameOfMember: yup.string().required(" name of member is required"),
  label: yup.string().required(" label is required"),
  paymentDate:yup.date().required(" label is required"), 
  amount: yup.number().required("Membership Fee is required"), 
  
});

const AddPayment = () => {
  const [selectedOption, setSelectedOption] = React.useState<string >('none');
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
    <TextField
      label="Member name"
      placeholder="Enter Member name"
      variant="outlined"
      fullWidth
      {...register("nameOfMember")}
      error={!!errors.nameOfMember}
      helperText={errors.nameOfMember?.message} 
      sx={{
        
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // Change the border color to white
          },
          '&:hover fieldset': {
            borderColor: 'white', // Change the border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Change the border color when focused
          },
        },
        // Optional: Change the text color if needed
       
        '& .MuiInputBase-input': {
        color: 'white', // Change the text color inside the input to white
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Change the label color to white
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'white', // Change the label color to white when focused
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Ensure the notched outline is white
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'white', // Change the placeholder color to white
      },
      }}
    />
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.membershipName} className=" bg-form-input"
    sx={{
        
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Change the border color to white
        },
        '&:hover fieldset': {
          borderColor: 'white', // Change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // Change the border color when focused
        },
      },
      // Optional: Change the text color if needed
     
      '& .MuiInputBase-input': {
      color: 'white', // Change the text color inside the input to white
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Change the label color to white
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Change the label color to white when focused
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white', // Ensure the notched outline is white
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white', // Change the placeholder color to white
    },
    }}>
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
            borderColor: 'white', // Change the border color to white
          },
          '&:hover fieldset': {
            borderColor: 'white', // Change the border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Change the border color when focused
            borderWidth: 1, // Ensure the border width remains consistent
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent', // Maintain background on focus
            boxShadow: 'none', // Remove the default blue shadow
          },
        },
        '& .MuiInputBase-input': {
          color: 'white', // Change the text color inside the input to white
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Change the label color to white
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'white', // Change the label color to white when focused
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'white', // Change the placeholder color to white
        },
      }}
    >
      <MenuItem value={'none'} disabled className="text-black">
        Select Membership
      </MenuItem>
      <MenuItem value={'basic'}  className="text-black">Basic</MenuItem>
      <MenuItem value={'silver'} className="text-black">Silver</MenuItem>
      <MenuItem value={'gold'}  className="text-black">Gold</MenuItem>
      <MenuItem value={'premium'}  className="text-black">Premium</MenuItem>
    </Select>
    {errors.membershipName && <FormHelperText>{errors.membershipName.message}</FormHelperText>}
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
    sx={{
        
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Change the border color to white
        },
        '&:hover fieldset': {
          borderColor: 'white', // Change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // Change the border color when focused
        },
      },
      // Optional: Change the text color if needed
     
      '& .MuiInputBase-input': {
      color: 'white', // Change the text color inside the input to white
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Change the label color to white
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Change the label color to white when focused
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white', // Ensure the notched outline is white
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white', // Change the placeholder color to white
    },
    }}
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
    sx={{
        
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Change the border color to white
        },
        '&:hover fieldset': {
          borderColor: 'white', // Change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // Change the border color when focused
        },
      },
      // Optional: Change the text color if needed
     
      '& .MuiInputBase-input': {
      color: 'white', // Change the text color inside the input to white
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Change the label color to white
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Change the label color to white when focused
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white', // Ensure the notched outline is white
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white', // Change the placeholder color to white
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
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Payment Date"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              sx={{
        
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Change the border color to white
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Change the border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Change the border color when focused
                  },
                },
                // Optional: Change the text color if needed
               
                '& .MuiInputBase-input': {
                color: 'white', // Change the text color inside the input to white
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Change the label color to white
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Change the label color to white when focused
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Ensure the notched outline is white
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'white', // Change the placeholder color to white
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
              Add Member
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Payment Added"/>
                      
           
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddPayment;