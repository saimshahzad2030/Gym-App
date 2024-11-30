import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { selectFieldStyle, textFieldStyle } from "../../../constants/constants";
import { addMembership } from "../../services/memberships.services";
 
type FormDataType = { 
  membership_label: string;
  membership_cat_id?: number;
  membership_length: number;
  membership_class_limit?: string | null;
  limit_days?: number;
  limitation?: string | null;
  install_plan_id?: number;
  membership_amount: number;
  membership_class?: string | null;
  installment_amount?: number;
  signup_fee: number;
  gmgt_membershipimage?: string;
  created_date?: string;
  created_by_id?: number;
  membership_description?: string | null;
 
};

// Define the validation schema
const schema = yup.object().shape({
  membership_label: yup.string().required("Label is required"),
  membership_length:yup.number().required("Duration is required"),
  membership_amount: yup.number().required("Membership Fee is required"),
  signup_fee:yup.number() ,
  membership_description:yup.string() ,
  
});

const AddMembership = () => {
  const [selectedOption, setSelectedOption] = React.useState<number >(0);
   const [open,setOpen] = React.useState<boolean>(false) 

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues, reset } = useForm<FormDataType>({
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
    const add = await addMembership(data) 
    if(!add.error){
      reset({
        membership_label: "",
        membership_length: 0,
        membership_amount: 0,
        signup_fee: 0,
        membership_description:""
      }); // Reset form values to initial or specified defaults
      setSelectedOption(0); 
      setOpen(true)
    }
      
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
      label="Label"
      placeholder="Enter Membership Label"
      variant="outlined"
      fullWidth
      {...register("membership_label")}
      error={!!errors.membership_label}
      helperText={errors.membership_label?.message} 
    sx={textFieldStyle}
    />
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.membership_length} className="   border border-black"
    sx={ selectFieldStyle}
   
   >
     <Select
      labelId="membership-label"
      {...register("membership_length")}
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        setValue("membership_length", Number(e.target.value)); // Set the value for react-hook-form
      }}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={0} disabled className="text-black">
        Select member's membership
      </MenuItem>
      <MenuItem value={30}  className="text-black">1 month</MenuItem>
      <MenuItem value={60}  className="text-black">2 months</MenuItem>
      <MenuItem value={90}  className="text-black">3 months</MenuItem>
      <MenuItem value={180} className="text-black">6 months</MenuItem>
    </Select>
    {errors.membership_length && <FormHelperText>{errors.membership_length.message}</FormHelperText>}
  </FormControl>
</div>
<div className="mb-4.5">
  <TextField
    label="Monthly Charges"
    placeholder="Enter Monthly Charges"
    variant="outlined"
    fullWidth
    {...register("membership_amount")}
    error={!!errors.membership_amount}
    helperText={errors.membership_amount?.message}
    sx={textFieldStyle}

  />
</div>

<div className="mb-4.5">
  <TextField
    label="Registration Charges"
    placeholder="Enter Registration Charges"
    variant="outlined"
    fullWidth
    {...register("signup_fee")}
    error={!!errors.signup_fee}
    helperText={errors.signup_fee?.message}
    sx={textFieldStyle}

  />
</div>
 
<div className="mb-4.5">
  <TextField
    label="Description"
    placeholder="Enter Registration Charges"
    variant="outlined"
    fullWidth
    multiline
    rows={4}
    {...register("membership_description")}
    error={!!errors.membership_description}
    helperText={errors.membership_description?.message}
    sx={textFieldStyle}

  />
</div>
              <div className=" ">
              <button
              
              type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Membership
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