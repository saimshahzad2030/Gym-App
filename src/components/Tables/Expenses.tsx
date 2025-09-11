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
import EditPayment from '../../pages/Payments/EditPayment';
import EditExpense from '../../pages/Expenses/EditExpense';
import { checkBoxStyle, textFieldStyle } from '../../../constants/constants';
import { deleteExpense, fetchExpenses, fetchExpensesUsingSearch } from '../../services/expenses.services';
import LoaderComp from '../Loader/Loader';
import SnackbarComp from '../SnackBar/Snackbar';
import { fetchIncomes, fetchIncomesUsingSearch } from '../../services/incomes.services';
   
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
 
interface Data {
  id: number; // Unique identifier for the invoice
  invoice_type: 'expense' | 'income'; // Specifies the type of invoice (e.g., 'expense')
  invoice_label: string | null; // Optional label for the invoice
  supplier_name: string; // Name of the supplier
  entry: string; // JSON string representing an array of entries
  payment_status: 'Paid' | 'Unpaid' | 'Pending'; // Status of the payment
  total_amount: number; // Total amount for the invoice
  receiver_id: number | null; // ID of the receiver (nullable)
  invoice_date: string; // Date of the invoice in ISO format (e.g., "YYYY-MM-DD")
  is_active: 0 | 1; // Indicates if the invoice is active (1 = active, 0 = inactive)
  delete_reason: string | null; // Reason for deletion (nullable)
  mp_id: number | null; // Additional field for mapping purposes (nullable)
   
}

