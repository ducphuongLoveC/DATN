import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Paper, Button, Typography, Box, Rating, Pagination
} from '@mui/material';
import HeaderTitle from '../Title';

const ReviewList = () => {
  // Dữ liệu mẫu để hiển thị
  const reviews = [
    {
      id: 1,
      reviewerName: "Nguyễn Văn A",
      reviewerAvatar: "https://via.placeholder.com/150",
      courseName: "ReactJS Basics",
      chapterName: "Introduction",
      lessonName: "What is React?",
      rating: 4.5,
    },
    {
      id: 2,
      reviewerName: "Trần Thị B",
      reviewerAvatar: "https://via.placeholder.com/150",
      courseName: "VueJS Advanced",
      chapterName: "Directives",
      lessonName: "v-if vs v-show",
      rating: 5,
    },
  ];

  return (
    <Box>
      <HeaderTitle des="Đây là trang quản lý đánh giá" />
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table aria-label="review table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Tên người đánh giá</TableCell>
              <TableCell align="center">Tên khóa học</TableCell>
              <TableCell align="center">Tên chương</TableCell>
              <TableCell align="center">Tên bài</TableCell>
              <TableCell align="center">Đánh giá</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <Avatar alt={review.reviewerName} src={review.reviewerAvatar} />
                </TableCell>
                <TableCell align="center">{review.reviewerName}</TableCell>
                <TableCell align="center">{review.courseName}</TableCell>
                <TableCell align="center">{review.chapterName}</TableCell>
                <TableCell align="center">{review.lessonName}</TableCell>
                <TableCell align="center">
                  <Rating value={review.rating} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined">Xem chi tiết</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination count={1} page={1} variant="outlined" />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default ReviewList;
