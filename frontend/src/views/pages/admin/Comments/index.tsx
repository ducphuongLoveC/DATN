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
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from "@/api/axiosInstance";
import HeaderTitle from "../Title";

const Comments = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]); // Mảng khóa học
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [courseId, setCourseId] = useState<string>("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Sửa URL để gọi đúng API lấy danh sách khóa học
                const response = await axiosInstance.get("/api/courses"); // Lấy danh sách khóa học từ API courses
                setCourses(response.data.data); // Cập nhật dữ liệu khóa học vào state
            } catch (error) {
                console.error("Lỗi khi lấy khóa học:", error);
            }
        };

        fetchCourses();
    }, []);


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get("/api/comment", {
                    params: { courseId },
                });
                setComments(response.data);
                setTotalPages(Math.ceil(response.data.length / rowsPerPage));
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };

        fetchComments();

        const interval = setInterval(fetchComments, 5000);

        return () => clearInterval(interval);
    }, [rowsPerPage, courseId]);

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (commentId: string) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
        if (!confirmDelete) return;

        try {
            const response = await axiosInstance.delete(`/api/comment/${commentId}`);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            alert("Xóa bình luận thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error);
            alert("Lỗi khi xóa bình luận. Vui lòng thử lại.");
        }
    };

    return (
        <Box>
            <HeaderTitle des="Đây là trang quản lý bình luận" />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Chọn khóa học</InputLabel>
                <Select
                    label="Chọn khóa học"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                >
                    <MenuItem value="">Tất cả khóa học</MenuItem>
                    {courses.map((course) => (
                        <MenuItem key={course._id} value={course._id}>
                            {course.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Tên người dùng</TableCell>
                            <TableCell align="center">Khóa học bình luận</TableCell>
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
                                        <TableCell align="center">
                                            <Avatar src={comment.user.profile_picture} alt="" />
                                        </TableCell>
                                        <TableCell align="center">{comment.user.name}</TableCell>
                                        <TableCell align="center">
                                            {comment.course ? comment.course.title : "Không có khóa học"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span dangerouslySetInnerHTML={{ __html: comment.content }} />
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Xóa">
                                                <IconButton color="secondary" onClick={() => handleDelete(comment._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Không có dữ liệu.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
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
