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
   
 
interface Data {
  id: number;
  firstName: string;
  lastName: string;
  phone:number;
  image:string;
  joiningDate:Date;
  dob:Date;
  address:string;
  membership:string;
  membershipStartingDate:Date;
  membershipEndingDate:Date;
   
}

function createData(
  id: number,
  firstName: string,
  lastName: string,
  phone:number,
  image:string,
  joiningDate:Date ,
  dob:Date,
  address:string,
  membership:string,
  membershipStartingDate:Date,
  membershipEndingDate:Date,
): Data {
  return {
    id,
    firstName,
    lastName,
    phone,
    image,
    joiningDate,
    dob,
    address,
    membership,
    membershipStartingDate,
    membershipEndingDate,
  };
}

const rows = [
  createData(1, 'John', 'Doe', 3013415184, '/pp-1.jpg', new Date('2023-01-15'), new Date('1990-05-21'), '123 Street A', 'Gold', new Date('2023-01-15'), new Date('2024-01-15')),
  createData(2, 'Jane', 'Smith', 3013415184, '/pp-2.jpg', new Date('2023-02-10'), new Date('1988-10-11'), '456 Street B', 'Silver', new Date('2023-02-10'), new Date('2024-02-10')),
  createData(3, 'Alice', 'Johnson', 3013415184, '/pp-3.jpg', new Date('2023-03-12'), new Date('1995-07-30'), '789 Street C', 'Bronze', new Date('2023-03-12'), new Date('2024-03-12')),
  createData(4, 'Bob', 'Brown', 3013415184, '/pp-4.jpg', new Date('2023-04-18'), new Date('1985-01-22'), '101 Street D', 'Gold', new Date('2023-04-18'), new Date('2024-04-18')),
  createData(5, 'Charlie', 'Wilson', 3013415184, '/pp-5.jpg', new Date('2023-05-25'), new Date('1993-09-15'), '202 Street E', 'Silver', new Date('2023-05-25'), new Date('2024-05-25')),
  createData(6, 'Diana', 'Moore', 3013415184, '/pp-6.jpg', new Date('2023-06-30'), new Date('1992-02-18'), '303 Street F', 'Bronze', new Date('2023-06-30'), new Date('2024-06-30')),
  createData(7, 'Evan', 'Taylor', 3013415184, '/pp-7.jpg', new Date('2023-07-14'), new Date('1991-11-23'), '404 Street G', 'Gold', new Date('2023-07-14'), new Date('2024-07-14')),
  createData(8, 'Fiona', 'Anderson', 3013415184, '/pp-2.jpg', new Date('2023-08-09'), new Date('1986-06-07'), '505 Street H', 'Silver', new Date('2023-08-09'), new Date('2024-08-09')),
  createData(9, 'George', 'Thomas', 3013415184, '/pp-3.jpg', new Date('2023-09-05'), new Date('1989-12-25'), '606 Street I', 'Bronze', new Date('2023-09-05'), new Date('2024-09-05')),
  createData(10, 'Hannah', 'White', 3013415184, '/pp-1.jpg', new Date('2023-10-15'), new Date('1994-03-08'), '707 Street J', 'Gold', new Date('2023-10-15'), new Date('2024-10-15')),
  createData(11, 'Ivy', 'Clark', 3013415184, '/pp-5.jpg', new Date('2023-11-12'), new Date('1996-04-17'), '808 Street K', 'Silver', new Date('2023-11-12'), new Date('2024-11-12')),
  createData(12, 'Jack', 'King', 3013415184, '/pp-1.jpg', new Date('2023-12-20'), new Date('1987-08-30'), '909 Street L', 'Bronze', new Date('2023-12-20'), new Date('2024-12-20')),
  createData(13, 'Kara', 'Young', 3013415184, '/pp-7.jpg', new Date('2023-01-03'), new Date('1998-02-25'), '1010 Street M', 'Gold', new Date('2023-01-03'), new Date('2024-01-03')),
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
    const valueA = orderBy === 'membershipEndingDate' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'membershipEndingDate' ? +new Date(b[orderBy]) : b[orderBy];
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
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'membershipEndingDate',
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
          Members
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
export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Paper sx={{ width: '100%', mb: 2,backgroundColor:'rgb(26 34 44)' }}>
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
                    <TableCell align="center">
                      <div className='w-12 h-12 rounded-full flex flex-col items-center justify-center overflow-hidden'>
                        <Image className='w-14 h-14 ' image={{src:row.image,name:row.firstName}}/>
                      </div>
                      </TableCell> 
                    <TableCell
                    align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{color:'white'}}
                    >
                      {`${row.firstName} ${row.lastName}`}
                    </TableCell>
                   
                    <TableCell
                    align="center"
                      sx={{color:'white'}}
                    
                    >
  {format(new Date(row.membershipEndingDate), 'MM/dd/yyyy')} {/* or another preferred format */}
</TableCell>
                    <TableCell 
                    align="center"
                      sx={{color:'white'}}
                    
                    >{row.phone}</TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {openEditDialog && (
        <div
          className={`scrollbar-thin fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1400]`} 
          onClick={() => setOpenEditDialog(false)} // Close on backdrop click
        >
          <div
            className='h-[80vh] bg-boxdark p-4 rounded overflow-y-auto'
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
          >
            
            <div className='flex flex-row items-center justify-end w-full'>
            <Button onClick={() => setOpenEditDialog(false)}>
              <CloseIcon className='text-white mb-4'/>
            </Button>
              </div>
            <EditMember user={selectedRow}/>
          </div>
        </div>
      )}
      </div>
    </Box>
  );
}