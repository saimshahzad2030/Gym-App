import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';  
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
import { checkBoxStyle, textFieldStyle } from '../../../constants/constants';
import { fetchProfitLossReport } from '../../services/reports.services';
import LoaderComp from '../Loader/Loader';
   
 
interface Data {
    year:number;
  month: number;
  profit: number;
  total_revenue: number;
  total_expenses:number; 
   
   
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
    const valueA = orderBy === 'year' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'year' ? +new Date(b[orderBy]) : b[orderBy];
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
const months =  [31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
30,
31,
30,
31]
const headCells: readonly HeadCell[] = [
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'From',
  },
  {
    id: 'month',
    numeric: false,
    disablePadding: true,
    label: 'To',
  },
  
  {
    id: 'total_expenses',
    numeric: true,
    disablePadding: false,
    label: 'Income',
  },
  {
    id: 'total_revenue',
    numeric: true,
    disablePadding: false,
    label: 'Expense',
  },
  {
    id: 'profit',
    numeric: true,
    disablePadding: false,
    label: 'Profit/Loss',
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
          Monthly Report
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
export default function Reports() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('year');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

 const [totalEntries,setTotalEntries]  = React.useState<number>(0)
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const [reports, setReports] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false); 
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const fetchedData:{results:{monthly_data:Data[]},count:number,next:string,previous:string,error?:string} = await fetchProfitLossReport("");
      setLoading(false)
      if (!fetchedData.error) {
        console.log(fetchedData.results)
        setNextUrl(fetchedData.next)
        setPreviousUrl(fetchedData.previous)
        setTotalEntries(fetchedData.count);

        setReports(fetchedData.results.monthly_data);
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
      const members:{results:{monthly_data:Data[]},count:number,next:string,previous:string,error?:string} = await fetchProfitLossReport(urlToFetch.replace('http://3.111.221.228:8080/','https://3.111.221.228/'));
      setNewEntriesLoading(false);
  
      if (!members.error) {
         setNextUrl(members.next);
        setPreviousUrl(members.previous);
        setTotalEntries(members.count);
        setReports(members.results.monthly_data);
        
      }
    } else {
      setLoading(false);
      console.error('No URL available for fetching members.');
    }
  };

   

   
  const visibleRows = React.useMemo(
    () =>
    [...reports]
        .sort(getComparator(order, orderBy))
        .slice(0, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, reports]
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
            size='small'
            sx={textFieldStyle}
          />
        </Box>
       {loading?<LoaderComp/>:
        visibleRows.length>0?
       <>
        <TableContainer>
          <Table
            sx={{ minWidth: 750  }}
            aria-labelledby="tableTitle"
            size={ 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={()=>{}}
              onRequestSort={()=>{}}
              rowCount={reports.length}
            />
             <TableBody
     className='dark:bg-[#1A222C] bg-white text-[#1A222C] dark:text-white' >
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.year);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) =>{}}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
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
                    className='dark:text-white'

                    
                    >
  {`1-${Number(row.month)}-${row.year}`} 
</TableCell>
                   
                   
<TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
   {`${months[Number(row.month)-1]}-${Number(row.month)}-${row.year}`} 

</TableCell>
                    <TableCell 
                    align="center"
                    className='dark:text-white'

                    
                    >{row.total_revenue}</TableCell>
                       <TableCell 
                    align="center"
                    className='dark:text-white'

                    
                    >{row.total_expenses}</TableCell>
                    <TableCell 
                    align="center"
                    className='dark:text-white'

                    
                    >{`${row.profit}`}</TableCell>
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
          rowsPerPage={visibleRows.length}
          page={page}
          onPageChange={handleChangePage} 
        /></>:
        <p className='dark:text-white text-graydark p-4'>No Data to show</p>}
      </Paper>}
     
      </div>
    </Box>
  );
}