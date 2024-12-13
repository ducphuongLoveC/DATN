import path from '@/constants/routes';
import { Visibility } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TablePagination,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface StudentListProps {
  users: any;
}

const StudentList: React.FC<StudentListProps> = ({ users }) => {
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle pagination change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Calculate rows to display
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {users?.length ? (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table sx={{ minWidth: 650 }} aria-label="learning paths table">
              <TableHead>
                <TableRow>
                  <TableCell>Ảnh đại diện</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số giờ dành cho khóa học</TableCell>
                  <TableCell>Lần học gần đây</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user: any) => (
                  <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Avatar src={user.profile_picture} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>{moment.utc(user.stats.total_time * 1000).format('HH:mm:ss')}</TableCell>
                    <TableCell>{moment(user.stats.last_accessed).fromNow()}</TableCell>

                    <TableCell align="right">
                      <Tooltip title="Xem chi tiết">
                        <Link to={path.admin.usersDetail(user.user_id)}>
                          <IconButton onClick={() => {}} color="primary">
                            <Visibility />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang"
          />
        </>
      ) : (
        <Typography>Chưa có học viên nào tham gia khóa học này</Typography>
      )}
    </>
  );
};

export default StudentList;
