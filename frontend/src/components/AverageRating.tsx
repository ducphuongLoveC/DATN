import { Box, Typography } from '@mui/material';
import React from 'react';
import StarRatings from 'react-star-ratings';

interface AverageRatingProps {
  totalUserRate: number;
  stars: number;
  totalStars: number;
  starRatedColor?: string;
  starEmptyColor?: string;
}

const AverageRating: React.FC<AverageRatingProps> = ({
  totalUserRate,
  stars,
  totalStars,
  starRatedColor,
  starEmptyColor,
}) => {
  if (totalStars < totalUserRate) {
    console.log('error star');
  }

  let averageRating = 0;
  if (totalStars > 0 && totalUserRate > 0) {
    averageRating = +(totalStars / totalUserRate).toFixed(1);
  }

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography color={'#f69c08'} variant="inherit" fontSize="16px" fontWeight="bold" mr={1} mt={0.5}>
        {averageRating}
      </Typography>

      <StarRatings
        rating={averageRating} // Cập nhật để hiển thị đánh giá trung bình
        starRatedColor={starRatedColor || '#f69c08'} // Màu của sao đã được đánh giá
        starEmptyColor={starEmptyColor || 'gray'} // Màu của sao chưa được đánh giá
        starDimension="14px" // Kích thước sao
        starSpacing="1px" // Khoảng cách giữa các sao
        numberOfStars={stars} // Số lượng sao
        name="averageRating"
      />
      <Typography ml={1}>({totalUserRate} đánh giá)</Typography>
    </Box>
  );
};

export default AverageRating;
