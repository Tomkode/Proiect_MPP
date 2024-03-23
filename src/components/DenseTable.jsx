import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledView} from './StyledView'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



export default function DenseTable({state, view, rowClicked, pageState}) {
  const navigate = useNavigate();
  const currentPage = pageState.currentPage;
  const pageLength = pageState.itemsPerPage;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.sort((ob1,ob2) => ob1.calories - ob2.calories).filter( (row, index) => {
            return index >= (currentPage-1) * pageLength && index < currentPage * pageLength
          }).map((row, index) => (
            
            <TableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': {cursor: 'pointer'} }}
              onClick = { () => {
                rowClicked(index + (currentPage-1) * pageLength);
                navigate('/dessert/details')} }
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}