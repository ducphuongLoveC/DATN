import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Typography,
  Box,
  TablePagination,
  TextField,
} from '@mui/material';
import useUsersAdmin from '@/api/useUserAdmin';
import HeaderTitle from '../Title';

const HR = () => {
  const { rows, loading, error } = useUsersAdmin();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }

  // Lọc người dùng theo tên
  const filteredRows = rows.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Phân trang danh sách đã lọc
  const paginatedRows = filteredRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Hàm xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box>
      <HeaderTitle des="Đây là trang danh sách admin" />

      {/* Tìm kiếm người dùng */}
      <Box sx={{ mb: 2, p: 2 }} component={Paper}>

        <TextField
          label="Tìm kiếm theo tên"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Quyền Quản Trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar src={user._id} />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Component phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default HR;
