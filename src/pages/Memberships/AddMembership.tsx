import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
 
type FormDataType = {
  id: number;
  name: string;
  durationDays: number;
  fee:number;
  registrationFee:number | null; 
};

// Define the validation schema
const schema = yup.object().shape({
  name: yup.string().required(" name is required"),
  durationDays:yup.number().required("Duration is required"),
  fee: yup.number().required("Membership Fee is required"),
  registrationFee:yup.number() ,
  
});

const AddMembership = () => {
  const [selectedOption, setSelectedOption] = React.useState<number >(0);
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
      <Breadcrumb pageName="New Member" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Membership Form</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onError={(err)=>{console.log(err)}}>
            <div className="p-6.5">
             

              {/* Other Form Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
  <div className="w-full xl:w-full border-none">
    <TextField
      label="Name"
      placeholder="Enter Membership name"
      variant="outlined"
      fullWidth
      {...register("name")}
      error={!!errors.name}
      helperText={errors.name?.message} 
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
  <FormControl fullWidth error={!!errors.durationDays} className=" bg-form-input"
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
      {...register("durationDays")}
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        setValue("durationDays", Number(e.target.value)); // Set the value for react-hook-form
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
      <MenuItem value={0} disabled className="text-black">
        Select member's membership
      </MenuItem>
      <MenuItem value={30}  className="text-black">1 month</MenuItem>
      <MenuItem value={60}  className="text-black">2 months</MenuItem>
      <MenuItem value={90}  className="text-black">3 months</MenuItem>
      <MenuItem value={180} className="text-black">6 months</MenuItem>
    </Select>
    {errors.durationDays && <FormHelperText>{errors.durationDays.message}</FormHelperText>}
  </FormControl>
</div>
<div className="mb-4.5">
  <TextField
    label="Monthly Charges"
    placeholder="Enter Monthly Charges"
    variant="outlined"
    fullWidth
    {...register("fee")}
    error={!!errors.fee}
    helperText={errors.fee?.message}
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
    label="Registration Charges"
    placeholder="Enter Registration Charges"
    variant="outlined"
    fullWidth
    {...register("registrationFee")}
    error={!!errors.registrationFee}
    helperText={errors.registrationFee?.message}
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
 
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Member
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Added Membership"/>
                      
           
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddMembership;