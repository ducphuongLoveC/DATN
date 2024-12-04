import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Paper, Typography, Box, Pagination,
  Tooltip,
  IconButton
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; // Fixed import
import VisibilityIcon from '@mui/icons-material/Visibility'; // Fixed import
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
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table>
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
              <TableRow key={row.id || row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Avatar alt={row.name} />
                </TableCell>
                <TableCell align="center">{row.name || 'N/A'}</TableCell>
                <TableCell align="center">{row.email || 'N/A'}</TableCell>
                <TableCell align="center">{row.phone || 'N/A'}</TableCell>
                <TableCell align="center">{row.address || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Xem chi tiết">
                    <IconButton
                      onClick={() => handleViewDetails(row)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hạn chế">
                    <IconButton>
                      <LockIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
