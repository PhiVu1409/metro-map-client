import React, { useState, useEffect } from 'react'
import TrainLineService from '../services/trainLineService';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './adminComponents.css'
import { Link } from "react-router-dom"
import TrainIcon from '@mui/icons-material/Train';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListTrainLinesComponent = () => {
  const [trainLine, setTrainLine] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllTrainLine();
  }, []);

  const getAllTrainLine = () => {
    TrainLineService.getAllTrainLine().then((response) => {
      setTrainLine(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching train lines:', error);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const calculateRowNumber = (index) => {
    return index + 1 + page * rowsPerPage;
  };

  const slicedTrainLines = trainLine.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



  return (
    <div className="container-admin">
      <div className='header-content'>
        <br></br>
        <h2 className="text-center">Danh sách tuyến tàu</h2>
        <div className='text-add'>
          <h3>Thêm mới tuyến tàu</h3>
          <Link className="btn btn-success" style={{ textDecoration: "none" }} to={'/admin/addtrainline'}>
            <AddCircleIcon />
          </Link>
        </div>
      </div>
      <div className='table-content'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="right">Số tuyến tàu</StyledTableCell>
                <StyledTableCell align="right">Tên tuyến tàu</StyledTableCell>
                <StyledTableCell align="right">Khu vực</StyledTableCell>
                <StyledTableCell align="right">Mô tả</StyledTableCell>
                <StyledTableCell align="right">Xem ga</StyledTableCell>
                <StyledTableCell align="right">Cập nhật</StyledTableCell>
                <StyledTableCell align="right">Chi tiết</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedTrainLines.map((trainLine, index) => (
                <StyledTableRow key={trainLine._id}>
                  <StyledTableCell component="th" scope="row">
                  {calculateRowNumber(index)}
                  </StyledTableCell>
                  <StyledTableCell align="right">{trainLine.soTuyenTau}</StyledTableCell>
                  <StyledTableCell align="right">{trainLine.tenTuyenTau}</StyledTableCell>
                  <StyledTableCell align="right">{trainLine.khuVuc}</StyledTableCell>
                  <StyledTableCell align="right">{trainLine.moTa}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link className="btn btn-success" style={{ textDecoration: "none" }} to={'/admin/Tàu/' + trainLine._id}>
                      <TrainIcon />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link className="btn btn-success" style={{ textDecoration: "none" }} to={'/admin/edittrainline/' + trainLine._id}>
                      <EditIcon />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link className="btn btn-success" style={{ textDecoration: "none" }} to={'/admin/detailtrainline/' + trainLine._id}>
                      <InfoIcon />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trainLine.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}
export default ListTrainLinesComponent


