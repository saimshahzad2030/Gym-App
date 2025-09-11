import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField, textFieldClasses } from '@mui/material'; 
import EditMember from '../../pages/Members/EditMember';
import EditMembership from '../../pages/Memberships/EditMembership';
import { checkBoxStyle, textFieldStyle } from '../../../constants/constants';
import {deleteMembership, fetchMemberships } from '../../services/memberships.services';
import SnackbarComp from '../SnackBar/Snackbar';
import Loader from '../../common/Loader';
import LoaderComp from '../Loader/Loader';
   
    
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
  membership_label: string;
  membership_cat_id: number;
  membership_length: number;
  membership_class_limit: string | null;
  limit_days: number;
  limitation: string | null;
  install_plan_id: number;
  membership_amount: number;
  membership_class: string | null;
  installment_amount: number;
  signup_fee: number;
  gmgt_membershipimage: string;
  created_date: string; // Use string if the date is not automatically parsed
  created_by_id: number;
  membership_description: string | null;
}

function createData(
  id: number,
  membership_label: string,
  membership_cat_id: number,
  membership_length: number,
  membership_class_limit: string | null,
  limit_days: number,
  limitation: string | null,
  install_plan_id: number,
  membership_amount: number,
  membership_class: string | null,
  installment_amount: number,
  signup_fee: number,
  gmgt_membershipimage: string,
  created_date: string, // Use string if the date is not automatically parsed
  created_by_id: number,
  membership_description: string | null,
     
): Data {
  return {
    id,
    membership_label,
    membership_cat_id,
    membership_length,
    membership_class_limit,
    limit_days,
    limitation,
    install_plan_id,
    membership_amount,
    membership_class,
    installment_amount,
    signup_fee,
    gmgt_membershipimage,
    created_date, // Use string if the date is not automatically parsed
    created_by_id,
    membership_description,
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
    const valueA = orderBy === 'createdAt' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'createdAt' ? +new Date(b[orderBy]) : b[orderBy];
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
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'duration_days',
    numeric: true,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'fee',
    numeric: false,
    disablePadding: true,
    label: 'Monthly Charges',
  },
  
  {
    id: 'registration_fee',
    numeric: true,
    disablePadding: false,
    label: 'Registration Charges',
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
            className='dark:text-white'
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
 
export default function Memberships() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const [memberships, setMemberships] = React.useState<Data[]>([]);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false); 
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");
  const [totalEntries,setTotalEntries]  = React.useState<number>(0)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMemberships("");
      setLoading(false)
      if (!members.error) {
        setNextUrl(members.next)
        setPreviousUrl(members.previous)
        setTotalEntries(members.count);

        setMemberships(members.results);
      }
    };
    fetchData();
    
  }, []);

  const updateMembership = (updatedMembership: Data) => {
    setMemberships((prevMemberships) =>
      prevMemberships.map((membership) =>
        membership.id == updatedMembership.id ? updatedMembership : membership
      )
    );
  };
  let filteredRows:Data[];
  filteredRows = memberships.filter((row) =>
    row.membership_label.toLowerCase().includes(searchTerm.toLowerCase())
); 
const handleChangePage = async(event: unknown, newPage: number) => {
  const isNext = newPage > page;
  const isPrevious = newPage < page;
   setPage(newPage);
  const urlToFetch = isNext ? nextUrl : previousUrl;
  setNewEntriesLoading(true)
  if (urlToFetch) {
    const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchMemberships(urlToFetch);
    setNewEntriesLoading(false);

    if (!members.error) {
       setNextUrl(members.next);
      setPreviousUrl(members.previous);
      setTotalEntries(members.count);
      setMemberships(members.results);
      filteredRows = members.results.filter((row) =>
        row.membership_label.toLowerCase().includes(searchTerm.toLowerCase()) 
      ); 
    }
  } else {
    setLoading(false);
    console.error('No URL available for fetching members.');
  }
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
      const newSelected = memberships.map((n) => n.id);
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

  

  
 
  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box className="w-full mb-2 bg-white dark:bg-[#1A222C] text-[#1A222C]">
     {loading?<LoaderComp />:
     visibleRows.length >0 ?
     <div className="flex flex-col items-center w-full relative">
     {!openEditDialog && (
       <Paper className="w-full mb-2 bg-white dark:bg-[#1A222C]">
         <Box sx={{ padding: '16px' }}>
           <TextField
             variant="outlined"
             placeholder="Search by name"
             value={searchTerm}
             onChange={handleSearchChange}
             fullWidth
             size="small"
             sx={textFieldStyle}
           />
         </Box>
         <TableContainer>
           <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
             <EnhancedTableHead
               numSelected={selected.length}
               order={order}
               orderBy={orderBy}
               onSelectAllClick={handleSelectAllClick}
               onRequestSort={handleRequestSort}
               rowCount={memberships.length}
             />
             <TableBody className="dark:bg-[#1A222C] bg-white text-[#1A222C] dark:text-white">
               {visibleRows.map((row, index) => {
                 const isItemSelected = selected.includes(row.id);
                 const labelId = `enhanced-table-checkbox-${index}`;

                 return (
                   <TableRow
                     hover
                     onClick={(event) => handleClick(event, row.id)}
                     role="checkbox" 
                     tabIndex={-1}
                     key={row.id} 
                   >
                  
                     <TableCell
                       align="center"
                       component="th"
                       id={labelId}
                       scope="row"
                       padding="none"
                       className="dark:text-white"
                     >
                       {row.membership_label || '-'}
                     </TableCell>
                     <TableCell align="center" className="dark:text-white">
                       {row.membership_length}
                     </TableCell>
                     <TableCell align="center" className="dark:text-white">
                       {row.membership_amount}
                     </TableCell>
                     <TableCell align="center" className="dark:text-white">
                     {row.signup_fee}

                     </TableCell>
                     <TableCell align="center">
                       <IconButton
                         onClick={() => {
                           setSelectedRow(row);
                           setOpenEditDialog(true);
                         }}
                       >
                         <EditIcon className="dark:text-white" />
                       </IconButton>
                       <IconButton
                        onClick={() => {
                         setSelectedRow(row);
                         setOpenDeleteDialog(true);
                       }}
                       >
                         <DeleteIcon className="dark:text-white" />
                       </IconButton>
                     </TableCell>
                   </TableRow>
                 );
               })}
               {/* {emptyRows > 0 && (
                 <TableRow style={{ height: 53 * emptyRows }}>
                   <TableCell colSpan={6} />
                 </TableRow>
               )} */}
             </TableBody>
           </Table>
         </TableContainer>
         <TablePagination
           className="dark:text-white"
           rowsPerPageOptions={[10]}
           component="div"
           count={totalEntries}
           rowsPerPage={rowsPerPage}
           page={page}
           onPageChange={handleChangePage}
         />
       </Paper>
     )}
     {openEditDialog && selectedRow && (
       <div
         className="w-full dark:bg-boxdark bg-white p-4 rounded"
         onClick={(e) => e.stopPropagation()}
       >
         <div className="flex flex-row items-center justify-end w-full mt-2">
           <Button onClick={() => setOpenEditDialog(false)}>
             <CloseIcon className="dark:text-white text-boxdark mb-4" />
           </Button>
         </div>
         <EditMembership
           member={selectedRow}
           setOpenEditDialog={setOpenEditDialog}
           onUpdateMembership={updateMembership}
         />
         
       </div>
     )}

<BootstrapDialog
     onClose={()=>{setOpenDeleteDialog(false)}}
     aria-labelledby="customized-dialog-title"
     open={openDeleteDialog}
   >
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
         const deleteEntry = await deleteMembership(selectedRow?.id || 0);
         if(deleteEntry.status == 204){
           setOpenDeleteDialog(false)
           setMemberships((prevMemberships) => prevMemberships.filter((membership) => membership.id !== selectedRow?.id));
           setOpenSnackBar(true)
           setTotalEntries(totalEntries-1)
         }
         console.log(deleteEntry.status)

       }}>
         Continue
       </Button>
     </DialogActions>
   </BootstrapDialog>
   </div>:
   
   <p className='dark:text-white text-graydark p-4'>No memberships to show</p>}
      <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message={"Deleted Succesfully"}/>

    </Box>
  );
}