import * as React from 'react';
import { alpha } from '@mui/material/styles'; 
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { Switch, Box } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'; 
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell'; 
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import {format} from 'date-fns'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Image from '../Image/Image';
import { Button, styled, TextField } from '@mui/material'; 
import EditMember from '../../pages/Members/EditMember';
import { checkBoxStyle, textFieldStyle } from '../../../constants/constants';
import { deleteMember, fetchMembers, fetchMembersUsingSearch } from '../../services/members.services';
import SnackbarComp from '../SnackBar/Snackbar';
import LoaderComp from '../Loader/Loader';
import { FingerPrint, FingerPrintOutline } from '../../../constants/icons';
import { addFingerprint, fetchFingerprint } from '../../services/fingerprint.services';
   
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
interface Data {
  id: number;
  activated: number;
  role_name: string;
  member_id: string;
  token: string;
  is_exist: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  member_type: string;
  role: number;
  s_specialization: string;
  gender: string;
  birth_date: string; // Format: YYYY-MM-DD
  assign_class: number;
  assign_group: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  mobile: number;
  phone: string;
  email: string;
  weight: string;
  height: string;
  chest: string;
  waist: string;
  thing: string;
  arms: string;
  fat: string;
  username: string;
  password: string;
  image: string;
  assign_staff_mem: number;
  intrested_area: number;
  g_source: number;
  referrer_by: number;
  inquiry_date: string; // Format: YYYY-MM-DD
  trial_end_date: string; // Format: YYYY-MM-DD
  selected_membership: string;
  membership_status: string;
  membership_valid_from: string; // Format: YYYY-MM-DD
  membership_valid_to: string; // Format: YYYY-MM-DD
  first_pay_date: string; // Format: YYYY-MM-DD
  created_by: number;
  created_date: string; // Format: YYYY-MM-DD
  alert_sent: number;
  admin_alert: number;
  alert_send_date: string; // Format: YYYY-MM-DD
  members_reg_number: string;
  fingerprint: string;
   
}

 
 
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

