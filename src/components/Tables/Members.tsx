import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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
import Switch from '@mui/material/Switch';
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
import { useLocation, useNavigate } from 'react-router-dom';
import AddMemberPayment from '../../pages/Members/AddMemberPayment';
import { DefaultUserImage, FingerPrint, FingerPrintOutline } from '../../../constants/icons';
import { registerMemberFingerprint } from '../../services/fingerprint.services';
   
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

function createData(
  id: number,
  activated: number,
  role_name: string,
  member_id: string,
  token: string,
  is_exist: number,
  first_name: string,
  middle_name: string,
  last_name: string,
  member_type: string,
  role: number,
  s_specialization: string,
  gender: string,
  birth_date: string, // Format: YYYY-MM-DD
  assign_class: number,
  assign_group: string,
  address: string,
  city: string,
  state: string,
  zipcode: string,
  mobile: number,
  phone: string,
  email: string,
  weight: string,
  height: string,
  chest: string,
  waist: string,
  thing: string,
  arms: string,
  fat: string,
  username: string,
  password: string,
  image: string,
  assign_staff_mem: number,
  intrested_area: number,
  g_source: number,
  referrer_by: number,
  inquiry_date: string, // Format: YYYY-MM-DD
  trial_end_date: string, // Format: YYYY-MM-DD
  selected_membership: string,
  membership_status: string,
  membership_valid_from: string, // Format: YYYY-MM-DD
  membership_valid_to: string, // Format: YYYY-MM-DD
  first_pay_date: string, // Format: YYYY-MM-DD
  created_by: number,
  created_date: string, // Format: YYYY-MM-DD
  alert_sent: number,
  admin_alert: number,
  alert_send_date: string, // Format: YYYY-MM-DD
  members_reg_number: string,
  fingerprint: string,
): Data {
  return {
    id,
    activated,
    role_name,
    member_id,
    token,
    is_exist,
    first_name,
    middle_name,
    last_name,
    member_type,
    role,
    s_specialization,
    gender,
    birth_date, // Format: YYYY-MM-DD
    assign_class,
    assign_group,
    address,
    city,
    state,
    zipcode,
    mobile,
    phone,
    email,
    weight,
    height,
    chest,
    waist,
    thing,
    arms,
    fat,
    username,
    password,
    image,
    assign_staff_mem,
    intrested_area,
    g_source,
    referrer_by,
    inquiry_date, // Format: YYYY-MM-DD
    trial_end_date, // Format: YYYY-MM-DD
    selected_membership,
    membership_status,
    membership_valid_from, // Format: YYYY-MM-DD
    membership_valid_to, // Format: YYYY-MM-DD
    first_pay_date, // Format: YYYY-MM-DD
    created_by,
    created_date, // Format: YYYY-MM-DD
    alert_sent,
    admin_alert,
    alert_send_date, // Format: YYYY-MM-DD
    members_reg_number,
    fingerprint,
  };
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
    id: 'member_id',
    numeric: false,
    disablePadding: true,
    label: 'Member ID',
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
    label: 'Father name',
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
    label: 'Membership Status',
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
            className='dark:text-white '
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
            Actions
          </TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
 
export default function EnhancedTable() {
  const router = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse query string
  const query = searchParams.get('query');
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>(query?query:'');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);
  const [updatingFingerprint, setUpdatingFingerprint] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [totalEntries,setTotalEntries]  = React.useState<number>(0)
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const [members, setMembers] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>('');

  const handleSearchChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMembersUsingSearch(event.target.value);
    setLoading(false) 
    if (!members.error) {
      setNextUrl(members.next)
      setPreviousUrl(members.previous)
      setTotalEntries(members.count);

      setMembers(members.results);
    console.log(members)

    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let members:{results:Data[],count:number,next:string,previous:string,error?:string};
      if(query){
        members =  await fetchMembersUsingSearch(query);
      
      }
      else{
        members = await fetchMembers("");

      }
      setLoading(false)
      if (!members.error) {
        setNextUrl(members.next)
        setPreviousUrl(members.previous)
        setTotalEntries(members.count);

        setMembers(members.results);
        console.log(members.results);
      }
    };
    fetchData();
  }, []);
  let filteredRows:Data[];
  // filteredRows = members.filter((row) =>
  //   row?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
  // row?.last_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  // );
  filteredRows = members;

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
          row?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        row?.last_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
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
      {!openEditDialog && !openPaymentDialog && <Paper 
      
      className='w-full mb-2 bg-white dark:bg-[#1A222C]'  
      >
        
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
          
         const labelId = `enhanced-table-checkbox-${index}`;

         return (
           <TableRow
             hover
             onClick={(event) => handleClick(event, row.id)}
             role="checkbox" 
             tabIndex={-1}
             key={row.id} 
           >

              
             <TableCell align="center"
               className='dark:text-white'
               >
               <div className='w-12 h-12 rounded-full flex flex-col items-center justify-center overflow-hidden'>
                 {row.image && row?.image?.includes('https://fitnessfirst.s3.amazonaws.com/members/')?
                 <Image className='w-14 h-14  ' image={{src:row.image,name:row.first_name}}/>
                 :
                 <Image className='w-14 h-14  ' image={{src:'/default-user.svg',name:row.first_name}}/>
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
               {`${row.member_id} `}
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
               className='dark:text-white'

             >
               {`${row.last_name} `}
             </TableCell>
             <TableCell 
             align="center"
             className='dark:text-white'

             
             >{row.mobile}</TableCell>
             <TableCell
             align="center"                      className={`${row.membership_status=='expired'?'bg-red-600':'bg-green-600'} dark:text-white`}

             >
{row.membership_status}
</TableCell>
             <TableCell
             align="center"                      className='dark:text-white'

             >
{format(new Date(row.membership_valid_to), 'MM/dd/yyyy')} 
</TableCell>
            
               <TableCell align="center"
               className='dark:text-white'
               >
               <IconButton onClick={() => {
                 setSelectedRow(row);
             
                 setOpenEditDialog(true);
               }}>
                 <EditIcon                       className='dark:text-white'
                 />
               </IconButton>
               <IconButton  onClick={() => {
                 setSelectedRow(row);
                 setUpdatingFingerprint(true)
                 setOpenDeleteDialog(true);
               }}>
                 <FingerPrint                       className='dark:text-white'
/>
               </IconButton>
               <IconButton onClick={() => {
                 setSelectedRow(row);
             
                 setOpenPaymentDialog(true);
               }}>
                 <AttachMoneyIcon                       className='dark:text-white'
                 />
               </IconButton>
               <IconButton  onClick={() => {
                 setSelectedRow(row);
                 
                 setOpenDeleteDialog(true);
               }}>
                 <DeleteIcon                       className='dark:text-white'
/>
               </IconButton>
             </TableCell>
           </TableRow>
           
         );
       })}
       {/* {emptyRows > 0 && (
         <TableRow
           style={{
             height: (  53) * emptyRows,
           }}
         >
           <TableCell colSpan={6} />
           
         </TableRow>
       )} */}
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
      {openPaymentDialog && 
       <div
       className=' w-full dark:bg-boxdark bg-white p-4 rounded '
       onClick={(e) => e.stopPropagation()}  
     >
         
         <div className='flex flex-row items-center justify-end w-full mt-4'>
         <Button onClick={() => setOpenPaymentDialog(false)}>
           <CloseIcon className='dark:text-white text-boxdark mb-4'/>
         </Button>
           </div>
         <AddMemberPayment
          user={selectedRow} 
          setOpenPaymentDialog={setOpenPaymentDialog}
          onUpdateMember={updateMember}

          />
       </div> 
      }
       <BootstrapDialog
        onClose={()=>{setOpenDeleteDialog(false)}}
        aria-labelledby="customized-dialog-title"
        open={openDeleteDialog}
      >

        {updatingFingerprint?
     <>
  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    <div className="flex flex-col items-center w-full py-4">
      <FingerPrintOutline className="w-30 h-30 text-green-700" />
      <p className="mt-4 font-bold">Register / Update Fingerprint</p>
    </div>
  </DialogTitle>
  <IconButton
    aria-label="close"
    onClick={() => {
      setOpenDeleteDialog(false);
    }}
    sx={(theme) => ({
      position: "absolute",
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    })}
  >
    <CloseIcon />
  </IconButton>
  <DialogContent dividers>
    <Typography gutterBottom>
      {`Once you confirm, the user will be registered on the fingerprint device. After registration, the user must scan their fingerprint to complete the process.`}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button
      autoFocus
      onClick={async () => {
        const updateFingerprint = await registerMemberFingerprint(
          selectedRow?.members_reg_number || ""
        );
        console.log(updateFingerprint.status);
        if (updateFingerprint.status == 200) {
          setMessage(updateFingerprint.data.message);
          setOpenSnackBar(true);
        } else {
          setMessage(updateFingerprint.error || "An error occurred. Please try again later.");
          setOpenSnackBar(true);
        }
        setOpenDeleteDialog(false);
        setUpdatingFingerprint(false);
      }}
    >
      Continue
    </Button>
  </DialogActions>
</>
:
                <>
                   <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Warning
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>{setOpenDeleteDialog(false)}}
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
           Are you sure you want to delete this member? If yes then click on continue
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={async()=>{
            const deleteEntry = await deleteMember(selectedRow?.id || 0);
            if(deleteEntry.status == 204){
              setOpenDeleteDialog(false)
              setMembers((prevMembers) => prevMembers.filter((member) => member.id !== selectedRow?.id));
              setOpenSnackBar(true)
              setTotalEntries(totalEntries-1)
            }
            console.log(deleteEntry.status)

          }}>
            Continue
          </Button>
        </DialogActions>
</>}
     
      </BootstrapDialog>
      </div> 
          <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message={ message?? "Deleted Succesfully"}/>

    </Box>
  );
}