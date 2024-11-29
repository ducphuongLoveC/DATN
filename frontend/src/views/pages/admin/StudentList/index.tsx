// src/components/StudentList.tsx
import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Paper, Button, Typography, Box, Pagination
} from '@mui/material';
import useUsers from '@/api/useUsers';


const StudentList = () => {
    const { rows, loading, error } = useUsers(); // Sử dụng custom hook để lấy dữ liệu
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Lưu thông tin người dùng khi xem chi tiết

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const displayedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleViewDetails = (user: any) => {
        setSelectedUser(user); // Cập nhật người dùng chọn để xem chi tiết
    };

    const handleCloseDetails = () => {
        setSelectedUser(null); // Đóng component chi tiết
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

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
                            <TableCell align='center'>Địa chỉ</TableCell>
                            <TableCell align='center'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Avatar alt={row.name} />
                                </TableCell>
                                <TableCell align='center'>{row.name}</TableCell>
                                <TableCell align='center'>{row.email}</TableCell>
                                <TableCell align='center'>{row.phone}</TableCell>
                                <TableCell align='center'>{row.address}</TableCell>
                                <TableCell align='center'>
                                    <Button variant="outlined" onClick={() => handleViewDetails(row)}>
                                        Xem chi tiết
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 80px 20px 30px' }}>
                    <Button variant="contained" style={{ marginRight: '20px' }}>
                        Quay Lại
                    </Button>

                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        sx={{ margin: '0 auto' }}
                    />

                    <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                        Tiếp Tục
                    </Button>
                </Box>
            </TableContainer>

            {/* Hiển thị thông tin chi tiết người dùng nếu đã chọn */}
            {/* {selectedUser && (
                <UserDetail user={selectedUser} onClose={handleCloseDetails} />
            )} */}
        </Box>
    );
};

export default StudentList;
