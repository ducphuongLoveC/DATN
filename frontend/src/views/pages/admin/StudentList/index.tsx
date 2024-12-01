import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Paper, Button, Typography, Box, Pagination
} from '@mui/material';
import useUsers from '../../../../api/useUsers';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../Title';

const StudentList = () => {
  const { rows, loading, error } = useUsers(); // Fetch user data from API
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const displayedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleViewDetails = (user: any) => {
    const userId = user?.id || user?._id; // Ưu tiên id, nếu không thì dùng _id
    if (userId) {
      navigate(`/user-detail/${userId}`); // Sử dụng navigate thay vì window.location.replace
    } else {
      console.error('Không tìm thấy id của người dùng.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box>
      <HeaderTitle des="Đây là trang chi danh sách người dùng" />
      <TableContainer component={Paper}>
        <Typography
          variant="h1"
          style={{
            fontSize: '2rem',
            paddingLeft: '10px',
            paddingTop: '20px',
            marginBottom: '10px',
            fontWeight: 'bold',
            fontFamily: 'Poppins'
          }}
        >
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Địa chỉ Email</TableCell>
              <TableCell align="center">Số Điện thoại</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id || row._id}>
                <TableCell>
                  <Avatar alt={row.name} />
                </TableCell>
                <TableCell align="center">{row.name || 'N/A'}</TableCell>
                <TableCell align="center">{row.email || 'N/A'}</TableCell>
                <TableCell align="center">{row.phone || 'N/A'}</TableCell>
                <TableCell align="center">{row.address || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleViewDetails(row)}>
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default StudentList;
