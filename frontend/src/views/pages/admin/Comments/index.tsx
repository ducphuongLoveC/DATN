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
    Button,
    Typography,
    Box,
    Pagination,
    Tooltip,
    IconButton,
} from "@mui/material";

import {
    Delete as DeleteIcon,
} from '@mui/icons-material';
import axiosInstance from "@/api/axiosInstance";
import HeaderTitle from "../Title";

const Comments = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get("/api/comment");
                setComments(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const handleChangePage = (event: any, value: any) => {
        setPage(value);
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    const renderReplies = (replies: any[]) => {
        return replies.map((reply: any) => (
            <TableRow key={reply._id}>
                <TableCell align="center"></TableCell> {/* Giữ chỗ cho căn chỉnh */}
                <TableCell align="center">
                    <Avatar alt={reply.user.name} src={reply.user.avatar} />
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body2" style={{ marginLeft: "30px" }}>
                        {reply.user.name}: {reply.content}
                    </Typography>
                </TableCell>
                <TableCell align="center">{new Date(reply.timestamp).toLocaleString()}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" color="secondary">
                        Xóa
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

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
                            comments.map((comment: any) => (
                                <React.Fragment key={comment._id}>
                                    {/* Bình luận chính */}
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
