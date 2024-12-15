import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Paper, Box, Rating, MenuItem, Select, InputLabel, FormControl, Typography,
  TablePagination
} from '@mui/material';
import HeaderTitle from '../Title';
import axiosInstance from '@/api/axiosInstance';
import { useState, useEffect } from 'react';

interface User {
  name: string;
  profile_picture: string | null;
}

interface Review {
  _id: string;
  user: User;
  comment: string;
  stars: number;
  course: {
    _id: string;
    title: string;
  };
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starsFilter, setStarsFilter] = useState<number | ''>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get('/api/rating/all', {
        params: { stars: starsFilter, page: page + 1, limit: rowsPerPage },
      });
      setReviews(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchReviews();
  }, [starsFilter, page, rowsPerPage]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box>
      <HeaderTitle des="Đây là trang quản lý đánh giá" />

      <Box sx={{ mb: 2, p: 2   }} component={Paper}>
        
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="stars-filter-label">Lọc theo số sao</InputLabel>
        <Select
          labelId="stars-filter-label"
          value={starsFilter}
          label="Lọc theo số sao"
          onChange={(e: any) => setStarsFilter(e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {[1, 2, 3, 4, 5].map((star) => (
            <MenuItem key={star} value={star}>
              {star} sao
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      {reviews.length === 0 ? (
        <Typography align="center" color="textSecondary">
          Không có đánh giá nào khớp với bộ lọc số sao bạn chọn
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table aria-label="review table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>Avatar</TableCell>
                  <TableCell align="center">Tên người đánh giá</TableCell>
                  <TableCell align="center">Khóa học đánh giá</TableCell>
                  <TableCell align="center">Nội dung đánh giá</TableCell>
                  <TableCell align="center">Đánh giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review._id}>
                    <TableCell>
                      <Avatar src={review.user.profile_picture || undefined} />
                    </TableCell>
                    <TableCell align="center">{review.user.name}</TableCell>
                    <TableCell align="center">{review.course?.title || 'N/A'}</TableCell>
                    <TableCell align="center">{review.comment}</TableCell>
                    <TableCell align="center">
                      <Rating value={review.stars} readOnly />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={reviews.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ReviewList;
