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
import { TablePagination } from '@mui/material';
import SnackbarComp from '../../components/SnackBar/Snackbar';

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
  const [showCalendar, setShowCalendar] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

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

  // Filter users based on search term (by first or last name)
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice filtered users for pagination
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle page change
  const handleChangePage = (event, newPage:number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Box sx={{ padding: '16px',backgroundColor:'none' }}>
      {showCalendar ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick} // Date click handler
        />
      ) : (
        <div>
          <h2>Attendance for {selectedDate}</h2>

          {/* Search Input */}
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            sx={{
                marginBottom:'40px',
        
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Change the border color to white
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Change the border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Change the border color when focused
                  },
                },
                // Optional: Change the text color if needed
               
                '& .MuiInputBase-input': {
                color: 'white', // Change the text color inside the input to white
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Change the label color to white
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Change the label color to white when focused
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Ensure the notched outline is white
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'white', // Change the placeholder color to white
              },
              }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Table */}
          <TableContainer component={Paper}>
            <Table
               sx={{ minWidth: 750,backgroundColor:'rgb(26 34 44)' }}
               aria-labelledby="tableTitle"
               size={ 'medium'}
            >
              <TableHead>
                <TableRow
                sx={{ cursor: 'pointer',color:'white' }}
                >
                  <TableCell
                   sx={{
                          color: 'white', // default color
                          
                        }}
                  >ID</TableCell>
                  <TableCell
                   sx={{
                          color: 'white', // default color
                           
                        }}
                  >Image</TableCell>
                  <TableCell
                   sx={{
                          color: 'white', // default color
                           
                        }}
                  >Name</TableCell>
                  <TableCell
                   sx={{
                          color: 'white', // default color
                           
                        }}
                  >Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                     sx={{
                        color: 'white', // default color
                         
                      }}
                    >{user.id}</TableCell>
                    <TableCell
                     sx={{
                        color: 'white', // default color
                         
                      }}
                    >
                      <img src={user.image} alt={user.firstName} width={40} height={40} style={{ borderRadius: '50%' }} />
                    </TableCell>
                    <TableCell
                    
                    sx={{
                        color: 'white', // default color
                         
                      }}>
                        
                        {`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell
                     sx={{
                        color: 'white', // default color
                         
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{backgroundColor:user.isPresent ? 'white' : 'gray',
                            color:user.isPresent ? 'gray' : 'white'
                        }}
                        // color={user.isPresent ? 'secondary' : 'primary'}
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

          {/* Pagination */}
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
