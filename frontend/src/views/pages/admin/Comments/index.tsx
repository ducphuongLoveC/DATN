import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Paper,
    Box,
    Tooltip,
    IconButton,
    TablePagination,
} from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from "@/api/axiosInstance";
import HeaderTitle from "../Title";

const Comments = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(0); // Đổi về 0 để phù hợp với TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(10); // Mặc định hiển thị 10 hàng mỗi trang
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get("/api/comment");
                setComments(response.data);
                setTotalPages(Math.ceil(response.data.length / rowsPerPage));
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };

        fetchComments();

        const interval = setInterval(fetchComments, 5000); // Cập nhật sau mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [rowsPerPage]);

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset về trang đầu tiên
    };

    const handleDelete = async (commentId: string) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
        if (!confirmDelete) return;

        try {
            const response = await axiosInstance.delete(`/api/comment/${commentId}`);
            console.log("Delete response:", response);

            // Cập nhật danh sách bình luận sau khi xóa
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            alert("Xóa bình luận thành công!");
        } catch (error: any) {
            console.error("Lỗi khi xóa bình luận:", error);
            alert("Lỗi khi xóa bình luận. Vui lòng thử lại.");
        }
    };

    return (
        <Box>
            <HeaderTitle des="Đây là trang quản lý bình luận" />
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                <Table aria-label="comments table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Tên người dùng</TableCell>
                            <TableCell align="center">Khóa học bình luận</TableCell> {/* Cột mới */}
                            <TableCell align="center">Nội dung</TableCell>
                            <TableCell align="center">Thời gian tạo</TableCell>
                            <TableCell align="center">Các hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.length > 0 ? (
                            comments
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((comment: any) => (
                                    <TableRow key={comment._id}>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Avatar src={comment.user.profile_picture} alt="" />
                                        </TableCell>
                                        <TableCell align="center">{comment.user.name}</TableCell>
                                        <TableCell align="center">
                                            {comment.course ? comment.course.title : "Không có khóa học"} {/* Hiển thị tên khóa học */}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span dangerouslySetInnerHTML={{ __html: comment.content }} />
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Tooltip title="Xóa">
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDelete(comment._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={comments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default Comments;
