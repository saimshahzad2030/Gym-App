import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { textFieldStyle } from "../../../constants/constants";
 
type FormDataType = {
  id: number;
  name: string;
  durationDays: number;
  fee:number;
  registrationFee:number | null; 
};
type FormDataType2 = {
  member?:{
    id: number;
  name: string;
  durationDays: number;
  fee:number;
  registrationFee:number | null; 
  }
};

// Define the validation schema
const schema = yup.object().shape({
  name: yup.string().required(" name is required"),
  durationDays:yup.number().required("Duration is required"),
  fee: yup.number().required("Membership Fee is required"),
  registrationFee:yup.number() ,
  
});

const EditMembership:React.FC<FormDataType2  & { setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>> }> = ({ member, setOpenEditDialog }) => {
  const [selectedOption, setSelectedOption] = React.useState<number >(member?.durationDays);
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
      {/* <Breadcrumb pageName="New Member" /> */}
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
      value={member?.name}
      {...register("name")}
      error={!!errors.name}
      helperText={errors.name?.message} 
      sx={textFieldStyle}

    />
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.durationDays} 
     sx={{ 
      // Default Light Mode styling (border color, text, label colors)
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black', // Light mode border color (black)
        },
        '&:hover fieldset': {
          borderColor: 'black', // Light mode hover border color (black)
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black', // Light mode focused border color (black)
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
            borderColor: 'black', // Light mode border color (black)
          },
          '&:hover fieldset': {
            borderColor: 'black', // Hover state in light mode
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black', // Focus state in light mode
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
      <MenuItem value={0} disabled className="text-black">
        Select membership duration
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
    value={member?.fee}

    fullWidth
    {...register("fee")}
    error={!!errors.fee}
    helperText={errors.fee?.message}
    sx={textFieldStyle}

  />
</div>

<div className="mb-4.5">
  <TextField
    label="Registration Charges"
    placeholder="Enter Registration Charges"
    variant="outlined"
    fullWidth
    value={member?.registrationFee}
    {...register("registrationFee")}
    error={!!errors.registrationFee}
    helperText={errors.registrationFee?.message}
    sx={textFieldStyle}
  />
</div>
 
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Edit Member
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Membership Updated "/>  
                      
           
          </form>
        </div>
      </div>
    </div>
  );
}; 
export default EditMembership;