const getComparator = (order: 'asc' | 'desc', orderBy: keyof Data) => {
  return (a: Data, b: Data) => {
    const valueA = orderBy === 'membership_valid_to' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'membership_valid_to' ? +new Date(b[orderBy]) : b[orderBy];
    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  };
};

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Pic',
  },
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Father Name',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'membership_valid_to',
    numeric: true,
    disablePadding: false,
    label: 'Member till',
  },
   
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className='dark:bg-[#1A222C] bg-white text-[#1A222C] dark:text-white font-bold'>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={ 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false} 
            className='dark:text-white text-center'
          >
            <TableSortLabel
              sx={{
    color: 'inherit', // respect parent color
    '&:hover': {
      color: 'inherit', // keep it white in dark mode
    },
    '&.Mui-active': {
      color: 'inherit', // also for active sorted state
    },
  }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell 
        className='dark:text-white'
            align={ 'center'}
            padding={ 'normal'}
            sortDirection={  false} 
          >
            Fingerprint Actions
          </TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps { 
  isRegister:boolean;
  setIsRegister:React.Dispatch<React.SetStateAction<boolean>> 
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) { 

  
   
  return (
    <Toolbar
    className='dark:bg-[#1A222C] bg-white sm:pl-2 w-full flex-row items-center justify-between'
     
  >
      
        <Typography
         className='dark:text-white text-#1A222C'
        >
          Fingerprints
        </Typography>
      
        <Box
    display="flex"
    alignItems="center"
    gap={2} 
>
{/* <p className={`${props.isRegister ? "opacity-75": "dark:text-white text-black font-bold" }`}>

    { "Attendance Mode"}
    </p>
    <Switch
        checked={props.isRegister}
        onChange={handleToggle}
        color="primary"
    /> 
    <p className={`${props.isRegister ? "dark:text-white text-black font-bold" : "opacity-75 "}
    `}>  
    { "Register Mode" }

    </p> */}
    {!props.isRegister && <button
    onClick={async()=>{
      const updateFingerprint = await addFingerprint({mode:'attendance' as 'register' | 'attendance',member_id:  0});
      if(updateFingerprint.status == 200 ){
         
        props.setIsRegister(!props.isRegister)
      } 

    }}
    className='text-black dark:text-white border dark:border-white border-black p-2 rounded-md'>Switch to Attendance</button>}
</Box>
    </Toolbar>
  );
}
export default function FingerPrints() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openFingerPrintConfirm, setOpenFingerPrintConfirm] = React.useState(false);
  const [totalEntries,setTotalEntries]  = React.useState<number>(0)
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  
  const [members, setMembers] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");
  const [fingerAction, setFingerAction] = React.useState<string>("");

  const [isRegister, setIsRegister] = React.useState(false);
  React.useEffect(() => {
    const fetchFingerPrintFunction = async () => {
        try {
            const fingerPrintMode: { data:{mode: string}; status: number } = await fetchFingerprint();
            if (fingerPrintMode.status === 404) {
                setIsRegister(true);
            } else { 
                setIsRegister(fingerPrintMode?.data.mode == 'attendance' ? true : false);
            }
        } catch (error) {
            console.error("Failed to fetch fingerprint:", error);
        }
    };

    fetchFingerPrintFunction();

    // Adding props.setIsRegister or fetchFingerprint as dependencies if necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const handleSearchChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMembersUsingSearch(event.target.value);
    setLoading(false)
    console.log(members)
    if (!members.error) {
      setNextUrl(members.next)
      setPreviousUrl(members.previous)
      setTotalEntries(members.count);

      setMembers(members.results);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMembers("");
      setLoading(false)
      if (!members.error) {
        setNextUrl(members.next)
        setPreviousUrl(members.previous)
        setTotalEntries(members.count);

        setMembers(members.results);
      }
    };
    fetchData();
  }, []);
  let filteredRows:Data[];
  // filteredRows = members.filter((row) =>
  //   row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  // row.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  filteredRows = members
  const handleChangePage = async(event: unknown, newPage: number) => {
    const isNext = newPage > page;
    const isPrevious = newPage < page;
     setPage(newPage);
    const urlToFetch = isNext ? nextUrl : previousUrl;
    setNewEntriesLoading(true)
    if (urlToFetch) {
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMembers(urlToFetch);
      setNewEntriesLoading(false);
  
      if (!members.error) {
         setNextUrl(members.next);
        setPreviousUrl(members.previous);
        setTotalEntries(members.count);
        setMembers(members.results);
        filteredRows = members.results.filter((row) =>
          row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        ); 
      }
    } else {
      setLoading(false);
      console.error('No URL available for fetching members.');
    }
  };
  const updateMember = (updatedMember: Data) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id == updatedMember.id ? updatedMember : member
      )
    );
  };

 

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = members.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

 

 

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
    .sort(getComparator(order, orderBy))
    .slice(0, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  ); 

  return (
    <Box
    className='w-full mb-2 bg-white dark:bg-[#1A222C] text-[#1A222C]'
     
    
    >
       <div className='flex flex-col items-center w-full relative'>
      {!openEditDialog && <Paper 
      
      className='w-full mb-2 bg-white dark:bg-[#1A222C]'  
      >
        <EnhancedTableToolbar isRegister={isRegister} setIsRegister={setIsRegister}/>
        <Box sx={{ padding: '16px' }}>
          <TextField
            variant="outlined"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            size='medium'
           sx={textFieldStyle}
          />
        </Box>
   {loading?<LoaderComp />:
   visibleRows.length>0?    <> <TableContainer>
   <Table
     sx={{ minWidth: 750,backgroundColor:'rgb(26 34 44)' }}
     aria-labelledby="tableTitle"
     size={ 'medium'}
   >
     <EnhancedTableHead
       numSelected={selected.length}
       order={order}
       orderBy={orderBy}
       onSelectAllClick={handleSelectAllClick}
       onRequestSort={handleRequestSort}
       rowCount={members.length}
     />
     <TableBody
className='dark:bg-[#1A222C] bg-white text-[#1A222C] dark:text-white' 
     
     >
       {visibleRows.map((row, index) => {
         const isItemSelected = selected.includes(row.id);
         const labelId = `enhanced-table-checkbox-${index}`;

         return (
           <TableRow
             hover
             onClick={(event) => handleClick(event, row.id)}
             role="checkbox"
             aria-checked={isItemSelected}
             tabIndex={-1}
             key={row.id}
             selected={isItemSelected} 
           >

           
             <TableCell align="center"
               className='dark:text-white'
               >
               <div className='w-12 h-12 rounded-full flex flex-col items-center justify-center overflow-hidden'>
                  {row.image && row?.image?.includes('https://fitnessfirst.s3.amazonaws.com/members/')?
                 <Image className='w-14 h-14 ' image={{src:row.image,name:row.first_name}}/>
                 :
                 <Image className='w-14 h-14 ' image={{src:'/default-user.svg',name:row.first_name}}/>
                }
               </div>
               </TableCell> 
             <TableCell
             align="center"
               component="th"
               id={labelId}
               scope="row"
               padding="none"
               className='dark:text-white'

             >
               {`${row.first_name} `}
             </TableCell>

             <TableCell
             align="center"
               component="th"
               id={labelId}
               scope="row"
               padding="none"
               className='dark:text-white text-center'

             >
               {`${row.last_name} `}
             </TableCell>
             <TableCell 
             align="center"
             className='dark:text-white'

             
             >{row.mobile}</TableCell>
             <TableCell
             align="center"                      className='dark:text-white'

             >
{format(new Date(row.membership_valid_to), 'MM/dd/yyyy')} 
</TableCell>
            
               <TableCell align="center" 
               >
               <IconButton onClick={async() => {
                 setSelectedRow(row);
                 const fingerPrintMode:{mode:'attendance' | 'register',status:number} = await fetchFingerprint();
                 if(fingerPrintMode.status == 404){
                   setFingerAction('register')

                 }
                 else{ 
                    setFingerAction(fingerPrintMode.mode=='attendance'?'attendance':'register')
  
                 }
                 setOpenFingerPrintConfirm(true);
               }}>
                 <FingerPrint  className={'dark:text-white text-graydark  '}
                 />
               </IconButton>
               
             </TableCell>
           </TableRow>
           
         );
       })}
       
     </TableBody>
   </Table>
 </TableContainer>
 <TablePagination
 className='dark:text-white' 
   rowsPerPageOptions={[10]}
   component="div"
   count={totalEntries}
   rowsPerPage={rowsPerPage}
   page={page}
   onPageChange={handleChangePage} 
 /></>
 :
 <p className='dark:text-white text-graydark p-4'>No members to show</p>}
      </Paper>}
      {openEditDialog && (
        
         <div
          className=' w-full dark:bg-boxdark bg-white p-4 rounded '
          onClick={(e) => e.stopPropagation()}  
        >
            
            <div className='flex flex-row items-center justify-end w-full mt-4'>
            <Button onClick={() => setOpenEditDialog(false)}>
              <CloseIcon className='dark:text-white text-boxdark mb-4'/>
            </Button>
              </div>
            <EditMember
             user={selectedRow} 
             setOpenEditDialog={setOpenEditDialog}
             onUpdateMember={updateMember}

             />
          </div> 
      )}
       <BootstrapDialog
        onClose={()=>{setOpenFingerPrintConfirm(false)}}
        aria-labelledby="customized-dialog-title"
        open={openFingerPrintConfirm}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         <div className='flex flex-col items-center w-full py-4'>
          <FingerPrintOutline className='w-30 h-30 text-green-700'/>
          <p className='mt-4 font-bold'>{fingerAction=='register'?'Register':'Attendance'} Fingerprint</p>
         </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>{setOpenFingerPrintConfirm(false)}}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
           {`${isRegister?'Are you sure you want to register fingerprint of this member? If yes then click on continue':'Are you sure you want to Mark attendance of this member? If yes then click on continue'}`}
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={async()=>{
            const updateFingerprint = await addFingerprint({mode:'register' as 'register' | 'attendance',member_id:selectedRow?.id || 0});

            // const updateFingerprint = await addFingerprint({mode:isRegister?'attendance':'register' as 'register' | 'attendance',member_id:selectedRow?.id || 0});
            if(updateFingerprint.status == 200 ){
              setOpenFingerPrintConfirm(false)
              setMembers((prevMembers) => prevMembers.filter((member) => member.id !== selectedRow?.id));
              setMessage(updateFingerprint.data.message)
              setOpenSnackBar(true)
              setTotalEntries(totalEntries-1)
              // setIsRegister(!isRegister)
            } 

          }}>
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
      </div> 
          <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message={ message}/>

    </Box>
  );
}