function createData(
  id: number,
  invoice_type: 'expense' | 'income',
  invoice_label: string | null,
  supplier_name: string,
  entry: string,
  payment_status: 'Paid' | 'Unpaid' | 'Pending',
  total_amount: number,
  receiver_id: number | null,
  invoice_date: string,
  is_active: 0 | 1,
  delete_reason: string | null,
  mp_id: number | null,
    
    
     
): Data {
  return {
    id,
  invoice_type,
  invoice_label,
  supplier_name,
  entry,
  payment_status,
  total_amount,
  receiver_id,
  invoice_date,
  is_active,
  delete_reason,
  mp_id
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
    const valueA = orderBy === 'invoice_date' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'invoice_date' ? +new Date(b[orderBy]) : b[orderBy];
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
    id: 'expenseName',
    numeric: true,
    disablePadding: false,
    label: 'Expense',
  },
  {
    id: 'label',
    numeric: true,
    disablePadding: false,
    label: 'Label',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: true,
    label: 'Amount Required',
  },
  {
    id: 'paymentDate',
    numeric: true,
    disablePadding: false,
    label: 'Date Of Payment',
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
        <TableCell padding="checkbox"
        
        className='dark:text-white'>
          
           <Checkbox 
                         indeterminate={numSelected > 0 && numSelected < rowCount}
                         checked={rowCount > 0 && numSelected === rowCount}
                         onChange={onSelectAllClick}
                         inputProps={{
                           'aria-label': 'select all desserts',
                         }}
                         sx={checkBoxStyle}

                      />
        </TableCell>
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
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
    className='dark:bg-[#1A222C] bg-white sm:pl-2'
    // sx={[
    //   {
    //     pl: { sm: 2 },
    //     pr: { xs: 1, sm: 1 },
    //   },
    //   numSelected > 0 && {
    //     bgcolor:  'white'
    //   },
    //   {
    //     // Add dark mode styles using Tailwind's dark class
    //     '.dark &': {
    //       pl: { sm: 2 }, // Example padding; adjust based on your needs
    //       pr: { xs: 1, sm: 1 },
    //       bgcolor: '#30f172a'
    //     },
    //   },
    // ]}
  >
      {numSelected > 0 ? (
        <p
           className='dark:text-white text-[#1A222C]'
        >
          {numSelected} selected
        </p>
      ) : (
        <Typography
         className='dark:text-white text-#1A222C'
        >
          Expenses
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
        <IconButton onClick={()=>{console.log('first')}}>

            <DeleteIcon  className='dark:text-white text-[#1A222C]'/>
          </IconButton>
        </Tooltip>
     
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function Expenses() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [totalEntries,setTotalEntries]  = React.useState<number>(0)
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const [expenses, setExpenses] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");

  const handleSearchChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1)
    const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchExpensesUsingSearch(event.target.value);
    setLoading(false)
    console.log(members)
    if (!members.error) {
      setNextUrl(members.next)
      setPreviousUrl(members.previous)
      setTotalEntries(members.count);

      setExpenses(members.results);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchExpenses("");
      setLoading(false)
      if (!members.error) {
        setNextUrl(members.next)
        setPreviousUrl(members.previous)
        setTotalEntries(members.count);

        setExpenses(members.results);
      }
    };
    fetchData();
  }, []);
  
  const handleChangePage = async(event: unknown, newPage: number) => {
    const isNext = newPage > page;
    const isPrevious = newPage < page;
     setPage(newPage);
    const urlToFetch = isNext ? nextUrl : previousUrl;
    setNewEntriesLoading(true)
    if (urlToFetch) {
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchExpenses(urlToFetch);
      setNewEntriesLoading(false);
  
      if (!members.error) {
         setNextUrl(members.next);
        setPreviousUrl(members.previous);
        setTotalEntries(members.count);
        setExpenses(members.results);
         
      }
    } else {
      setLoading(false);
      console.error('No URL available for fetching members.');
    }
  };
  const updateMember = (updatedMember: Data) => {
    setExpenses((prevMembers) =>
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
      const newSelected = expenses.map((n) => n.id);
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
      [...expenses]
    .sort(getComparator(order, orderBy))
    .slice(0, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, expenses]
  ); 
  return (
    <Box
    className='w-full mb-2 bg-white dark:bg-[#1A222C] text-[#1A222C]'
    
   
    >
       <div className='flex flex-col items-center w-full relative'>
      {!openEditDialog && <Paper 
      
      className='w-full mb-2 bg-white dark:bg-[#1A222C]'  
      >
        <EnhancedTableToolbar numSelected={selected.length} />
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
       rowCount={expenses.length}
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

                    <TableCell padding="checkbox">
                      <Checkbox 
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={checkBoxStyle}

                      />
                    </TableCell>
                   
                    <TableCell
                    align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      className='dark:text-white'
                      // sx={{color:'white'}}
                    >
                      {`${row.supplier_name}`}
                    </TableCell>
                   
                    <TableCell 
                    align="center"
                    className='dark:text-white'

                      // sx={{color:'white'}}
                    
                    >{row.invoice_label}</TableCell>
                    <TableCell 
                      className='dark:text-white'

                    align="center"
                      // sx={{color:'white'}}
                    
                    >{row.total_amount}</TableCell>
                       <TableCell 
                    align="center"
                    className='dark:text-white'

                      // sx={{color:'white'}}
                    
                    >
                        {row.invoice_date ? format(new Date(row.invoice_date), 'yyyy-MM-dd') : 'N/A'}

                    </TableCell>
                      <TableCell align="center">
                      <IconButton onClick={() => {
                        setSelectedRow(row);
                        console.log(row)
                        setOpenEditDialog(true);
                      }}>
                        <EditIcon className='dark:text-white text-[#1A222C]' />
                      </IconButton>
                      <IconButton  onClick={() => {
                        setSelectedRow(row); 
                        setOpenDeleteDialog(true);
                      }}>
                        <DeleteIcon className='dark:text-white text-[#1A222C]' />
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
 <p className='dark:text-white text-graydark p-4'>No Data to show</p>}
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
            <EditExpense
          onUpdateExpense={updateExpense}
            
            expense={selectedRow} setOpenEditDialog={setOpenEditDialog}/>
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
         Are you sure you want to delete this expense? If yes then click on continue
        </Typography>
        
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={async()=>{
          const deleteEntry = await deleteExpense(selectedRow?.id || 0);
          if(deleteEntry.status == 204){
            setOpenDeleteDialog(false)
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== selectedRow?.id));
            setOpenSnackBar(true)
          }
          console.log(deleteEntry.status)

        }}>
          Continue
        </Button>
      </DialogActions>
    </BootstrapDialog>
      </div>:
          <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message={  "Deleted Succesfully"}/>

    </Box>
  );
}