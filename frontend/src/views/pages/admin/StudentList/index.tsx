import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Paper, Button, Typography, Box, TextField, Pagination, Grid, Snackbar
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

interface NewUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    avatar: File | null;
}

const StudentList = () => {
    const [rows, setRows] = useState([
        { id: 1, avatar: 'https://via.placeholder.com/50', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com',phone : '0382641223',password : '123456',address : "Ha Noi" , totalCourses: 10, completedCourses: 8 },
        { id: 2, avatar: 'https://via.placeholder.com/50', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 12, completedCourses: 10 },
        { id: 3, avatar: 'https://via.placeholder.com/50', name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 15, completedCourses: 14 },
        { id: 4, avatar: 'https://via.placeholder.com/50', name: 'Phạm Văn D', email: 'phamvand@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 8, completedCourses: 6 },
        { id: 5, avatar: 'https://via.placeholder.com/50', name: 'Nguyễn Thị E', email: 'nguyenthie@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 9, completedCourses: 7 },
        { id: 6, avatar: 'https://via.placeholder.com/50', name: 'Lê Thị F', email: 'lethif@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 11, completedCourses: 9 },
        { id: 7, avatar: 'https://via.placeholder.com/50', name: 'Đỗ Văn G', email: 'dovan.g@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 13, completedCourses: 12 },
        { id: 8, avatar: 'https://via.placeholder.com/50', name: 'Nguyễn Minh H', email: 'nguyenminh.h@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 5, completedCourses: 5 },
        { id: 9, avatar: 'https://via.placeholder.com/50', name: 'Bùi Thị I', email: 'buithi.i@gmail.com', phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 7, completedCourses: 6 },
        { id: 10, avatar: 'https://via.placeholder.com/50', name: 'Trần Văn J', email: 'tranvan.j@gmail.com',phone: '0382641223', password: '123456', address: "Ha Noi", totalCourses: 14, completedCourses: 13 },
    ]);

    const [newUser, setNewUser] = useState<NewUser>({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: null,
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    {"trạng thái cho snakBar"}
    const [snackbarOpen, setSnackbarOpen] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));

        if (value) {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewUser((prev) => ({ ...prev, avatar: files[0] }));
        } else {
            setNewUser((prev) => ({ ...prev, avatar: null }));
        }
    };

    const handleAddUser = () => {
        const errors: { [key: string]: string } = {};
        if (!newUser.name) errors.name = 'Tên là bắt buộc';
        if (!newUser.email) errors.email = 'Email là bắt buộc';
        if (!newUser.password) errors.password = 'Mật khẩu là bắt buộc';
        if (!newUser.phone) errors.phone = 'Số điện thoại là bắt buộc';
        if (!newUser.address) errors.address = 'Địa chỉ là bắt buộc';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const avatarUrl = newUser.avatar ? URL.createObjectURL(newUser.avatar) : 'https://via.placeholder.com/50';
        setRows((prev) => [
            ...prev,
            {
                id: rows.length + 1,
                avatar: avatarUrl,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
                password:newUser.password,
                totalCourses: 0,
                completedCourses: 0,
            },
        ]);
        setNewUser({ name: '', email: '', password: '', phone: '', address: '', avatar: null });
        setFormErrors({});
    };

    const handleCancel = () => {
        setNewUser({ name: '', email: '', password: '', phone: '', address: '', avatar: null });
    };

    const handleBackClick = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleContinueClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleDeleteUser = (id: number) => {
        setRows((prev) => prev.filter(row => row.id !== id));
        setSnackbarOpen(true); 
    };

    const displayedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <Box>
            <TableContainer component={Paper}>
                <Typography
                    variant="h1"
                    style={{ fontSize: '2rem', paddingLeft: '10px', paddingTop: '20px', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'Poppins' }}
                >
                    Student Manager
                </Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell align='center'>Tên</TableCell>
                            <TableCell align='center'>Địa chỉ Email</TableCell>
                            <TableCell align='center'>Số Điện thoại</TableCell>
                            <TableCell align='center'>Mật Khẩu</TableCell>
                            <TableCell align='center'>địa chỉ</TableCell>
                            <TableCell align='center'>Số Khóa Học</TableCell>
                            <TableCell align='center'>Khóa Học Hoàn Thành</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Avatar alt={row.name} src={row.avatar} />
                                </TableCell>
                                <TableCell align='center'>{row.name}</TableCell>
                                <TableCell align='center'>{row.email}</TableCell>
                                <TableCell align='center'>{row.phone}</TableCell>
                                <TableCell align='center'>{row.password}</TableCell>
                                <TableCell align='center'>{row.address}</TableCell>
                                <TableCell align='center'>{row.totalCourses}</TableCell>
                                <TableCell align='center'>{row.completedCourses}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#7B7EC4', fontSize: '0.9em', color: 'white', marginRight: '8px' }}
                                    >
                                        Vô hiệu hóa
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: 'red', fontSize: '0.9em', color: 'white' }}
                                        onClick={() => handleDeleteUser(row.id)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 80px 20px 30px' }}>
                    <Button
                        variant="contained"
                        onClick={handleBackClick}
                        style={{ marginRight: '20px' }}
                    >
                        Quay Lại
                    </Button>

                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        sx={{ margin: '0 auto' }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleContinueClick}
                        style={{ marginLeft: '20px' }}
                    >
                        Tiếp Tục
                    </Button>
                </Box>
            </TableContainer>

            <Box mt={5}>
                <Typography variant="h2" style={{ marginBottom: '20px' }}>
                    Add New Student
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <TextField
                                label="Tên"
                                name="name"
                                value={newUser.name}
                                onChange={handleChange}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={newUser.email}
                                onChange={handleChange}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Mật khẩu"
                                name="password"
                                type="password"
                                value={newUser.password}
                                onChange={handleChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Số điện thoại"
                                name="phone"
                                value={newUser.phone}
                                onChange={handleChange}
                                error={!!formErrors.phone}
                                helperText={formErrors.phone}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Địa chỉ"
                                name="address"
                                value={newUser.address}
                                onChange={handleChange}
                                error={!!formErrors.address}
                                helperText={formErrors.address}
                                fullWidth
                                margin="normal"
                            />
                            <Button variant="contained" onClick={handleAddUser} style={{ marginTop: '20px', width: '60%' }}>
                                Thêm Người Dùng
                            </Button>
                            <Button variant="contained" onClick={handleCancel} style={{ marginTop: '20px', marginLeft: '20px', backgroundColor: 'red', width: '36%' }}>
                                Hủy
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ height: '500px', width: '400px' }}>
                        <Box
                            sx={{
                                border: '2px dashed gray',
                                width: '100%', 
                                height: '100%', 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px',
                            }}
                        >
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="avatar-upload"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="avatar-upload">
                                <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
                                    Tải lên ảnh đại diện
                                </Button>
                            </label>
                            {newUser.avatar && (
                                <Box mt={2}>
                                    <Typography>Ảnh đã chọn:</Typography>
                                    <img
                                        src={URL.createObjectURL(newUser.avatar)}
                                        alt="Preview"
                                        style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Snackbar for delete success */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Người dùng đã được xóa thành công"
            />
        </Box>
    );
};

export default StudentList;
