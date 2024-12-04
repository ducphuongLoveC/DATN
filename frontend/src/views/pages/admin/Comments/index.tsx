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
    Pagination,
    Tooltip,
    IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from "@/api/axiosInstance";
import HeaderTitle from "../Title";

const Comments = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get("/api/comment");
                setComments(response.data);
                setTotalPages(Math.ceil(response.data.length / 10));
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };

        fetchComments();

        const interval = setInterval(fetchComments, 500); // Cập nhật sau mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    const handleChangePage = (event: any, value: any) => {
        setPage(value);
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
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
            console.error("Lỗi khi xóa bình luận:", error);
            alert("Lỗi khi xóa bình luận. Vui lòng thử lại.");
        }
    };


    // if (loading) {
    //     return <div>Đang tải...</div>;
    // }

    return (
        <Box>
            <HeaderTitle des="Đây là trang quản lý bình luận" />
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                <Table aria-label="review table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Tên người dùng</TableCell>
                            <TableCell align="center">Nội dung</TableCell>
                            <TableCell align="center">Thời gian tạo</TableCell>
                            <TableCell align="center">Các hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.length > 0 ? (
                            comments.slice((page - 1) * 10, page * 10).map((comment: any) => (
                                <React.Fragment key={comment._id}>
                                    <TableRow>
                                        <TableCell sx={{ padding: "20px", textAlign: "center", display: 'flex', justifyContent: "center" }}>
                                            <Avatar src={comment.user.profile_picture} alt="" />
                                        </TableCell>
                                        <TableCell align="center" sx={{ padding: "8px" }}>
                                            {comment.user.name}
                                        </TableCell>
                                        <TableCell align="center" sx={{ padding: "8px" }}>
                                            <span dangerouslySetInnerHTML={{ __html: comment.content }} />
                                        </TableCell>
                                        <TableCell align="center" sx={{ padding: "8px" }}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="center" sx={{ padding: "8px" }}>
                                            <Tooltip title="Xóa">
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDelete(comment._id)} // Xử lý khi click vào icon xóa
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ padding: "8px" }}>
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        color="primary"
                    />
                </Box>
            </TableContainer>
        </Box>
    );
};

export default Comments;
