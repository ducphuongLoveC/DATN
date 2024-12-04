import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Paper, Box, Rating, MenuItem, Select, InputLabel, FormControl, Typography
} from '@mui/material';
import HeaderTitle from '../Title';
import axiosInstance from '@/api/axiosInstance';

// Định nghĩa kiểu dữ liệu cho Review và User
interface User {
  name: string;
  profile_picture: string | null;
}

interface Review {
  _id: string;
  user: User;
  comment: string;
  stars: number;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // Lưu trữ danh sách đánh giá
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // Quản lý trạng thái lỗi
  const [starsFilter, setStarsFilter] = useState<number | ''>(''); // Quản lý giá trị lọc số sao

  // Hàm gọi API để lấy danh sách đánh giá
  const fetchReviews = async () => {
    try {
      // Thêm stars vào query parameters nếu có
      const response = await axiosInstance.get('/api/rating/all', {
        params: { stars: starsFilter } // Truyền stars vào query params
      });
      setReviews(response.data); // Lưu dữ liệu vào state từ response.data
    } catch (error: any) {
      setError(error.message); // Nếu có lỗi, lưu vào state
    } finally {
      setLoading(false); // Đặt trạng thái loading là false khi kết thúc
    }
  };

  // Gọi API khi component render hoặc khi starsFilter thay đổi
  useEffect(() => {
    setLoading(true); // Đặt loading thành true khi bắt đầu gọi API
    fetchReviews();

    const interval = setInterval(fetchReviews, 5000); // Cập nhật lại sau mỗi 5 giây

    return () => {
      clearInterval(interval);
    };
  }, [starsFilter]); // Thêm starsFilter vào dependency để gọi lại API khi lọc thay đổi

  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị khi dữ liệu đang được tải
  }

  if (error) {
    return <Box>Error: {error}</Box>; // Hiển thị thông báo lỗi nếu có
  }

  // Nếu không có đánh giá nào
  if (reviews.length === 0) {
    return (
      <Box>
        <HeaderTitle des="Đây là trang quản lý đánh giá" />
        <Typography variant="h6" align="center" color="textSecondary">
          Không có đánh giá nào khớp với bộ lọc số sao bạn chọn
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <HeaderTitle des="Đây là trang quản lý đánh giá" />

      {/* Dropdown để chọn số sao lọc */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="stars-filter-label">Lọc theo số sao</InputLabel>
        <Select
          labelId="stars-filter-label"
          value={starsFilter}
          label="Lọc theo số sao"
          onChange={(e : any) => setStarsFilter(e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {[1, 2, 3, 4, 5].map((star) => (
            <MenuItem key={star} value={star}>
              {star} sao
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table aria-label="review table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên người đánh giá</TableCell>
              <TableCell align="center">Nội dung đánh giá</TableCell>
              <TableCell align="center">Đánh giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>
                  <Avatar alt={review.user.name} src={review.user.profile_picture || "https://via.placeholder.com/150"} />
                </TableCell>
                <TableCell align="center">{review.user.name}</TableCell>
                <TableCell align="center">{review.comment}</TableCell>
                <TableCell align="center">
                  <Rating value={review.stars} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReviewList;
