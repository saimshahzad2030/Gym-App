import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import SnackbarComp from "../../components/SnackBar/Snackbar";
 
import { createTheme, FormControl, FormHelperText,  MenuItem, Select, TextField } from "@mui/material";
import { selectFieldStyle, textFieldStyle } from "../../../constants/constants";
import { editMembership } from "../../services/memberships.services";
 
type FormDataType = {
  id:number;
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
type FormDataType2 = {
  member?:{
    id:number;
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
  }
};

// Define the validation schema
const schema = yup.object().shape({
  membership_label: yup.string().required("Label is required"),
  membership_length:yup.number().required("Duration is required"),
  membership_amount: yup.number().required("Membership Fee is required"),
  signup_fee:yup.number() ,
  membership_description:yup.string() ,
  
  
});

const EditMembership: React.FC<FormDataType2 & { 
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>; 
  onUpdateMembership: (updatedMember: FormDataType) => void; 
}> = ({ member, setOpenEditDialog, onUpdateMembership }) => {
  const [selectedOption, setSelectedOption] = React.useState<number >(member?.duration_days);
   const [open,setOpen] = React.useState<boolean>(false) 

  const { register, handleSubmit, formState: { errors }, setValue ,control ,getValues} = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      membership_label: member?.membership_label || "",
      membership_length: member?.membership_length || 0,
      membership_amount: member?.membership_amount || 0,
      signup_fee: member?.signup_fee || 0,
  membership_description:member?.membership_description || "" ,

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
    console.log(data)
    const edit = await editMembership(member?.id || 0,data) 
    if(!edit.error){
     
      setOpen(true)
    setOpenEditDialog(false)
    onUpdateMembership({
      id:member?.id || 0, 
      membership_label: data?.membership_label ,
      membership_length: data?.membership_length ,
      membership_amount: data?.membership_amount ,
      signup_fee: data?.signup_fee  ,
  membership_description:data?.membership_description 
    })
  }
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
      {...register("membership_label")}
      error={!!errors.membership_label}
      helperText={errors.membership_label?.message} 
      sx={textFieldStyle}

    />
  </div>

  
</div>
<div className="mb-4.5">
  <FormControl fullWidth error={!!errors.membership_length} 
    sx={ selectFieldStyle}
    
    >
     <Select
      labelId="membership-label"
      {...register("membership_length")}
      defaultValue={member?.membership_length || 0}
      onChange={(e) => setValue("membership_length", Number(e.target.value))}
      displayEmpty
      sx={ selectFieldStyle}

    >
      <MenuItem value={0} disabled className="text-black">
        Select membership duration
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