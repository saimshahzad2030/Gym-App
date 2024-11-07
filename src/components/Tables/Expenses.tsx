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
import { Button, TextField } from '@mui/material'; 
import EditMember from '../../pages/Members/EditMember';
import EditPayment from '../../pages/Payments/EditPayment';
import EditExpense from '../../pages/Expenses/EditExpense';
   
 
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
    createData(1,'basic',"Membership payment", 1000, new Date('2023-04-18') ),
  createData(2, 'gold', "Membership payment", 1000, new Date('2023-01-15') ),
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
    <TableHead >
      <TableRow>
        <TableCell padding="checkbox">
          
           <Checkbox 
                         indeterminate={numSelected > 0 && numSelected < rowCount}
                         checked={rowCount > 0 && numSelected === rowCount}
                         onChange={onSelectAllClick}
                         inputProps={{
                           'aria-label': 'select all desserts',
                         }}
                        sx={{
                          color: 'gray', // default color
                          '&.Mui-checked': {
                            color: 'white', // color when checked
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
            sx={{color:'white'}}
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
            align={ 'center'}
            padding={ 'normal'}
            sortDirection={  false}
            sx={{color:'white'}}
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
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%',color:'white' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%',color:'white' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Membersships
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
        <IconButton onClick={()=>{console.log('first')}}>

            <DeleteIcon  sx={{color:'white'}}/>
          </IconButton>
        </Tooltip>
        {/* {numSelected == 1 &&  <Tooltip title="Edit">
         <IconButton
          
          onClick={() => {
            // setSelectedRow(row);
            // setOpenEditDialog(true);
          }}>
           < EditIcon sx={{color:'white'}}/>
         </IconButton>
       </Tooltip>} */}
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
    <Box sx={{ width: '100%',backgroundColor:'rgb(26 34 44)',color:'white' }}>
      <div className='flex flex-col items-center w-full relative'>
      {!openEditDialog && <Paper sx={{ width: '100%', mb: 2,backgroundColor:'rgb(26 34 44)' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Box sx={{ padding: '16px' }}>
          <TextField
            variant="outlined"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            size='small'
            sx={{ 
              bgcolor:'white',
              '& .MuiOutlinedInput-root': {
      border: 'none', // Remove the border
      '& fieldset': {
        border: 'none', // Remove the border around the input
      },
      '&:hover fieldset': {
        border: 'none', // Remove border on hover
      },
      '&.Mui-focused fieldset': {
        border: 'none', // Remove border on focus
      },
    },
            }}
          />
        </Box>
        <TableContainer>
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
              rowCount={rows.length}
            />
            <TableBody>
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
                    sx={{ cursor: 'pointer',color:'white' }}
                  >

                    <TableCell padding="checkbox">
                      <Checkbox 
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          color: 'gray', // default color
                          '&.Mui-checked': {
                            color: 'white', // color when checked
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
                      sx={{color:'white'}}
                    >
                      {`${row.expenseName}`}
                    </TableCell>
                   
                    <TableCell 
                    align="center"
                      sx={{color:'white'}}
                    
                    >{row.label}</TableCell>
                    <TableCell 
                    align="center"
                      sx={{color:'white'}}
                    
                    >{row.amount}</TableCell>
                       <TableCell 
                    align="center"
                      sx={{color:'white'}}
                    
                    >
                        {row.paymentDate ? format(new Date(row.paymentDate), 'yyyy-MM-dd') : 'N/A'}

                    </TableCell>
                      <TableCell align="center">
                      <IconButton onClick={() => {
                        setSelectedRow(row);
                        console.log(row)
                        setOpenEditDialog(true);
                      }}>
                        <EditIcon sx={{ color: 'white' }} />
                      </IconButton>
                      <IconButton onClick={() => {
                        // setSelectedRow(row);
                        // setOpenEditDialog(true);
                      }}>
                        <DeleteIcon sx={{ color: 'white' }} />
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
        sx={{color:'white'}}
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
          className=' w-full bg-boxdark p-4 rounded '
          onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
        >
            
            <div className='flex flex-row items-center justify-end w-full mt-4'>
            <Button onClick={() => setOpenEditDialog(false)}>
              <CloseIcon className='text-white mb-4'/>
            </Button>
              </div>
            <EditExpense expense={selectedRow} setOpenEditDialog={setOpenEditDialog}/>
          </div> 
      )}
      </div>
    </Box>
  );
}