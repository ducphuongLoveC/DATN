
import { Box, Typography, LinearProgress, Grid, Button } from '@mui/material';
import StarRatings from 'react-star-ratings';
import { useState } from 'react';

interface RatingPreviewProps {
  ratingCounts: number[];
  mode: 'view' | 'edit'; // Thêm mode để xác định chế độ
  onChange?: (newRating: number) => void; // Callback khi số sao thay đổi
}

export const RatingPreview: React.FC<RatingPreviewProps> = ({
  ratingCounts = [10, 20, 30, 40, 50],
  mode = 'view',
  onChange,
}) => {
  const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);
  const averageRating =
    ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) /
    totalRatings;

  const [selectedRating, setSelectedRating] = useState(averageRating); 

  const handleRatingChange = (newRating: number) => {
    setSelectedRating(newRating); 
  };

  const handleSubmit = () => {
    if (onChange) {
      onChange(selectedRating); 
    }
  };

  return (
    <Box mt="var(--medium-space)" sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', mr: 2 }}>
          {averageRating.toFixed(1)}
        </Typography>
        <Box>
          <StarRatings
            rating={averageRating}
            starRatedColor="#FFA41C"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="2px"
          />
          <Typography variant="body2" color="text.secondary">
            {totalRatings} tổng số đánh giá
          </Typography>
        </Box>
      </Box>
      <Box>
        {ratingCounts.map((count, index) => (
          <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary">
                {index + 1} sao
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                variant="determinate"
                value={(count / totalRatings) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary" align="right">
                {count}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Chế độ chỉnh sửa */}
      {mode === 'edit' && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Chọn số sao đánh giá:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <StarRatings
              rating={selectedRating}
              starRatedColor="#FFA41C"
              numberOfStars={5}
              starDimension="40px" 
              starSpacing="5px"
              changeRating={handleRatingChange} 
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Gửi đánh giá
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RatingPreview;
  