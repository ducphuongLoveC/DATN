import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from '@/api/axiosInstance';
import HeaderTitle from '../Title';
import { toast, ToastContainer } from 'react-toastify';

const Comments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]); // Mảng khóa học
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Sửa URL để gọi đúng API lấy danh sách khóa học
        const response = await axiosInstance.get('/api/courses'); // Lấy danh sách khóa học từ API courses
        setCourses(response.data.data); // Cập nhật dữ liệu khóa học vào state
      } catch (error) {
        console.error('Lỗi khi lấy khóa học:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get('/api/comment', {
          params: { courseId },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
    };

    fetchComments();

    const interval = setInterval(fetchComments, 5000);

    return () => clearInterval(interval);
  }, [rowsPerPage, courseId]);

  const handleDelete = async (commentId: string) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bình luận này không?');
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/api/comment/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      if (response.status === 200) {
        toast.success('Xóa bình luận thành công!');
      }
    } catch (error: any) {
      console.error('Lỗi khi xóa bình luận:', error);
      toast.success(error?.response?.data?.message || 'Lỗi khi xóa bình luận. Vui lòng thử lại.');
    }
  };

  return (
    <Box>
      <HeaderTitle des="Đây là trang quản lý bình luận" />

      <Box sx={{ mb: 2, p: 2 }} component={Paper}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Chọn khóa học</InputLabel>
          <Select label="Chọn khóa học" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <MenuItem value="">Tất cả khóa học</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
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
              comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment: any) => (
                <TableRow key={comment._id}>
                  <TableCell align="center">
                    <Avatar src={comment.user.profile_picture} alt="" />
                  </TableCell>
                  <TableCell align="center">{comment.user.name}</TableCell>
                  <TableCell align="center">{comment.course ? comment.course.title : 'Không có khóa học'}</TableCell>
                  <TableCell align="center">
                    <span dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </TableCell>
                  <TableCell align="center">{new Date(comment.createdAt).toLocaleString()}</TableCell>
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
                <TableCell colSpan={6} align="center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={comments.length} // Sử dụng comments thay vì reviews
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
      <ToastContainer />
    </Box>
  );
};

export default Comments;
