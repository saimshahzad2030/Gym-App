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
import { Button, TextField, textFieldClasses } from '@mui/material'; 
import EditMember from '../../pages/Members/EditMember';
import EditPayment from '../../pages/Payments/EditPayment';
import EditExpense from '../../pages/Expenses/EditExpense';
import { textFieldStyle } from '../../../constants/constants';
   
 
interface Data {
  id: number; 
    expenseName: string;
    label: string;
    amount:number;
    paymentDate: Date;

   
}

function createData(
    id: number,
    expenseName: string, 
    label: string,
    amount:number,
    paymentDate: Date,
    
    
     
): Data {
  return {
    id ,
    expenseName, 
    label,
    amount,
    paymentDate,
  };
}

const rows = [
    createData(1,'salary',"Membership payment", 1000, new Date('2023-04-18') ),
  createData(2, 'interior', "Membership payment", 1000, new Date('2023-01-15') ),
  createData(3, 'silver',"Membership payment", 1000, new Date('2023-02-10') ),
  createData(4,'premium', "Membership payment", 1000, new Date('2023-03-12') ),
   
];

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
    const valueA = orderBy === 'paymentDate' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'paymentDate' ? +new Date(b[orderBy]) : b[orderBy];
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
                        sx={{ 
                          '&.Mui-checked': {
                            color: 'gray', // color when checked
                          },
                        }}
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
          Memberships
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
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.expenseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

   

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box
    className='w-full mb-2 bg-white dark:bg-[#1A222C] text-[#1A222C]'
    
    // sx={{ width: '100%',backgroundColor:'rgb(26 34 44)',color:'white' }}
    
    >
      <div className='flex flex-col items-center w-full relative'>
      {!openEditDialog && <Paper 
      
      className='w-full mb-2 bg-white dark:bg-[#1A222C]'
      // sx={{ width: '100%', mb: 2,backgroundColor:'white' }}
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
        <TableContainer>
          <Table
            sx={{ minWidth: 750,backgroundColor:'#1A222C' }}
            aria-labelledby="tableTitle"
            size={ 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
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
                    // sx={{ cursor: 'pointer',color:'white' }}
                  >

                    <TableCell padding="checkbox">
                      <Checkbox 
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          
                          '&.Mui-checked': {
                            color: 'gray', // color when checked
                          },
                        }}
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
                      {`${row.expenseName}`}
                    </TableCell>
                   
                    <TableCell 
                    align="center"
                    className='dark:text-white'

                      // sx={{color:'white'}}
                    
                    >{row.label}</TableCell>
                    <TableCell 
                      className='dark:text-white'

                    align="center"
                      // sx={{color:'white'}}
                    
                    >{row.amount}</TableCell>
                       <TableCell 
                    align="center"
                    className='dark:text-white'

                      // sx={{color:'white'}}
                    
                    >
                        {row.paymentDate ? format(new Date(row.paymentDate), 'yyyy-MM-dd') : 'N/A'}

                    </TableCell>
                      <TableCell align="center">
                      <IconButton onClick={() => {
                        setSelectedRow(row);
                        console.log(row)
                        setOpenEditDialog(true);
                      }}>
                        <EditIcon className='dark:text-white text-[#1A222C]' />
                      </IconButton>
                      <IconButton onClick={() => {
                        // setSelectedRow(row);
                        // setOpenEditDialog(true);
                      }}>
                        <DeleteIcon className='dark:text-white text-[#1A222C]' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (  53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                  
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
                      className='dark:text-white' 
        // sx={{color:'white'}}
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage} 
        />
      </Paper>}
       {openEditDialog && (
        
        <div
          className=' w-full dark:bg-boxdark bg-white p-4 rounded '
          onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
        >
            
            <div className='flex flex-row items-center justify-end w-full mt-4'>
            <Button onClick={() => setOpenEditDialog(false)}>
              <CloseIcon className='dark:text-white text-boxdark mb-4'/>
            </Button>
              </div>
            <EditExpense expense={selectedRow} setOpenEditDialog={setOpenEditDialog}/>
          </div> 
      )}
      </div>
    </Box>
  );
}