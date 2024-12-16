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
  Tooltip,
  IconButton,
  TablePagination,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useUsers from '../../../../api/useUsers';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../Title';

const StudentList = () => {
  const { rows, loading, error } = useUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleViewDetails = (user: any) => {
    const userId = user?.id || user?._id;
    if (userId) {
      navigate(`/user-detail/${userId}`);
    } else {
      console.error('Không tìm thấy id của người dùng.');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const paginatedRows = filteredRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box>
      <HeaderTitle des="Đây là trang chi danh sách người dùng" />
      
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Địa chỉ Email</TableCell>
              <TableCell align="center">Số Điện thoại</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id || row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Avatar alt={row.name} />
                </TableCell>
                <TableCell align="center">{row.name || 'N/A'}</TableCell>
                <TableCell align="center">{row.email || 'N/A'}</TableCell>
                <TableCell align="center">{row.phone || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Xem chi tiết">
                    <IconButton onClick={() => handleViewDetails(row)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default StudentList;
