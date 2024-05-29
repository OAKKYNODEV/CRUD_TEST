
import Logo from '../assets/Logo.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function App() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/showdata')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDelete = ( id ) => {
    axios.delete(`http://localhost:5000/deletedata/${id}`)
      .then(response => {
        console.log('Data deleted successfully!');
        window.location = '/'; 
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      });
  };
  
  return (
    <>
      <div className='flex justify-center items-center'>
        <a href="https://www.moscii.com/" target="_blank">
          <img src={Logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1 className='text-4xl'>CRUD System</h1>
      <div className="card">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Code</TableCell>
            <TableCell align="center">
                <Link to={`/create`}><Button variant="contained" color="success">Create</Button></Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.code}</TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={2}>
                <Link to={`/edit/${row.id}`}><Button variant="contained">Edit</Button></Link>
                <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>

                </Box>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      </div>
      
    </>
  )
}

export default App
