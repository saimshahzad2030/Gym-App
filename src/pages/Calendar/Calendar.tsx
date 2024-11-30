import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import interactionPlugin from '@fullcalendar/interaction';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, Select, TablePagination } from '@mui/material';
import SnackbarComp from '../../components/SnackBar/Snackbar';
import { optionStyle, selectFieldStyle, textFieldStyle } from '../../../constants/constants';

const sampleUsers = [
  { id: 1, firstName: 'John', lastName: 'Doe', image: '/pp-1.jpg', isPresent: false },
  { id: 2, firstName: 'Abdur', lastName: 'Rehman', image: '/pp-2.jpg', isPresent: false },
  { id: 3, firstName: 'Sita', lastName: 'Ram', image: '/pp-3.jpg', isPresent: false },
  { id: 4, firstName: 'Jane', lastName: 'Smith', image: '/pp-4.jpg', isPresent: false },
  { id: 5, firstName: 'Mike', lastName: 'Johnson', image: '/pp-5.jpg', isPresent: false },
  { id: 6, firstName: 'Sara', lastName: 'Williams', image: '/pp-6.jpg', isPresent: false },
  // Add more users as needed
];

export default function CalendarComponent() {
  const [selectedOption, setSelectedOption] = useState<string>("all");

  const [showCalendar, setShowCalendar] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5);  

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowCalendar(false);
  };

  const toggleUserAttendance = (id:number) => {
setOpenSnackBar(true)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isPresent: !user.isPresent } : user
      )
    );
  };
 
  const filteredUsers = users.filter(
    (user) => 
        (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedOption === 'all' ||
          (selectedOption === 'present' && user.isPresent) ||
          (selectedOption === 'absent' && !user.isPresent))
  );
 
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
  const handleChangePage = (event, newPage:number) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); 
  };

  return (
    <Box sx={{ padding: '16px',backgroundColor:'none' }}>
      {showCalendar ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick} 
        />
      ) : (
        <div>
          <h2>Attendance for {selectedDate}</h2>
 
         <div className='flex flex-col md:flex-row items-center justify-between w-full mt-10  '>
        <div className='flex flex-row items-center justify-start w-full md:w-7/12'>
        <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            // className='mt-10'
            sx={textFieldStyle}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></div>
          <div className='flex flex-row items-center justify-start my-2 md:my-0 w-full md:w-3/12'>
          <FormControl
  fullWidth
   
  sx={ selectFieldStyle}

>
  <Select
    labelId="membership-label" 
    value={selectedOption}
    onChange={(e) => {
      setSelectedOption(e.target.value); 
    }}
    displayEmpty
    sx={ selectFieldStyle}

  >
    <MenuItem 
        value=""
        disabled  
        sx={optionStyle}

      >
        Filter Members
      </MenuItem>
      <MenuItem 
        value="all"  
        sx={optionStyle}

      >
        All
      </MenuItem>
      <MenuItem 
        value="present" 
        sx={optionStyle}

      >
        Present
      </MenuItem>
      <MenuItem 
        value="absent" 
        sx={{
          backgroundColor: 'white', // Light mode background
          color: 'black', // Light mode text color
          
        }}
      >
        Absent
      </MenuItem>
      
    </Select>
      </FormControl>
       </div>
         </div>
  
          <TableContainer component={Paper}>
            <Table
               sx={{ minWidth: 750 }}
               className='dark:bg-[#1A222C] bg-white dark:text-white text-[#1A222C]'
               aria-labelledby="tableTitle"
               size={ 'medium'}
            >
              <TableHead>
                <TableRow 
                >
                  <TableCell
                   
                       className='text-[#1A222C] dark:text-white'
                  >ID</TableCell>
                  <TableCell
                                         className='text-[#1A222C] dark:text-white'

                  >Image</TableCell>
                  <TableCell
                                        className='text-[#1A222C] dark:text-white'

                  >Name</TableCell>
                  <TableCell
                                         className='text-[#1A222C] dark:text-white'

                  >Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                                          className='text-[#1A222C] dark:text-white'

                    >{user.id}</TableCell>
                    <TableCell
                                           className='text-[#1A222C] dark:text-white'

                    >
                      <img src={user.image} alt={user.firstName} width={40} height={40} style={{ borderRadius: '50%' }} />
                    </TableCell>
                    <TableCell
                    
                    className='text-[#1A222C] dark:text-white'
>
                        
                        {`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell
                     sx={{
                        color: 'white',  
                         
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{backgroundColor:user.isPresent ? 'white' : 'gray',
                            color:user.isPresent ? 'gray' : 'white'
                        }}
                         onClick={() => toggleUserAttendance(user.id)}
                      >
                        {user.isPresent ? 'Mark Absent' : 'Mark Present'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message='User Marked Present'/>
          </TableContainer>
 
          <TablePagination
            sx={{ color: 'white' }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Button variant="contained" onClick={() => setShowCalendar(true)} sx={{ marginTop: '16px' }}>
            Back to Calendar
          </Button>
        </div>
      )}
    </Box>
  );
}
