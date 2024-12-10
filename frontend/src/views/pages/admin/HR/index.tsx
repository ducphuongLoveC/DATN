import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Button,
  Box,
  Pagination,
  Snackbar,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface UserData {
  id: number;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
}

const HR = () => {
  const [rows, setRows] = useState<UserData[]>([
    {
      id: 1,
      avatar: 'https://via.placeholder.com/50',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234567',
    },
    {
      id: 2,
      avatar: 'https://via.placeholder.com/50',
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234568',
    },
    {
      id: 3,
      avatar: 'https://via.placeholder.com/50',
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234569',
    },
    {
      id: 4,
      avatar: 'https://via.placeholder.com/50',
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234570',
    },
    {
      id: 5,
      avatar: 'https://via.placeholder.com/50',
      name: 'Bùi Văn E',
      email: 'buivane@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234571',
    },
    {
      id: 6,
      avatar: 'https://via.placeholder.com/50',
      name: 'Đỗ Thị F',
      email: 'dothif@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234572',
    },
    {
      id: 7,
      avatar: 'https://via.placeholder.com/50',
      name: 'Nguyễn Văn G',
      email: 'nguyenvang@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234573',
    },
    {
      id: 8,
      avatar: 'https://via.placeholder.com/50',
      name: 'Lê Thị H',
      email: 'lethih@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234574',
    },
    {
      id: 9,
      avatar: 'https://via.placeholder.com/50',
      name: 'Trần Văn I',
      email: 'tranvani@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234575',
    },
    {
      id: 10,
      avatar: 'https://via.placeholder.com/50',
      name: 'Phạm Văn J',
      email: 'phamvanj@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234576',
    },
    {
      id: 11,
      avatar: 'https://via.placeholder.com/50',
      name: 'Hoàng Thị K',
      email: 'hoangthik@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234577',
    },
    {
      id: 12,
      avatar: 'https://via.placeholder.com/50',
      name: 'Vũ Văn L',
      email: 'vuvanl@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234578',
    },
    {
      id: 13,
      avatar: 'https://via.placeholder.com/50',
      name: 'Lý Văn M',
      email: 'lyvanm@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234579',
    },
    {
      id: 14,
      avatar: 'https://via.placeholder.com/50',
      name: 'Phan Thị N',
      email: 'phanthin@gmail.com',
      role: 'User',
      status: 'Offline',
      phone: '0901234580',
    },
    {
      id: 15,
      avatar: 'https://via.placeholder.com/50',
      name: 'Đặng Văn O',
      email: 'dangvano@gmail.com',
      role: 'Admin',
      status: 'Online',
      phone: '0901234581',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDeleteUser = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setSnackbarMessage('Người dùng đã được xóa thành công');
    setSnackbarOpen(true);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const displayedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Toàn Quyền Kiểm Soát',
    avatar: '',
  });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewUser((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      setSnackbarMessage('Vui lòng điền đầy đủ thông tin.');
      setSnackbarOpen(true);
      return;
    }
    const newId = rows.length + 1;
    const newUserData = {
      id: newId,
      avatar: newUser.avatar || 'https://via.placeholder.com/50',
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Offline',
      phone: newUser.phone,
    };
    setRows((prev) => [...prev, newUserData]);
    setNewUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'Toàn Quyền Kiểm Soát',
      avatar: '',
    });
    setImagePreview(null);
    setSnackbarMessage('Người dùng đã được thêm thành công');
    setSnackbarOpen(true);
  };

  const handleCancel = () => {
    setNewUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: '',
      avatar: '',
    });
    setImagePreview(null);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Typography
          variant="h1"
          style={{
            fontSize: '2rem',
            paddingLeft: '10px',
            paddingTop: '20px',
            marginBottom: '10px',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
          }}
        >
          Admin Manager
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Quyền Quản Trị</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Avatar alt={row.name} src={row.avatar} />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      backgroundColor: row.status === 'Online' ? 'green' : 'gray',
                      color: 'white',
                      padding: '4px',
                      borderRadius: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgb(123, 126, 196)',
                      marginRight: 1,
                    }}
                  >
                    Vô Hiệu Hóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            sx={{
              backgroundColor: '#1e88e5',
              color: '#fff',
              padding: '6px 12px',
              minWidth: '75px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Prev
          </Button>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            sx={{
              backgroundColor: '#1e88e5',
              color: '#fff',
              padding: '6px 12px',
              minWidth: '75px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Next
          </Button>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </TableContainer>

      {/* Form add new admin */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Box sx={{ flex: 1, marginRight: '20px', width: '60%' }}>
          <Typography variant="h2" style={{ marginBottom: '20px' }}>
            Add New Admin
          </Typography>
          <TextField
            label="Tên"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Quyền Quản Trị</InputLabel>
            <Select labelId="role-label" name="role" value={newUser.role} onChange={handleSelectChange}>
              <MenuItem value={'Toàn Quyền Kiểm Soát'}>Toàn Quyền Kiểm Soát</MenuItem>
              <MenuItem value={'Quản lý người dùng'}>Quản lý người dùng</MenuItem>
              <MenuItem value={'Quản lý Thống Kê'}>Quản lý Thống Kê</MenuItem>
              <MenuItem value={'Quản lý Khóa Học'}>Quản lý Khóa Học</MenuItem>
              <MenuItem value={'Quản lý Bài Viết'}>Quản lý Bài Viết</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" onClick={handleAddUser} style={{ width: '65%' }} sx={{ marginRight: '10px' }}>
              Thêm người dùng
            </Button>
            <Button
              variant="contained"
              style={{ width: '30%', backgroundColor: 'red', color: 'white' }}
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </Box>
        </Box>

        {/* File upload input */}
        <Box
          sx={{
            width: '40%',
            height: '500px',
            border: '2px dashed #ccc',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            id="file-upload"
            onChange={handleImageChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" sx={{ marginBottom: '20px' }}>
              Tải ảnh lên
            </Button>
          </label>
          {imagePreview && <Avatar alt="Preview" src={imagePreview as string} sx={{ width: 100, height: 100 }} />}
        </Box>
      </Box>
    </Box>
  );
};

export default HR;
