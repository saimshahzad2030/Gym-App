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
import { visuallyHidden } from '@mui/utils'; 
import {   TextField } from '@mui/material';   
import { fetchAttendance } from '../../services/attendance.services';
import LoaderComp from '../Loader/Loader'; 
import { checkBoxStyle, textFieldStyle } from '../../../constants/constants';
type MemberInfo = {
  first_name: string;
  last_name: string;
  membership_valid_from: string; // ISO 8601 date string
  membership_valid_to: string; // ISO 8601 date string
  membership_status: string; // e.g., "Continue"
  image: string; // URL to the member's image
};
 
interface Data {
  id: number;
  member_info: MemberInfo; // Assuming it's a string, as shown in the example
  in_time: string; // ISO 8601 format datetime as a string
  out_time: string; // ISO 8601 format datetime as a string
  member_reg_code: string;
};

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
    const valueA = orderBy === 'in_time' ? +new Date(a[orderBy]) : a[orderBy];
    const valueB = orderBy === 'out_time' ? +new Date(b[orderBy]) : b[orderBy];
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
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'Member Name',
  },
  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'Code',
  },
  
  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'Start Date',
  },
  
   
  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'End Date',
  },  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'In Time',
  },  {
    id: 'out_time',
    numeric: true,
    disablePadding: false,
    label: 'Out Time',
  }
   
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
            className={`dark:text-white } flex flex-col items-center justify-center `}
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
 
export default function Attendance() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('in_time');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

 const [totalEntries,setTotalEntries]  = React.useState<number>(0)
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);
  const [attendance, setAttendance] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newEntriesloading, setNewEntriesLoading] = React.useState<boolean>(false); 
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [previousUrl, setPreviousUrl] = React.useState<string>("");
const formatDate = (date:string)=>{
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', // e.g., "May"
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // For 12-hour format; set to false for 24-hour format
  })
}
 
const formatDateOnly = (date: string) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', // e.g., "May"
    day: 'numeric', // e.g., "20"
  });
};
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const fetchedData:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchAttendance("");
      setLoading(false)
      if (!fetchedData.error) {
        console.log(fetchedData.results)
        setNextUrl(fetchedData.next)
        setPreviousUrl(fetchedData.previous)
        setTotalEntries(fetchedData.count);

        setAttendance(fetchedData.results);
      }
      else{
        setAttendance([])
        setNextUrl('')
        setPreviousUrl('')
        setTotalEntries(3)
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
      const members:{results:Data[],count:number,next:string,previous:string,error?:string} = await fetchAttendance(urlToFetch.replace('http://3.111.221.228:8080/','https://3.111.221.228/'));
      setNewEntriesLoading(false);
  
      if (!members.error) {
         setNextUrl(members.next);
        setPreviousUrl(members.previous);
        setTotalEntries(members.count);
        setAttendance(members.results);
        
      }
    } else {
      setLoading(false);
      console.error('No URL available for fetching members.');
    }
  };

   

   
  const visibleRows = React.useMemo(
    () =>
    [...attendance]
        .sort(getComparator(order, orderBy))
        .slice(0, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, attendance]
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
              rowCount={attendance.length}
            />
             <TableBody
     className='dark:bg-[#1A222C] bg-white text-[#1A222C] dark:text-white' >
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) =>{}}
                    role="checkbox"  
                    tabIndex={-1}
                    key={index} 
                  >

                 
                    <TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
  {`${row.member_info.first_name==null || row.member_info.last_name ==null?` member ${index+1}`:`${row.member_info.first_name} ${row.member_info.last_name}`}`} 
</TableCell>
                   
<TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
  {`${row.member_reg_code}`} 
</TableCell>
<TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
 {formatDateOnly(row.member_info.membership_valid_from)}


</TableCell>
<TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
 {formatDateOnly(row.member_info.membership_valid_to)}



</TableCell>
<TableCell
                    align="center"
                    className={`dark:text-white ${row.member_info.membership_status == 'Continue'?'bg-green-800':'bg-red-800'}`}

                    
                    >
 {row.member_info.membership_status == 'Continue'?'Valid':'Not Valid'}


</TableCell>
<TableCell
                    align="center"
                    className='dark:text-white'

                    
                    >
 {formatDate(row.in_time)}


</TableCell>
                    <TableCell 
                    align="center"
                    className='dark:text-white'

                    
                    >  {formatDate(row.out_time)} 
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