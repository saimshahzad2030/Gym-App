import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm ,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from '@mui/icons-material/Edit';
import SnackbarComp from "../../components/SnackBar/Snackbar";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react"; 
type FormDataType = {
  firstName: string;
  lastName: string;
  phone: string; // Update phone to string because form input is text
  membership: string;
  address:string;
  joiningDate:Date | null;
  dob:Date | null;
  membershipStartingDate?:Date | null;
  membershipEndingDate?:Date | null;
  currentSubscription?:string;
  image: FileList |null ;  
};
type FormData2Type = {
    user?: {
      firstName: string;
      lastName: string;
      phone: string;
      membership: string;
      address: string;
      joiningDate: Date | null;
      dob: Date | null;
      membershipStartingDate?: Date | null;
      membershipEndingDate?: Date | null;
      currentSubscription?: string;
      image: FileList | string | null;
    };
  };
// Define the validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address:yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  membership: yup.string().required("Please select a membership"),
  image: yup
    .mixed<FileList>()
    .nullable()
    .required("Profile image is required"),
    dob: yup.date().required('Date is required'),
    joiningDate: yup.date().required('Date is required'),
    membershipStartingDate: yup.date().required('Membership Starting Date is required'),
    membershipEndingDate: yup.date().required('Membership Ending Date is required')
});

const EditMember:React.FC<FormData2Type  & { setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>> }> = ({ user, setOpenEditDialog }) => {
    console.log(user,"User")
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(user?.image || null);
  const [open,setOpen] = React.useState<boolean>(false) 

  const { register, handleSubmit, formState: { errors }, setValue ,control } = useForm<FormDataType>({
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

  // Handle form submission
  const onSubmit = (data: FormDataType) => {
    setOpen(true)
    setOpenEditDialog(false)
    console.log("Form data:", data);
  };
  React.useEffect(() => {
    if (user && user.membership) {
      setSelectedOption(user.membership);
      setValue("membership", user.membership); // Set the value for react-hook-form
      setValue("membershipStartingDate", new Date(user.membershipStartingDate)); // Set the starting date
      setValue("membershipEndingDate", new Date(user.membershipEndingDate));
      setValue("dob", new Date(user.dob));
      setValue("joiningDate", new Date(user.joiningDate));
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
      value={user?.firstName}
      fullWidth
      {...register("firstName")}
      error={!!errors.firstName}
      helperText={errors.firstName?.message} 
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

  <div className="w-full xl:w-1/2">
    <TextField
      label="Last name"
      placeholder="Enter your last name"
      variant="outlined"
      fullWidth
      value={user?.lastName}

      {...register("lastName")}
      error={!!errors.lastName}
      helperText={errors.lastName?.message}
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
  <TextField
    label="Phone"
    placeholder="Enter phone"
    variant="outlined"
    value={user?.phone}

    fullWidth
    {...register("phone")}
    error={!!errors.phone}
    helperText={errors.phone?.message}
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
    label="Address"
    placeholder="Enter Address"
    variant="outlined"
    fullWidth
    value={user?.address}

    {...register("address")}
    error={!!errors.address}
    helperText={errors.address?.message}
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
  <FormControl fullWidth error={!!errors.membership} className=" bg-form-input"
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
      {...register("membership")}
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        setValue("membership", e.target.value); // Set the value for react-hook-form
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
      <MenuItem value="" disabled className="text-black">
        Select member's membership
      </MenuItem>
      <MenuItem value="basic"  className="text-black">Basic</MenuItem>
      <MenuItem value="silver"  className="text-black">Silver</MenuItem>
      <MenuItem value="gold"  className="text-black">Gold</MenuItem>
      <MenuItem value="premium" className="text-black">Premium</MenuItem>
    </Select>
    {errors.membership && <FormHelperText>{errors.membership.message}</FormHelperText>}
  </FormControl>
</div>
              <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="membershipStartingDate"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Membership Starting from"
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
      {errors.membershipStartingDate && (
        <p className="text-red-500">{errors.membershipStartingDate.message}</p>
      )}
    </div>
    <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="membershipEndingDate"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Membership Valid till"
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
      {errors.membershipEndingDate && (
        <p className="text-red-500">{errors.membershipEndingDate.message}</p>
      )}
    </div>
    <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="dob"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-full"
              label="Date of birth"
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
      {errors.dob && (
        <p className="text-red-500">{errors.dob.message}</p>
      )}
    </div>
              <div className="mb-4.5 flex flex-col items-center w-full ">
      <ThemeProvider theme={theme}>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <Controller
          name="joiningDate"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <DatePicker
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
              className="w-full"
              label="Joining from"
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              
            />
          )}
        />
      </LocalizationProvider>
      </ThemeProvider>
      {errors.joiningDate && (
        <p className="text-red-500">{errors.joiningDate.message}</p>
      )}
    </div>
              <div className=" ">
              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Save Changes
            </button>
              </div>
            </div>
          <SnackbarComp open={open} setOpen={setOpen} message="Edited Succesfully"/>
                      
           
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditMember;